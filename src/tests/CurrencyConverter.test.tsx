import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrencyConverter from '../components/CurrencyConverter';
import { saveTransactions, loadTransactions } from '../utils/localStorage';
import { fetchExchangeRate } from '../utils/api';

// Mock dependencies
vi.mock('../utils/localStorage', () => ({
  saveTransactions: vi.fn(),
  loadTransactions: vi.fn(() => []),
}));

vi.mock('../utils/api', () => ({
  fetchExchangeRate: vi.fn().mockResolvedValue({ rate: 2.5, date: '2025-03-30' }),
  calculateTax: vi.fn().mockReturnValue(25), // Mock the calculateTax function
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe('CurrencyConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads transactions from localStorage on mount', async () => {
    const mockTransactions = [
      {
        id: '1',
        date: new Date('2025-03-15'),
        amount: 1000,
        currency: 'USD',
        gelRate: 2.5,
        gelAmount: 2500,
      },
    ];
    
    (loadTransactions as any).mockReturnValueOnce(mockTransactions);
    
    render(<CurrencyConverter selectedMonth={new Date()} />);
    
    expect(loadTransactions).toHaveBeenCalledTimes(1);
    
    // Wait for the transaction to appear in the list
    await waitFor(() => {
      expect(screen.getByText('1000.00')).toBeInTheDocument();
    });
  });

  it('saves transactions to localStorage when adding a new transaction', async () => {
    render(<CurrencyConverter selectedMonth={new Date()} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '500' } });
    fireEvent.mouseDown(screen.getByText(/select currency/i));
    fireEvent.click(screen.getByText('USD'));
    
    // Submit the form
    fireEvent.click(screen.getByText('Add Transaction'));
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(fetchExchangeRate).toHaveBeenCalledTimes(1);
      expect(saveTransactions).toHaveBeenCalledTimes(1);
    });
  });

  it('saves transactions to localStorage when removing a transaction', async () => {
    const mockTransactions = [
      {
        id: '1',
        date: new Date('2025-03-15'),
        amount: 1000,
        currency: 'USD',
        gelRate: 2.5,
        gelAmount: 2500,
      },
    ];
    
    (loadTransactions as any).mockReturnValueOnce(mockTransactions);
    
    render(<CurrencyConverter selectedMonth={new Date()} />);
    
    // Wait for the transaction to appear
    await waitFor(() => {
      expect(screen.getByText('1000.00')).toBeInTheDocument();
    });
    
    // Click the remove button
    fireEvent.click(screen.getByText('Remove'));
    
    // Verify localStorage was updated
    expect(saveTransactions).toHaveBeenCalledTimes(1);
    expect(saveTransactions).toHaveBeenCalledWith([]);
  });
});