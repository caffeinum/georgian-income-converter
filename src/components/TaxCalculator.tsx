
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/utils/types";
import { isDateInSelectedMonth } from "@/utils/dateUtils";
import { calculateTax } from "@/utils/api";
import { DollarSign, Euro } from "lucide-react";
import { format } from "date-fns";

interface TaxCalculatorProps {
  transactions: Transaction[];
  selectedMonth: Date;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ transactions, selectedMonth }) => {
  // Filter transactions for selected month only
  const selectedMonthTransactions = transactions.filter(
    (t) => t.gelAmount && isDateInSelectedMonth(t.date, selectedMonth)
  );
  
  // Calculate totals
  const totalGEL = selectedMonthTransactions.reduce(
    (sum, t) => sum + (t.gelAmount || 0),
    0
  );
  
  const totalUSD = selectedMonthTransactions
    .filter((t) => t.currency === "USD")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalEUR = selectedMonthTransactions
    .filter((t) => t.currency === "EUR")
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate tax (1% for small business)
  const taxAmount = calculateTax(totalGEL);
  
  if (transactions.length === 0) {
    return null;
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income (GEL)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGEL.toFixed(2)} ₾</div>
          <p className="text-xs text-muted-foreground mt-1">
            {format(selectedMonth, "MMMM yyyy")}'s converted income
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total USD</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalUSD.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            USD income in {format(selectedMonth, "MMMM yyyy")}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total EUR</CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{totalEUR.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            EUR income in {format(selectedMonth, "MMMM yyyy")}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-georgian-blue text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Estimated Tax (1%)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{taxAmount.toFixed(2)} ₾</div>
          <p className="text-xs text-georgian-cream/80 mt-1">
            Small business tax
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCalculator;
