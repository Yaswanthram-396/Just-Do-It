import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface ResponsiveTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
  /** Shown as the card title on mobile. Defaults to the first column. */
  primary?: boolean;
}

interface ResponsiveTableProps<T> {
  columns: ResponsiveTableColumn<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string | number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  isRowSelected?: (row: T) => boolean;
}

export function ResponsiveTable<T>({ columns, rows, rowKey, emptyMessage = "Nothing to show yet.", onRowClick, isRowSelected }: ResponsiveTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const primaryCol = columns.find(c => c.primary) ?? columns[0];
  const restCols = columns.filter(c => c !== primaryCol);

  return (
    <>
      <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map(col => (
                <TableHead key={col.key} className={col.className}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={rowKey(row, i)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer", isRowSelected?.(row) && "bg-primary/5")}
              >
                {columns.map(col => (
                  <TableCell key={col.key} className={col.className}>{col.render(row)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-2">
        {rows.map((row, i) => (
          <div
            key={rowKey(row, i)}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={cn(
              "bg-card border border-border rounded-lg p-3 space-y-2",
              onRowClick && "cursor-pointer",
              isRowSelected?.(row) && "bg-primary/5 border-primary/30"
            )}
          >
            <div className="font-medium text-sm">{primaryCol.render(row)}</div>
            {restCols.map(col => (
              <div key={col.key} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-muted-foreground shrink-0">{col.header}</span>
                <span className="text-right">{col.render(row)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
