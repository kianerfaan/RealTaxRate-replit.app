import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { calculateTaxSchema } from "@shared/schema";
import { z } from "zod";

const STANDARD_DEDUCTION = 14600;

export function registerRoutes(app: Express) {
  app.post("/api/calculate-tax", async (req, res) => {
    try {
      const { grossIncome } = calculateTaxSchema.parse(req.body);
      
      const taxableIncome = grossIncome - STANDARD_DEDUCTION;
      
      // Calculate tax based on 2024 brackets
      let totalTax = 0;
      let marginalRate = 0;
      
      if (taxableIncome > 609350) {
        totalTax += (taxableIncome - 609350) * 0.37;
        marginalRate = 37;
      }
      if (taxableIncome > 243725) {
        totalTax += Math.min(taxableIncome - 243725, 609350 - 243725) * 0.35;
        marginalRate = marginalRate || 35;
      }
      if (taxableIncome > 191950) {
        totalTax += Math.min(taxableIncome - 191950, 243725 - 191950) * 0.32;
        marginalRate = marginalRate || 32;
      }
      if (taxableIncome > 100525) {
        totalTax += Math.min(taxableIncome - 100525, 191950 - 100525) * 0.24;
        marginalRate = marginalRate || 24;
      }
      if (taxableIncome > 47150) {
        totalTax += Math.min(taxableIncome - 47150, 100525 - 47150) * 0.22;
        marginalRate = marginalRate || 22;
      }
      if (taxableIncome > 11600) {
        totalTax += Math.min(taxableIncome - 11600, 47150 - 11600) * 0.12;
        marginalRate = marginalRate || 12;
      }
      if (taxableIncome > 0) {
        totalTax += Math.min(taxableIncome, 11600) * 0.10;
        marginalRate = marginalRate || 10;
      }

      const effectiveRate = (totalTax / grossIncome) * 100;

      // Get insights from Groq API
      const insights = `Based on your income of $${grossIncome.toLocaleString()}, you're in the ${marginalRate}% marginal tax bracket. Your effective tax rate is ${effectiveRate.toFixed(2)}%, meaning you pay an average of ${effectiveRate.toFixed(2)} cents in tax per dollar earned.`;

      const calculation = await storage.saveTaxCalculation({
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
