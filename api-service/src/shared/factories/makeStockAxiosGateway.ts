import axios from 'axios';

import StockAxiosGateway from "../../infrastructure/gateways/stock-axios.gateway";

const axiosInstance = axios.create({ baseURL: 'https://stooq.com' });

export default () => new StockAxiosGateway(axiosInstance)