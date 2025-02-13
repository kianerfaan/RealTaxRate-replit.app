import TaxCalculator from "@/components/tax-calculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#2C3E50] font-inter">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#006D77]">
          2024 Tax Calculator
        </h1>
        <p className="text-center mb-12 text-muted-foreground">
          Calculate your estimated federal income tax based on your annual gross income
        </p>
        <TaxCalculator />
      </main>
      <footer className="bg-[#F8F9FA] border-t border-gray-200 mt-16 py-6">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-xs text-muted-foreground text-center">
            DISCLAIMER: This calculator provides estimates for informational purposes only and does not constitute financial or tax advice. Tax laws and rates are subject to change. Always consult a qualified tax professional for advice specific to your situation. This tool is not affiliated with the IRS or any government agency.
          </p>
          <p className="text-xs text-muted-foreground text-center mt-2">
            All calculations use 2024 tax brackets for single filers with standard deduction.
          </p>
          <p className="text-xs text-muted-foreground text-center mt-2">
            © {new Date().getFullYear()} RealTaxRate.com · <a href="https://opensourcewebapps.com" target="_blank" rel="noopener noreferrer" className="text-[#006D77] hover:underline">opensourcewebapps.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}