import { taxCalculations, type TaxCalculation, type InsertTaxCalculation } from "@shared/schema";

export interface IStorage {
  saveTaxCalculation(calculation: InsertTaxCalculation): Promise<TaxCalculation>;
  getTaxCalculation(id: number): Promise<TaxCalculation | undefined>;
}

export class MemStorage implements IStorage {
  private calculations: Map<number, TaxCalculation>;
  private currentId: number;

  constructor() {
    this.calculations = new Map();
    this.currentId = 1;
  }

  async saveTaxCalculation(calculation: InsertTaxCalculation): Promise<TaxCalculation> {
    const id = this.currentId++;
    const taxCalc: TaxCalculation = { ...calculation, id };
    this.calculations.set(id, taxCalc);
    return taxCalc;
  }

  async getTaxCalculation(id: number): Promise<TaxCalculation | undefined> {
    return this.calculations.get(id);
  }
}

export const storage = new MemStorage();
