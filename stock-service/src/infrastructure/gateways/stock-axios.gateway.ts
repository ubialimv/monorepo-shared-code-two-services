import { AxiosInstance } from 'axios';
import * as http from 'http';
import * as https from 'https';

import AxiosInterceptor from '../../../../common/http/interceptors/axios.interceptor'
import Stock from '../../../../common/domain/stock/entities/stock.entity';
import { StockInterface } from '../../../../common/domain/stock/interfaces/stock.interface';
import { StockGatewayInterface } from '../../domain/stock/gateways/stock.gateway.interface';

export default class StockAxiosGateway extends AxiosInterceptor implements StockGatewayInterface {
    private readonly client: AxiosInstance;

    constructor(client: AxiosInstance) {
        super(client);
        this.client = client;
        this.client.defaults.httpAgent = new http.Agent({ keepAlive: true });
        this.client.defaults.httpsAgent = new https.Agent({ keepAlive: true });
    }

    async getStock(symbol: string): Promise<Stock | null> {
        const response: { symbols: StockInterface[] } = await this.client.get(`q/l/?s=${symbol}&f=sd2t2ohlcvn&h&e=json`);

        if (response.symbols.length === 0) return null;

        return new Stock(response.symbols[0]);
    }
}
