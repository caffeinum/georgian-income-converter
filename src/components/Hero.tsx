
import React from "react";
import { ExternalLink } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="bg-georgian-cream border-b border-georgian-red/20 p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold text-georgian-blue mb-3">Welcome to Georgian Income Converter!</h2>
      
      <div className="space-y-3 text-gray-700">
        <p>
          Hey there! I'm Aleks (Caffeinum), and I created this tool to help Georgian entrepreneurs 
          like you easily convert your foreign currency income to GEL and calculate your taxes.
        </p>
        
        <p>
          This web app uses the official National Bank of Georgia rates to convert your USD or EUR income 
          to GEL based on the exact date of each transaction, making your tax reporting accurate and hassle-free.
        </p>
        
        <div className="mt-4 bg-white p-4 rounded-lg border border-georgian-red/10">
          <h3 className="font-semibold text-georgian-blue">Resources:</h3>
          <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-3">
            <a 
              href="https://mapi.ge/paypal-script" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-georgian-blue hover:text-georgian-red transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              PayPal Script
            </a>
            <a 
              href="https://manageripgeorgia.atlassian.net/wiki/spaces/FAQ/pages/15269889" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-georgian-blue hover:text-georgian-red transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Manager IP Georgia Wiki
            </a>
            <a 
              href="https://pastebin.com/raw/Q2vZb0vh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-georgian-blue hover:text-georgian-red transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Original Google Script
            </a>
            <a 
              href="https://x.com/caffeinum" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-georgian-blue hover:text-georgian-red transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Made by Aleks Aeon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
