
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction, Currency } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
  defaultDate?: Date;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  onAddTransaction,
  defaultDate = new Date()
}) => {
  const [date, setDate] = useState<Date>(defaultDate);
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Update the date when the defaultDate prop changes
  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    const newTransaction: Transaction = {
      id: uuidv4(),
      date,
      amount: parseFloat(amount),
      currency,
    };
    
    onAddTransaction(newTransaction);
    
    // Reset form
    setAmount("");
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="transaction-date" className="text-sm font-medium">
            Transaction Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal input-shadow",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <Input
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            step="0.01"
            min="0.01"
            className="input-shadow"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="currency" className="text-sm font-medium">
            Currency
          </label>
          <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
            <SelectTrigger className="input-shadow">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full sm:w-auto bg-georgian-red hover:bg-georgian-red/90 transition-colors"
        disabled={isSubmitting}
      >
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
