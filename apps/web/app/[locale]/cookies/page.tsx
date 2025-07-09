import { Container, Heading } from '@madfam/ui';

export default function CookiesPage() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <Heading level={1}>Cookie Policy</Heading>
          <p className="text-lg">Last updated: March 15, 2024</p>

          <section className="mt-8">
            <Heading level={2}>What Are Cookies</Heading>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They are widely used to make websites work more efficiently and provide a better user experience.
            </p>
          </section>

          <section className="mt-8">
            <Heading level={2}>How We Use Cookies</Heading>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.</li>
              <li><strong>Analytics Cookies:</strong> We use these to understand how visitors interact with our website, helping us improve our services.</li>
              <li><strong>Preference Cookies:</strong> These remember your preferences and choices, such as language settings or dark mode preference.</li>
              <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant and engaging advertisements.</li>
            </ul>
          </section>

          <section className="mt-8">
            <Heading level={2}>Types of Cookies We Use</Heading>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Strictly Necessary Cookies</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Cookie Name</th>
                  <th className="text-left py-2">Purpose</th>
                  <th className="text-left py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">next-auth.session-token</td>
                  <td className="py-2">Authentication session</td>
                  <td className="py-2">Session</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">__cf_bm</td>
                  <td className="py-2">Bot detection</td>
                  <td className="py-2">30 minutes</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold mt-6 mb-3">Analytics Cookies</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Cookie Name</th>
                  <th className="text-left py-2">Purpose</th>
                  <th className="text-left py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">_ga</td>
                  <td className="py-2">Google Analytics tracking</td>
                  <td className="py-2">2 years</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">_plausible</td>
                  <td className="py-2">Privacy-friendly analytics</td>
                  <td className="py-2">1 year</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mt-8">
            <Heading level={2}>Third-Party Cookies</Heading>
            <p>
              Some of our pages may contain content from third-party services (like YouTube videos or social media embeds). 
              These third-party services may set their own cookies, which we do not control. We recommend reviewing the 
              cookie policies of these third parties.
            </p>
          </section>

          <section className="mt-8">
            <Heading level={2}>Managing Cookies</Heading>
            <p>
              You can control and manage cookies through your browser settings. Please note that removing or blocking 
              cookies may impact your user experience and some parts of our website may no longer be fully accessible.
            </p>
            <p>Most browsers allow you to:</p>
            <ul>
              <li>See what cookies you have and delete them individually</li>
              <li>Block all cookies</li>
              <li>Block third-party cookies</li>
              <li>Clear all cookies when you close your browser</li>
              <li>Open a 'private browsing' or 'incognito' session</li>
            </ul>
          </section>

          <section className="mt-8">
            <Heading level={2}>Cookie Settings</Heading>
            <p>
              You can manage your cookie preferences at any time by clicking the "Cookie Settings" button in the footer 
              of our website or through the cookie consent banner when you first visit our site.
            </p>
          </section>

          <section className="mt-8">
            <Heading level={2}>Changes to This Policy</Heading>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
              new policy on this page with an updated revision date.
            </p>
          </section>

          <section className="mt-8">
            <Heading level={2}>Contact Us</Heading>
            <p>
              If you have questions about our use of cookies or this policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@madfam.io</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: MADFAM Inc., Mexico City, Mexico</li>
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}