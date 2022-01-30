import axios from 'axios';

import StockServiceAxiosGateway from "../../infrastructure/gateways/stock-service-axios.gateway";
import environments from '../environments'

const axiosInstance = axios.create({ baseURL: environments.STOCK_SERVICE_URL });

export default () => new StockServiceAxiosGateway(axiosInstance)