import {
  BaseController,
  HttpRequest,
  HttpResponse,
  StockExceptions,
} from 'ubialimv-common';
import { StockServiceGatewayInterface } from '../gateways/stock-service.gateway.interface';
import { UserRepositoryInterface } from '../../user/repositories/user.repository.interface';
import History from '../../history/entities/history.entity';
import { HistoryRepositoryInterface } from '../../history/repositories/history.repository.interface';
import { MessageBrokerPublisherInterface } from '../../../message-brokers/message-broker.publisher';
import environments from '../../../../shared/environments';

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

      const history = new History({
        userId: user!.toPlain().id,
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
