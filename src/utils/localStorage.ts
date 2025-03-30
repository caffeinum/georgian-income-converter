import { Transaction } from './types';

const STORAGE_KEY = 'georgian-income-converter-transactions';

// Helper function to serialize Date objects before storing
const serializeTransaction = (transaction: Transaction): any => ({
  ...transaction,
  date: transaction.date.toISOString(),
});

// Helper function to deserialize Date strings back to Date objects
const deserializeTransaction = (transaction: any): Transaction => ({
  ...transaction,
  date: new Date(transaction.date),
});

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    const serializedTransactions = transactions.map(serializeTransaction);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedTransactions));
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error);
  }
};

export const loadTransactions = (): Transaction[] => {
  try {
    const storedTransactions = localStorage.getItem(STORAGE_KEY);
    if (!storedTransactions) {
      return [];
    }
    
    const parsedTransactions = JSON.parse(storedTransactions);
    return parsedTransactions.map(deserializeTransaction);
  } catch (error) {
    console.error('Error loading transactions from localStorage:', error);
    return [];
  }
};

export const clearTransactions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing transactions from localStorage:', error);
  }
};