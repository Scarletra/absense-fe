import { Table, Box } from '@chakra-ui/react';
import type { Column } from '../types';

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const DynamicTable = <T extends Record<string, any>>({ columns, data }: DynamicTableProps<T>) => {
  return (
    <Box bg="white" borderRadius="md" shadow="sm" borderWidth="1px" overflowX="auto">
      <Table.Root variant="line">
        <Table.Header bg="gray.50">
          <Table.Row>
            {columns.map((col, index) => (
              <Table.ColumnHeader key={index}>{col.header}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, rowIndex) => (
            <Table.Row key={rowIndex}>
              {columns.map((col, colIndex) => (
                <Table.Cell key={colIndex}>
                  {col.render ? col.render(row) : (row[col.accessor as keyof T] as React.ReactNode)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};