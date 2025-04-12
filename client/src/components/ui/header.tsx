import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { Calculator, Home, Github } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-custom-button-border bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-2xl font-bold text-[#006D77] hover:text-[#2A9D8F] transition-colors mr-8 cursor-pointer">
              RealTaxRate.com
            </div>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 btn-primary">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/solopreneur-calculator">
              <Button variant="ghost" className="flex items-center gap-2 btn-primary">
                <Calculator className="h-4 w-4" />
                Hourly Rate Calculator
              </Button>
            </Link>
          </nav>
        </div>
        <a
          href="https://github.com/kianerfaan/RealTaxRate.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="GitHub repository"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </header>
  )
}