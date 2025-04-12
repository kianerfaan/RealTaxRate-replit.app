import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { calculateTaxSchema, type CalculateTaxInput, type TaxCalculation, Countries } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import TaxResults from "./tax-results";

export default function TaxCalculator() {
  const { toast } = useToast();
  const [results, setResults] = useState<TaxCalculation | null>(null);

  const form = useForm<CalculateTaxInput>({
    resolver: zodResolver(calculateTaxSchema),
    defaultValues: {
      country: "US",
      grossIncome: 50000,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CalculateTaxInput) => {
      const res = await apiRequest("POST", "/api/calculate-tax", data);
      return res.json();
    },
    onSuccess: (data) => {
      setResults(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CalculateTaxInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(Countries).map(([code, name]) => (
                          <SelectItem key={code} value={code}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grossIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Gross Income</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                        <Input
                          {...field}
                          type="number"
                          className="pl-7"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-[#006D77] hover:bg-[#2A9D8F]"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Calculating..." : "Calculate Tax"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {results && <TaxResults results={results} />}
    </div>
  );
}