import { pgTable, text, serial, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const taxCalculations = pgTable("tax_calculations", {
  id: serial("id").primaryKey(),
  grossIncome: numeric("gross_income").notNull(),
  taxableIncome: numeric("taxable_income").notNull(),
  totalTax: numeric("total_tax").notNull(),
  effectiveRate: numeric("effective_rate").notNull(),
  marginalRate: numeric("marginal_rate").notNull(),
  insights: text("insights"),
});

export const insertTaxCalculationSchema = createInsertSchema(taxCalculations).pick({
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
  grossIncome: z.number().positive("Income must be positive"),
});

export type CalculateTaxInput = z.infer<typeof calculateTaxSchema>;
