import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type TaxCalculation } from "@shared/schema";
import { AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaxResultsProps {
  results: TaxCalculation;
}

export default function TaxResults({ results }: TaxResultsProps) {
  const metrics = [
    {
      title: "Total Tax",
      value: `$${results.totalTax.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      tooltip: "The total amount of federal income tax you owe for the year",
    },
    {
      title: "Effective Tax Rate",
      value: `${results.effectiveRate.toFixed(2)}%`,
      tooltip: "The percentage of your total income that you pay in taxes",
    },
    {
      title: "Marginal Tax Rate",
      value: `${results.marginalRate}%`,
      tooltip: "The tax rate on your last dollar of income",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="ml-1">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{metric.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#006D77]">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tax Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{results.insights}</p>
        </CardContent>
      </Card>
    </div>
  );
}
