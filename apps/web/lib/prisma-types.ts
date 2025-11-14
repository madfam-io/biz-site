// Temporary Prisma enum definitions
// These match the enums in prisma/schema.prisma
// Remove this file once Prisma client is properly generated

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
}

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  SOCIAL = 'SOCIAL',
  OTHER = 'OTHER',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export enum AssessmentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
