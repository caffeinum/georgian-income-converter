
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TaxCalculator from "./TaxCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/utils/types";
import { fetchExchangeRate } from "@/utils/api";
import { format, startOfMonth } from "date-fns";
import { saveTransactions, loadTransactions } from "@/utils/localStorage";

interface CurrencyConverterProps {
  selectedMonth: Date;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultDate, setDefaultDate] = useState<Date>(new Date());
  
  // Load transactions from localStorage on component mount
  useEffect(() => {
    const storedTransactions = loadTransactions();
    if (storedTransactions.length > 0) {
      setTransactions(storedTransactions);
      toast.info(`Loaded ${storedTransactions.length} saved transactions`);
    }
  }, []);
  
  // Update the default date when the selected month changes
  useEffect(() => {
    // Set the default date to the first day of the selected month
    const firstDayOfMonth = startOfMonth(selectedMonth);
    setDefaultDate(firstDayOfMonth);
  }, [selectedMonth]);
  
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
      
      const updatedTransactions = [...transactions, updatedTransaction];
      setTransactions(updatedTransactions);
      
      // Save to localStorage
      saveTransactions(updatedTransactions);
      
      toast.success("Transaction added successfully");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to get exchange rate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeTransaction = (id: string) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
    
    // Save to localStorage
    saveTransactions(updatedTransactions);
    
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
          <TransactionForm 
            onAddTransaction={addTransaction} 
            defaultDate={defaultDate}
          />
        </CardContent>
      </Card>
      
      <TaxCalculator 
        transactions={transactions} 
        selectedMonth={selectedMonth}
      />
      
      <TransactionList
        transactions={transactions}
        onRemoveTransaction={removeTransaction}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default CurrencyConverter;
