import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/ui/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#2C3E50] font-inter">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-[#006D77] hover:text-[#2A9D8F] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculator
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#006D77]">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>At RealTaxRate.com, we value your privacy. We only collect the bare minimum needed to keep the website running smoothly for you. This might include basic info like how you use the site.</p>

            <p>If you've got any questions about this, feel free to email us at kianerfaan@proton.me.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}