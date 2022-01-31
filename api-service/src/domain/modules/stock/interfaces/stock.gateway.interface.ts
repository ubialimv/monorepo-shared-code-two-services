import Stock from "../../../../../../common/domain/stock/entities/stock.entity";

export interface AxiosGatewayInterface {
    getStock(symbol: string): Promise<Stock | null>
}