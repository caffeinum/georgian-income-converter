
import { Currency, ExchangeRate, NBGResponse } from "./types";
import { formatDateForAPI } from "./dateUtils";

const NBG_BASE_URL = "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json";

export const fetchExchangeRate = async (
  currency: Currency,
  date: Date
): Promise<ExchangeRate> => {
  const formattedDate = formatDateForAPI(date);
  const url = `${NBG_BASE_URL}/?currencies=${currency}&date=${formattedDate}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rate: ${response.statusText}`);
    }
    
    const data = await response.json() as NBGResponse[];
    
    if (!data || !data[0] || !data[0].currencies || !data[0].currencies[0]) {
      throw new Error("Invalid response format from NBG API");
    }
    
    const rate = data[0].currencies[0].rate;
    
    return {
      date: formattedDate,
      rate
    };
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
};

export const calculateTax = (gelAmount: number): number => {
  // Standard small business tax rate in Georgia is 1%
  return gelAmount * 0.01;
};
