export interface User {
  id: number;
  name: string;
  isHrd: boolean;
}

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => React.ReactNode;
}