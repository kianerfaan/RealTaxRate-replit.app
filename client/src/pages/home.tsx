import TaxCalculator from "@/components/tax-calculator";
import { Link } from "wouter";
import { Footer } from "@/components/ui/footer";
import { Info, Calculator, DollarSign, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#2C3E50] font-inter">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#006D77] mb-4">
            Effective Tax Rate Calculator
          </h1>
          <p className="text-lg mb-6 text-muted-foreground max-w-2xl mx-auto">
            Calculate your estimated federal income tax based on your annual gross income. 
            All calculations use 2024 tax brackets for single filers with standard deduction.
          </p>
        </div>
        
        {/* Calculator - placed at the top */}
        <div className="max-w-2xl mx-auto mb-16">
          <TaxCalculator />
        </div>
        
        {/* Educational content about tax calculation */}
        <div className="mb-16 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-[#006D77]">Understanding Tax Calculations</h2>
          <p className="mb-4">
            Income tax systems in most countries are progressive, meaning that different portions of your income are taxed at different rates. 
            This calculator provides two important metrics:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Effective Tax Rate</strong>: The percentage of your total income that you pay in taxes</li>
            <li><strong>Marginal Tax Rate</strong>: The tax rate applied to your highest income bracket</li>
          </ul>
          <p>
            Understanding these rates helps with financial planning and tax strategy.
          </p>
        </div>
        
        {/* Benefits section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#006D77]">
                <Calculator className="mr-2 h-5 w-5" />
                Accurate Calculations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Based on current tax brackets and rates from official sources.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#006D77]">
                <Globe className="mr-2 h-5 w-5" />
                Multi-Country Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Compare tax rates across different countries to understand global tax structures.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#006D77]">
                <Info className="mr-2 h-5 w-5" />
                Detailed Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Get clear tax information with breakdowns by tax bracket.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-[#006D77]">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">What is the difference between marginal and effective tax rates?</h3>
              <p className="text-muted-foreground">
                The marginal tax rate is the rate you pay on your last dollar of income, while the effective tax rate is the average rate you pay on your entire income.
                For example, if you're in the 25% tax bracket, you don't pay 25% on all your income - only on the portion that falls into that bracket.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">How accurate is this calculator?</h3>
              <p className="text-muted-foreground">
                This calculator provides estimates based on current published tax brackets. Actual tax liability may vary based on
                specific deductions, credits, and individual circumstances. Consult a tax professional for personalized advice.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Why do different countries have different tax rates?</h3>
              <p className="text-muted-foreground">
                Countries set tax rates based on economic policies, government spending needs, and social programs.
                Some countries with higher tax rates provide more comprehensive public services.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}