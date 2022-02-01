import { Stock } from 'ubialimv-common';

export interface AxiosGatewayInterface {
  getStock(symbol: string): Promise<Stock | null>;
}
