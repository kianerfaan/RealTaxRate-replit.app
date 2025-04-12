import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/ui/footer"
import { Calculator, DollarSign, Clock, BarChart } from "lucide-react"

interface ExpenseCategory {
  label: string
  amount: number
}

interface ExpenseSection {
  title: string
  categories: ExpenseCategory[]
}

export default function SolopreneurCalculator() {
  const [expenses, setExpenses] = useState<ExpenseSection[]>([
    {
      title: "Basic Needs & Costs",
      categories: [
        { label: "Housing & Utilities", amount: 1700 },
        { label: "Food", amount: 400 }
      ]
    },
    {
      title: "Childcare & Family",
      categories: [
        { label: "Childcare", amount: 0 },
        { label: "Debt/Loan Payments", amount: 1100 }
      ]
    },
    {
      title: "Discretionary",
      categories: [
        { label: "Health & Fitness", amount: 200 },
        { label: "Nice to Have", amount: 500 }
      ]
    },
    {
      title: "Business",
      categories: [
        { label: "Business Expenses", amount: 0 }
      ]
    }
  ])

  const [taxRate, setTaxRate] = useState(15)
  const [hourlyRate, setHourlyRate] = useState(26.5)

  // Calculate totals
  const monthlyTotal = expenses.reduce((total, section) =>
    total + section.categories.reduce((secTotal, cat) => secTotal + cat.amount, 0), 0)

  const annualCosts = monthlyTotal * 12
  const annualBusinessCosts = expenses.find(s => s.title === "Business")?.categories[0].amount || 0

  // Calculate required earnings with tax consideration
  const requiredAnnualEarnings = (annualCosts / (1 - (taxRate / 100)))
  const requiredMonthlyEarnings = requiredAnnualEarnings / 12

  // Calculate required hours
  const requiredHoursMonth = Math.round((requiredMonthlyEarnings / hourlyRate) * 10) / 10
  const requiredHoursWeek = Math.round((requiredHoursMonth / 4) * 10) / 10

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#2C3E50] font-inter">
      <main className="container mx-auto p-4 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#006D77] mb-4">
            Solopreneur Hourly Rate Calculator
          </h1>
          <p className="text-lg mb-6 text-muted-foreground max-w-2xl mx-auto">
            Calculate your required hourly rate based on your expenses, tax rate, and financial goals.
          </p>
        </div>

        {/* Calculator - placed at the top */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Monthly Expenses Column */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Monthly Expenses</h2>

            {expenses.map((section, sIndex) => (
              <div key={section.title} className="mb-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-4">{section.title}</h3>

                {section.categories.map((category, cIndex) => (
                  <div key={category.label} className="mb-4">
                    <Label htmlFor={`expense-${sIndex}-${cIndex}`}>{category.label}</Label>
                    <Input
                      id={`expense-${sIndex}-${cIndex}`}
                      type="number"
                      value={category.amount}
                      onChange={(e) => {
                        const newExpenses = [...expenses]
                        newExpenses[sIndex].categories[cIndex].amount = Number(e.target.value)
                        setExpenses(newExpenses)
                      }}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            ))}
          </Card>

          {/* Summary & Calculations Column */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Summary & Calculations</h2>

            <div className="space-y-6">
              <div>
                <Label>Monthly Total:</Label>
                <div className="text-2xl font-bold text-[#006D77]">${monthlyTotal.toFixed(2)}</div>
              </div>

              <div>
                <Label>Annual Costs:</Label>
                <div className="text-2xl font-bold text-[#006D77]">${annualCosts.toFixed(2)}</div>
              </div>

              <div>
                <Label>Annual Business Costs:</Label>
                <div className="text-2xl font-bold text-[#006D77]">${annualBusinessCosts.toFixed(2)}</div>
              </div>

              <div>
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Required Annual Earnings:</Label>
                <div className="text-2xl font-bold text-[#006D77]">${requiredAnnualEarnings.toFixed(2)}</div>
              </div>

              <div>
                <Label>Required Monthly Earnings:</Label>
                <div className="text-2xl font-bold text-[#006D77]">${requiredMonthlyEarnings.toFixed(2)}</div>
              </div>

              <div>
                <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Required Hours/Month:</Label>
                <div className="text-2xl font-bold text-[#006D77]">{requiredHoursMonth}</div>
              </div>

              <div>
                <Label>Required Hours/Week:</Label>
                <div className="text-2xl font-bold text-[#006D77]">{requiredHoursWeek}</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Educational section */}
        <div className="mb-12 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-[#006D77]">How This Calculator Works</h2>
          <p className="mb-4">
            This calculator helps you determine your ideal hourly rate by accounting for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Monthly Expenses</strong>: Your personal and business costs</li>
            <li><strong>Tax Considerations</strong>: Tax rate impacts your required gross income</li>
            <li><strong>Time Requirements</strong>: Required billable hours per week/month</li>
          </ul>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#006D77] text-lg">
                <Calculator className="mr-2 h-5 w-5" />
                Comprehensive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Includes all expense categories
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#006D77] text-lg">
                <DollarSign className="mr-2 h-5 w-5" />
                Tax-Aware
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Accounts for tax in income planning
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#006D77] text-lg">
                <Clock className="mr-2 h-5 w-5" />
                Time-Based
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Converts financial needs to billable hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#006D77] text-lg">
                <BarChart className="mr-2 h-5 w-5" />
                Real-Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Updates calculations as you adjust inputs
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-[#006D77]">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">How is the required hourly rate calculated?</h3>
              <p className="text-muted-foreground">
                Annual costs are divided by (1 - tax rate) to determine required earnings. 
                Monthly earnings are then divided by hourly rate to find required hours.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Should I include savings goals in my expenses?</h3>
              <p className="text-muted-foreground">
                Yes, adding savings goals (retirement, emergency fund, purchases) as expenses 
                ensures your rate supports both current needs and future security.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">What if I can't work the required hours?</h3>
              <p className="text-muted-foreground">
                You can increase your hourly rate, reduce expenses, or supplement with passive income 
                instead of relying solely on hourly work.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}