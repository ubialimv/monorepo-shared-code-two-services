import BaseController from "../../../../../../common/controller/base.controller";
import { HttpRequest, HttpResponse } from "../../../../../../common/http/http.interface";
import { StockServiceGatewayInterface } from "../gateways/stock-service.gateway.interface";
import StockExceptions from '../../../../../../common/domain/stock/exceptions';
import { UserRepositoryInterface } from "../../user/repositories/user.repository.interface";
import History from "../../history/entities/history.entity";
import { HistoryRepositoryInterface } from "../../history/repositories/history.repository.interface";
import { MessageBrokerPublisherInterface } from "../../../message-brokers/message-broker.publisher";
import environments from "../../../../shared/environments";

export default class FindOneStockController extends BaseController {
    constructor(
        private readonly gateway: StockServiceGatewayInterface,
        private readonly userRepository: UserRepositoryInterface,
        private readonly historyRepository: HistoryRepositoryInterface,
        private readonly publisher: MessageBrokerPublisherInterface,
    ) {
        super();
    }

    public async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.params;
            const { email } = req.context;

            const stock = await this.gateway.findOne(id);

            if (!stock) {
                return this.notFound(StockExceptions.STOCK_NOT_FOUND);
            }

            const user = await this.userRepository.findUserByEmail(email);

            //TODO add toPlain to Stock entity
            const history = new History({
                userId: user!.toPlain().id,
                symbol: stock.symbol,
                name: stock.name,
                close: stock.close,
                high: stock.high,
                low: stock.low,
                open: stock.open
            })

            await this.historyRepository.create(history);
            // await this.publisher.publish(environments.STOCK_EXCHANGE, { stock: stock.symbol });

            return this.ok(200, stock);
        } catch (error: any) {
            return this.serverError(error.message);
        }
    }
}