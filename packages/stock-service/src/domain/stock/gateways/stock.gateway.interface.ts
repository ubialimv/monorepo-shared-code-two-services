import { Stock } from 'ubialimv-common';

export interface StockGatewayInterface {
  getStock(symbol: string): Promise<Stock | null>;
}
