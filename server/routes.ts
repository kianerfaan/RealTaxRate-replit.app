import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { calculateTaxSchema, type CountryCode, type TaxBracket } from "@shared/schema";
import { z } from "zod";

const COUNTRY_TAX_CONFIGS = {
  US: {
    name: "United States",
    currency: "USD",
    brackets: [
      { min: 578126, rate: 0.37 },
      { min: 231251, max: 578125, rate: 0.35 },
      { min: 182101, max: 231250, rate: 0.32 },
      { min: 95376, max: 182100, rate: 0.24 },
      { min: 44726, max: 95375, rate: 0.22 },
      { min: 11001, max: 44725, rate: 0.12 },
      { min: 0, max: 11000, rate: 0.10 },
    ],
    standardDeduction: 14600,
  },
  CA: {
    name: "Canada",
    currency: "CAD",
    brackets: [
      { min: 235676, rate: 0.33 },
      { min: 165431, max: 235675, rate: 0.29 },
      { min: 106718, max: 165430, rate: 0.26 },
      { min: 53360, max: 106717, rate: 0.205 },
      { min: 0, max: 53359, rate: 0.15 },
    ],
    standardDeduction: 15000,
  },
  GB: {
    name: "United Kingdom",
    currency: "GBP",
    brackets: [
      { min: 125140, rate: 0.45 },
      { min: 50271, max: 125140, rate: 0.40 },
      { min: 12571, max: 50270, rate: 0.20 },
      { min: 0, max: 12570, rate: 0 },
    ],
    standardDeduction: 12570,
  },
  JP: {
    name: "Japan",
    currency: "JPY",
    brackets: [
      { min: 40000000, rate: 0.45 },
      { min: 18000000, max: 40000000, rate: 0.40 },
      { min: 9000000, max: 18000000, rate: 0.33 },
      { min: 6950000, max: 9000000, rate: 0.23 },
      { min: 3300000, max: 6950000, rate: 0.20 },
      { min: 1950000, max: 3300000, rate: 0.10 },
      { min: 0, max: 1950000, rate: 0.05 },
    ],
    standardDeduction: 480000,
  },
  AU: {
    name: "Australia",
    currency: "AUD",
    brackets: [
      { min: 180001, rate: 0.45 },
      { min: 120001, max: 180000, rate: 0.37 },
      { min: 45001, max: 120000, rate: 0.325 },
      { min: 18201, max: 45000, rate: 0.19 },
      { min: 0, max: 18200, rate: 0 },
    ],
    standardDeduction: 18200,
  },
};

function calculateIncomeTax(grossIncome: number, country: CountryCode) {
  const config = COUNTRY_TAX_CONFIGS[country];
  const taxableIncome = grossIncome - config.standardDeduction;
  let totalTax = 0;
  let marginalRate = 0;

  for (const bracket of config.brackets) {
    if (taxableIncome > bracket.min) {
      const bracketMax = bracket.max ?? Infinity;
      const taxableAmount = Math.min(taxableIncome - bracket.min, (bracket.max ?? Infinity) - bracket.min);

      if (taxableAmount <= 0) continue;

      totalTax += taxableAmount * bracket.rate;
      marginalRate = marginalRate || bracket.rate * 100;
    }
  }

  const effectiveRate = (totalTax / grossIncome) * 100;

  return {
    taxableIncome,
    totalTax,
    effectiveRate,
    marginalRate,
  };
}

export function registerRoutes(app: Express) {
  app.post("/api/calculate-tax", async (req, res) => {
    try {
      const { country, grossIncome } = calculateTaxSchema.parse(req.body);
      const config = COUNTRY_TAX_CONFIGS[country];

      const { taxableIncome, totalTax, effectiveRate, marginalRate } = calculateIncomeTax(grossIncome, country);

      // Get insights
      const insights = `Based on your income of ${config.currency} ${grossIncome.toLocaleString()} in ${config.name}, you're in the ${marginalRate}% marginal tax bracket. Your effective tax rate is ${effectiveRate.toFixed(2)}%, meaning you pay an average of ${effectiveRate.toFixed(2)} cents in tax per dollar earned.`;

      const calculation = await storage.saveTaxCalculation({
        country,
        grossIncome,
        taxableIncome,
        totalTax,
        effectiveRate,
        marginalRate,
        insights
      });

      res.json(calculation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  return createServer(app);
}