export interface PersistedHistoryInterface {
  id: number;
  date: Date;
  symbol: string;
  name: string;
  open: number;
  high: number;
  low: number;
  close: number;
  userId: number;
}
