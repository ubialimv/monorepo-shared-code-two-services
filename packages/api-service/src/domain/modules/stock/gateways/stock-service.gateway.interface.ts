import { Stock } from 'ubialimv-common';

export interface StockServiceGatewayInterface {
  findOne(id: string): Promise<Stock | null>;
}
