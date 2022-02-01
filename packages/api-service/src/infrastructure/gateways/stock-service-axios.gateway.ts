import { AxiosInstance } from 'axios';
import * as http from 'http';
import * as https from 'https';
import { Stock, AxiosInterceptor, StockInterface } from 'ubialimv-common';

import { StockServiceGatewayInterface } from '../../domain/modules/stock/gateways/stock-service.gateway.interface';

export default class StockServiceAxiosGateway
  extends AxiosInterceptor
  implements StockServiceGatewayInterface
{
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    super(client);
    this.client = client;
    this.client.defaults.httpAgent = new http.Agent({ keepAlive: true });
    this.client.defaults.httpsAgent = new https.Agent({ keepAlive: true });
  }

  async findOne(id: string): Promise<Stock | null> {
    const response = await this.client.get<any, StockInterface>(`stocks/${id}`);
    return new Stock(response);
  }
}
