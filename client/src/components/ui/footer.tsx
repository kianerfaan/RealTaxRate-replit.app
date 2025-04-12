import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#F8F9FA] border-t border-gray-200 mt-16 py-6">
      <div className="container mx-auto px-4 max-w-2xl">
        <p className="text-xs text-muted-foreground text-center">
          RealTaxRate.com, owned by KianErfaan.com, provides an Apache-2.0 licensed tax calculator with source code on GitHub for informational estimates only, not tax or financial advice. It is unaffiliated with the IRS or any government agency. Consult a tax professional for guidance, as laws may change. Use at your own risk; tools are "as is" without warranties, and KianErfaan.com is not liable for damages or losses. Tools may change or end without notice—review the source code and protect your data. Minimal usage data is collected for functionality. For inquiries or issues, use GitHub. Pennsylvania law governs, with arbitration in Philadelphia for U.S. users or New York under ICDR rules for non-U.S. users. © 2025 RealTaxRate.com
        </p>
        
      </div>
    </footer>
  );
}
