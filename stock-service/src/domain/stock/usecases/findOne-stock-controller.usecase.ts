import BaseController from '../../../../../common/controller/base.controller';
import { HttpRequest, HttpResponse } from '../../../../../common/http/http.interface';
import StockExceptions from '../../../../../common/domain/stock/exceptions';
import { StockGatewayInterface } from '../gateways/stock.gateway.interface';

export default class FindOneStockController extends BaseController {
    constructor(private readonly gateway: StockGatewayInterface) {
        super();
    }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.params;

            const stock = await this.gateway.getStock(id);

            if (!stock) {
                return this.notFound(StockExceptions.STOCK_NOT_FOUND);
            }

            return this.ok(200, stock);
        } catch (error: any) {
            return this.serverError(error.message);
        }
    }
}
