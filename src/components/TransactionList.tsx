
import React from "react";
import { Transaction } from "@/utils/types";
import { formatDateForDisplay } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface TransactionListProps {
  transactions: Transaction[];
  onRemoveTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onRemoveTransaction,
}) => {
  if (transactions.length === 0) {
    return (
      <Card className="mt-6 border-dashed border-2">
        <CardContent className="pt-6 text-center text-muted-foreground">
          No transactions added yet. Add your first transaction above.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 animate-fade-in">
      <h3 className="text-lg font-medium mb-2">Transactions</h3>
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Exchange Rate</TableHead>
              <TableHead>GEL Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDateForDisplay(transaction.date)}</TableCell>
                <TableCell>
                  {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{transaction.currency}</TableCell>
                <TableCell>
                  {transaction.gelRate ? transaction.gelRate.toFixed(4) : "-"}
                </TableCell>
                <TableCell>
                  {transaction.gelAmount ? transaction.gelAmount.toFixed(2) : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveTransaction(transaction.id)}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionList;
