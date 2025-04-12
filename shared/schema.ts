import { pgTable, text, serial, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Countries = {
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
  JP: "Japan",
  AU: "Australia",
} as const;

export type CountryCode = keyof typeof Countries;

// Tax bracket interfaces
export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export interface CountryTaxConfig {
  name: string;
  currency: string;
  brackets: TaxBracket[];
}

export const taxCalculations = pgTable("tax_calculations", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  grossIncome: numeric("gross_income").notNull(),
  taxableIncome: numeric("taxable_income").notNull(),
  totalTax: numeric("total_tax").notNull(),
  effectiveRate: numeric("effective_rate").notNull(),
  marginalRate: numeric("marginal_rate").notNull(),
  insights: text("insights"),
});

export const insertTaxCalculationSchema = createInsertSchema(taxCalculations).pick({
  country: true,
  grossIncome: true,
  taxableIncome: true,
  totalTax: true,
  effectiveRate: true,
  marginalRate: true,
  insights: true,
});

export type InsertTaxCalculation = z.infer<typeof insertTaxCalculationSchema>;
export type TaxCalculation = typeof taxCalculations.$inferSelect;

export const calculateTaxSchema = z.object({
  country: z.enum(Object.keys(Countries) as [CountryCode, ...CountryCode[]]),
  grossIncome: z.number().positive("Income must be positive"),
});

export type CalculateTaxInput = z.infer<typeof calculateTaxSchema>;