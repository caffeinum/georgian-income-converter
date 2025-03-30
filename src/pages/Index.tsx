
import React, { useState } from 'react';
import CurrencyConverter from '@/components/CurrencyConverter';
import Hero from '@/components/Hero';
import { format, subMonths } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from 'lucide-react';

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  
  // Generate the last 12 months for the selector
  const generateMonthOptions = () => {
    const options = [];
    for (let i = 0; i < 12; i++) {
      const date = subMonths(new Date(), i);
      options.push({
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy')
      });
    }
    return options;
  };
  
  const monthOptions = generateMonthOptions();
  const formattedSelectedMonth = format(selectedMonth, 'MMMM yyyy');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="georgian-gradient text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Georgian Income Converter</h1>
          <p className="text-georgian-cream/90">
            Convert foreign currency income to GEL and calculate taxes for small business owners
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 -mt-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Hero />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-georgian-blue">
                  Income
                </h2>
                <div className="w-48">
                  <Select 
                    value={format(selectedMonth, 'yyyy-MM')}
                    onValueChange={(value) => {
                      const [year, month] = value.split('-');
                      const newDate = new Date(parseInt(year), parseInt(month) - 1);
                      setSelectedMonth(newDate);
                    }}
                  >
                    <SelectTrigger className="h-8 text-sm border-georgian-blue/30">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-muted-foreground">
                Track your foreign currency income and tax obligations
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm bg-georgian-cream p-3 rounded-lg border border-georgian-red/20">
              <p>
                <strong>Note:</strong> Rates are from the National Bank of Georgia
              </p>
            </div>
          </div>

          <CurrencyConverter selectedMonth={selectedMonth} />
        </div>
      </main>

      <footer className="bg-georgian-blue text-white py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            Georgian Income Converter for Entrepreneurs &copy; {new Date().getFullYear()}
          </p>
          <p className="mt-2 text-georgian-cream/80">
            Uses official exchange rates from the National Bank of Georgia
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
