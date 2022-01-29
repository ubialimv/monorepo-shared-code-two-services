import BaseController from '../../../../../common/controller/base.controller';
import { HttpRequest, HttpResponse } from '../../../../../common/http/http.interface';
import StockAxiosGateway from '../../../infrastructure/gateways/stock-axios.gateway';
import StockExceptions from '../exceptions';

export default class FindOneStockController extends BaseController {
    constructor(private readonly gateway: StockAxiosGateway) {
        super();
    }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.params;

            const stock = await this.gateway.getStock(id);

            if (!stock) {
                return this.NotFound(StockExceptions.STOCK_NOT_FOUND);
            }

            return this.ok(200, stock);
        } catch (error: any) {
            return this.serverError(error.message);
        }
    }
}
