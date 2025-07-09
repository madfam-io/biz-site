import { prisma } from './prisma';
// TODO: Implement email sender
// import { emailSender } from '@madfam/email/src/sender';

export interface EmailQueueItem {
  id: string;
  to: string[];
  template: string;
  data: any;
  status: string;
  attempts: number;
  error?: string | null;
}

export class EmailQueueProcessor {
  private isProcessing = false;
  private processingInterval?: NodeJS.Timeout;

  constructor() {
    // Start processing queue immediately
    this.processQueue();

    // Process queue every 30 seconds
    this.processingInterval = setInterval(() => {
      this.processQueue();
    }, 30000);
  }

  async processQueue(): Promise<void> {
    if (this.isProcessing) return;

    this.isProcessing = true;

    try {
      // Get pending emails
      const pendingEmails = await prisma.emailQueue.findMany({
        where: {
          status: 'pending',
          attempts: { lt: 3 }, // Maximum 3 attempts
        },
        orderBy: { createdAt: 'asc' },
        take: 10, // Process 10 at a time
      });

      // console.log(`Processing ${pendingEmails.length} pending emails`);

      for (const email of pendingEmails) {
        await this.processEmail(email);
      }
    } catch (error) {
      console.error('Email queue processing error:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async processEmail(email: EmailQueueItem): Promise<void> {
    try {
      // Increment attempts
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: { attempts: email.attempts + 1 },
      });

      // TODO: Implement actual email sending
      // For now, just mock the email sending
      const mockSuccess = true; // In production, this would be actual email sending

      if (mockSuccess) {
        // Mark as sent
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: 'sent',
            sentAt: new Date(),
            error: null,
          },
        });

        // console.log(`Email sent successfully: ${email.id}`);
      } else {
        // Mark as failed
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: email.attempts + 1 >= 3 ? 'failed' : 'pending',
            error: 'Mock email failed',
          },
        });

        console.error(`Email failed: ${email.id}`, 'Mock email failed');
      }
    } catch (error) {
      console.error(`Email processing error for ${email.id}:`, error);

      // Mark as failed
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  }

  async queueEmail(to: string[], template: string, data: any): Promise<string> {
    const email = await prisma.emailQueue.create({
      data: {
        to,
        subject: `Template: ${template}`, // Will be replaced by actual subject
        template,
        data,
        status: 'pending',
        attempts: 0,
      },
    });

    return email.id;
  }

  async getQueueStatus(): Promise<{
    pending: number;
    sent: number;
    failed: number;
  }> {
    const [pending, sent, failed] = await Promise.all([
      prisma.emailQueue.count({ where: { status: 'pending' } }),
      prisma.emailQueue.count({ where: { status: 'sent' } }),
      prisma.emailQueue.count({ where: { status: 'failed' } }),
    ]);

    return { pending, sent, failed };
  }

  stop(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
  }
}

// Global instance
export const emailQueue = new EmailQueueProcessor();
