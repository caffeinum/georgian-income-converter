
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TaxCalculator from "./TaxCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/utils/types";
import { fetchExchangeRate } from "@/utils/api";
import { getCurrentMonth } from "@/utils/dateUtils";

const CurrencyConverter: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const addTransaction = async (transaction: Transaction) => {
    setIsLoading(true);
    
    try {
      const exchangeRate = await fetchExchangeRate(
        transaction.currency,
        transaction.date
      );
      
      const gelAmount = transaction.amount * exchangeRate.rate;
      
      const updatedTransaction: Transaction = {
        ...transaction,
        gelRate: exchangeRate.rate,
        gelAmount,
      };
      
      setTransactions((prev) => [...prev, updatedTransaction]);
      
      toast.success("Transaction added successfully");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to get exchange rate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.info("Transaction removed");
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-georgian-red">
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
          <CardDescription>
            Enter the transaction details to convert to GEL using the National Bank of Georgia rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm onAddTransaction={addTransaction} />
        </CardContent>
      </Card>
      
      <TaxCalculator transactions={transactions} />
      
      <TransactionList
        transactions={transactions}
        onRemoveTransaction={removeTransaction}
      />
    </div>
  );
};

export default CurrencyConverter;
