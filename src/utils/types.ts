
export type Currency = "USD" | "EUR";

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  currency: Currency;
  gelRate?: number;
  gelAmount?: number;
}

export interface ExchangeRate {
  date: string;
  rate: number;
}

export interface NBGResponse {
  date: string;
  currencies: {
    code: string;
    quantity: number;
    rateFormated: string;
    diffFormated: string;
    rate: number;
    name: string;
    diff: number;
    date: string;
    validFromDate: string;
  }[];
}
