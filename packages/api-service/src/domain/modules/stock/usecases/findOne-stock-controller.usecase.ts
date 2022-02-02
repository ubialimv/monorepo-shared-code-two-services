import {
  BaseController,
  HttpRequest,
  HttpResponse,
  StockExceptions,
} from 'ubialimv-common';
import { StockServiceGatewayInterface } from '../gateways/stock-service.gateway.interface';
import History from '../../history/entities/history.entity';
import { HistoryRepositoryInterface } from '../../history/repositories/history.repository.interface';
import { MessageBrokerPublisherInterface } from '../../../message-brokers/message-broker.publisher';
import environments from '../../../../shared/environments';

export default class FindOneStockController extends BaseController {
  constructor(
    private readonly gateway: StockServiceGatewayInterface,
    private readonly historyRepository: HistoryRepositoryInterface,
    private readonly publisher: MessageBrokerPublisherInterface,
  ) {
    super();
  }

  public async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = req.params;
      const { id: userId } = req.context;

      const stock = await this.gateway.findOne(id);

      if (!stock) {
        return this.notFound(StockExceptions.STOCK_NOT_FOUND);
      }

      const history = new History({
        userId: userId,
        ...stock.toPlain(),
      });

      await this.historyRepository.create(history);
      await this.publisher.publish(environments.STOCK_EXCHANGE, {
        stock: stock.symbol,
      });

      return this.ok(200, stock.toResponse());
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }
}
