import Stock from "../../../../../../common/domain/stock/entities/stock.entity";

export interface StockServiceGatewayInterface {
    findOne(id: string): Promise<Stock | null>
}