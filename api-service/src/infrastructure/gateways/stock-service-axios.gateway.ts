import { AxiosInstance } from 'axios';
import * as http from 'http';
import * as https from 'https';

import AxiosInterceptor from '../../../../common/http/interceptors/axios.interceptor'
import Stock from '../../../../common/domain/stock/entities/stock.entity';
import { StockServiceGatewayInterface } from '../../domain/stock/gateways/stock-service.gateway.interface';

export default class StockServiceAxiosGateway extends AxiosInterceptor implements StockServiceGatewayInterface {
    private readonly client: AxiosInstance;

    constructor(client: AxiosInstance) {
        super(client);
        this.client = client;
        this.client.defaults.httpAgent = new http.Agent({ keepAlive: true });
        this.client.defaults.httpsAgent = new https.Agent({ keepAlive: true });
    }

    async findOne(id: string): Promise<Stock | null> {
        return this.client.get(`stocks/${id}`);
    }
}
