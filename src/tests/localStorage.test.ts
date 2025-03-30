import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveTransactions, loadTransactions, clearTransactions } from '../utils/localStorage';
import { Transaction } from '../utils/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('localStorage utils', () => {
  const testTransactions: Transaction[] = [
    {
      id: '1',
      date: new Date('2025-01-15'),
      amount: 1000,
      currency: 'USD',
      gelRate: 2.5,
      gelAmount: 2500,
    },
    {
      id: '2',
      date: new Date('2025-02-20'),
      amount: 500,
      currency: 'EUR',
      gelRate: 3.0,
      gelAmount: 1500,
    },
  ];

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should save transactions to localStorage', () => {
    saveTransactions(testTransactions);
    
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'georgian-income-converter-transactions',
      expect.any(String)
    );
    
    // Verify the saved data contains serialized dates
    const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
    expect(savedData[0].date).toBe('2025-01-15T00:00:00.000Z');
    expect(savedData[1].date).toBe('2025-02-20T00:00:00.000Z');
  });

  it('should load transactions from localStorage', () => {
    // Setup localStorage with test data
    const serializedTransactions = testTransactions.map(t => ({
      ...t,
      date: t.date.toISOString(),
    }));
    localStorageMock.setItem(
      'georgian-income-converter-transactions',
      JSON.stringify(serializedTransactions)
    );
    
    const loadedTransactions = loadTransactions();
    
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    expect(loadedTransactions).toHaveLength(2);
    expect(loadedTransactions[0].id).toBe('1');
    expect(loadedTransactions[0].date).toBeInstanceOf(Date);
    expect(loadedTransactions[0].date.getFullYear()).toBe(2025);
    expect(loadedTransactions[0].date.getMonth()).toBe(0); // January is 0
    expect(loadedTransactions[0].date.getDate()).toBe(15);
  });

  it('should return empty array when no transactions in localStorage', () => {
    const loadedTransactions = loadTransactions();
    
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    expect(loadedTransactions).toEqual([]);
  });

  it('should clear transactions from localStorage', () => {
    clearTransactions();
    
    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      'georgian-income-converter-transactions'
    );
  });
});