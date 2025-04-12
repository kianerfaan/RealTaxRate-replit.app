
import React from "react";
import { Link } from "wouter";
import { Github } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
        <Link href="/">
          <div className="text-2xl font-bold text-[#006D77] hover:text-[#2A9D8F] transition-colors cursor-pointer">
            RealTaxRate.com
          </div>
        </Link>
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
  );
}
