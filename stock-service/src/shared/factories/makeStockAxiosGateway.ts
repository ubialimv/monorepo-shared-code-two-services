import axios from 'axios';

import StockAxiosGateway from "../../infrastructure/gateways/stock-axios.gateway";
import environments from './environments';

const axiosInstance = axios.create({ baseURL: environments.STOCK_URL });

export default () => new StockAxiosGateway(axiosInstance)