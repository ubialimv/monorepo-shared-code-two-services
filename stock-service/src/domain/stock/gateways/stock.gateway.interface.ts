import Stock from "../../../../../common/domain/stock/entities/stock.entity";

export interface StockGatewayInterface {
    getStock(symbol: string): Promise<Stock | null>
}