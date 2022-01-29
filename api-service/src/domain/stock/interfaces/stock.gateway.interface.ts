import Stock from "../entities/stock";

export interface AxiosGatewayInterface {
    getStock(symbol: string): Promise<Stock | null>
}