
import React from 'react';
import CurrencyConverter from '@/components/CurrencyConverter';
import { getCurrentMonth } from '@/utils/dateUtils';

const Index = () => {
  const currentMonth = getCurrentMonth();

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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-georgian-blue">
                {currentMonth} Income
              </h2>
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

          <CurrencyConverter />
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
