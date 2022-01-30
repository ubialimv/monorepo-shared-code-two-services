import BaseController from "../../../../../common/controller/base.controller";
import { HttpRequest, HttpResponse } from "../../../../../common/http/http.interface";
import { StockServiceGatewayInterface } from "../gateways/stock-service.gateway.interface";
import StockExceptions from '../../../../../common/domain/stock/exceptions';
import { UserRepositoryInterface } from "../../user/repositories/user.repository.interface";

export default class FindOneStockController extends BaseController {
    constructor(
        private readonly gateway: StockServiceGatewayInterface,
        private readonly userRepository: UserRepositoryInterface
    ) {
        super();
    }

    public async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.params;
            const { email } = req.context;

            const stock = await this.gateway.findOne(id);
            const user = await this.userRepository.findUserByEmail(email);



            if (!stock) {
                return this.NotFound(StockExceptions.STOCK_NOT_FOUND);
            }

            return this.ok(200, stock);
        } catch (error: any) {
            return this.serverError(error.message);
        }
    }
}