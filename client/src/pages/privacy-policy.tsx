import SEOPageLayout from "@/components/shared/seo-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { generateWebPageSchema, BreadcrumbItem } from "@/lib/seo";

export default function PrivacyPolicy() {
  const seoData = {
    title: "Privacy Policy | Dunk Calculator Pro - Your Data Protection Rights",
    description: "Complete privacy policy for Dunk Calculator Pro. Learn how we collect, use, and protect your personal information when using our basketball performance calculators and training tools.",
    keywords: "privacy policy, data protection, GDPR compliance, user privacy, data collection, basketball calculator privacy",
    canonicalUrl: `${window.location.origin}/privacy-policy`,
    ogTitle: "Privacy Policy | Dunk Calculator Pro",
    ogDescription: "Learn how we protect your personal information and data when using our basketball performance calculators.",
    ogType: "article",
    twitterTitle: "Privacy Policy | Dunk Calculator Pro",
    twitterDescription: "Complete privacy policy for Dunk Calculator Pro basketball performance tools.",
    twitterCard: "summary" as const,
    structuredData: [
      generateWebPageSchema(
        "Privacy Policy | Dunk Calculator Pro",
        "Complete privacy policy explaining how we collect, use, and protect user data for our basketball performance calculators and training tools.",
        `${window.location.origin}/privacy-policy`
      )
    ]
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" }
  ];

  const lastUpdated = "January 7, 2025";

  return (
    <SEOPageLayout seoData={seoData} breadcrumbs={breadcrumbs} currentPage="Privacy Policy">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At Dunk Calculator Pro ("we," "our," or "us"), we are committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                at dunk-calculator.info and use our basketball performance calculators and related services.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                By using our website, you consent to the data practices described in this policy. If you do not agree with 
                the practices described in this policy, please do not use our website.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect the following personal information that you voluntarily provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Height, weight, and physical measurements for calculator inputs</li>
                <li>Email address (if you contact us or subscribe to updates)</li>
                <li>Name (if provided through contact forms)</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>IP address and general location information</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Device information (mobile, desktop, screen resolution)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Cookies and Tracking Technologies</h3>
              <p className="text-gray-700 leading-relaxed">
                We use cookies, web beacons, and similar tracking technologies to enhance your experience, 
                analyze website usage, and for advertising purposes through our ad partners.
              </p>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Provide and maintain our calculator services</li>
                <li>Process your calculator inputs and display results</li>
                <li>Improve our website functionality and user experience</li>
                <li>Analyze website usage and performance</li>
                <li>Communicate with you when you contact us</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure website security</li>
                <li>Display personalized advertisements through our ad partners</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Services and Advertising</h2>
              
              <h3 className="text-xl font-semibold mb-3">Ezoic Advertising</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We partner with Ezoic to display advertisements on our website. Ezoic may collect and use information 
                about your visits to this and other websites to provide advertisements about goods and services of 
                interest to you. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Browsing behavior and preferences</li>
                <li>Device and browser information</li>
                <li>Location data (general geographic area)</li>
                <li>Interest-based advertising profiles</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Analytics Services</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use analytics services to understand how users interact with our website. These services may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Page views and user interactions</li>
                <li>Traffic sources and referral information</li>
                <li>User demographics and interests (aggregated)</li>
                <li>Website performance metrics</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Storage and Security */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Data Storage and Security</h2>
              
              <h3 className="text-xl font-semibold mb-3">Data Storage</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Calculator inputs and results are processed locally in your browser and are not permanently stored 
                on our servers unless you explicitly save or share them. Most calculation data is temporary and 
                exists only during your session.
              </p>

              <h3 className="text-xl font-semibold mb-3">Security Measures</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure hosting infrastructure</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited access to personal information</li>
                <li>Data anonymization where possible</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights and Choices */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
              
              <h3 className="text-xl font-semibold mb-3">Privacy Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal information</li>
                <li>Right to restrict processing of your information</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Cookie Preferences</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Block all cookies or specific types of cookies</li>
                <li>Delete existing cookies</li>
                <li>Receive notifications when cookies are set</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Advertising Opt-Out</h3>
              <p className="text-gray-700 leading-relaxed">
                You can opt out of personalized advertising by visiting the Network Advertising Initiative opt-out page 
                or through your browser's "Do Not Track" settings. Note that you may still see non-personalized advertisements.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If you become aware that a child has provided us with personal 
                information, please contact us immediately so we can remove such information.
              </p>
            </CardContent>
          </Card>

          {/* International Users */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">International Users</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website is hosted in the United States. If you are accessing our website from outside the United States, 
                please be aware that your information may be transferred to, stored, and processed in the United States.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our website, you consent to the transfer of your information to the United States and agree 
                that such transfer will be governed by this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Providing notice through our website or other communications</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of our website after any changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium mb-2">Dunk Calculator Pro</p>
                <p className="text-gray-700">Website: dunk-calculator.info</p>
                <p className="text-gray-700">Email: Contact form available on our website</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                We will respond to your inquiry within 30 days of receipt.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SEOPageLayout>
  );
}