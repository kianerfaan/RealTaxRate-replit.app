import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/ui/footer";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#2C3E50] font-inter">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-[#006D77] hover:text-[#2A9D8F] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculator
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#006D77]">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h3>Ownership</h3>
            <p>RealTaxRate.com is owned by OpenSourceWebApps.com.</p>

            <h3>Governing Law and Arbitration</h3>
            <p>These Terms of Service are governed by the laws of the Commonwealth of Pennsylvania. Any disputes arising from these terms will be resolved through binding arbitration in Philadelphia for U.S. users.</p>

            <p>Users in Canada, the UK, France, Germany, Spain, Italy, Sweden, Poland, Australia, or Japan may choose arbitration in their home country, provided they cover associated travel and accommodation costs. All non-US users can opt for a one-panel AAA-ICDR arbitration in New York State.</p>

            <p>To opt out of arbitration, email kianerfaan@proton.me.</p>

            <h3>Disclaimer for Experimental Open Source Tools and Web Apps</h3>
            <p>All tools and web apps provided on OpenSourceWebApps.com are experimental and open source. They are offered "as is" without any warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

            <p>By using these tools and web apps, you acknowledge that you do so at your own risk. You agree to hold harmless OpenSourceWebApps.com, and their owners, employees, and affiliates from any liability, damages, or losses that may arise from your use of these tools and web apps.</p>

            <p>These tools and web apps may be updated or modified at any time without notice. We do not guarantee their continued availability, functionality, or compatibility with your systems or data.</p>

            <p>Since these tools and web apps are open source, you are encouraged to review the source code to understand how they function and to identify any potential risks or issues. You are solely responsible for determining whether these tools and web apps are suitable for your needs and for taking appropriate precautions, such as backing up your data.</p>

            <p>While we aim to provide useful and functional tools, we cannot guarantee their performance or security. Please use them at your own discretion.</p>

            <h3>Responsible Use</h3>
            <p>Please use the site responsibly.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}