import FindOneStockController from '../../domain/modules/stock/usecases/findOne-stock-controller.usecase';
import makeHistoryRepository from './makeHistoryRepository';
import makeMessageBrokerPublisher from './makeMessageBrokerPublisher';
import makeStockServiceAxiosGateway from './makeStockServiceAxiosGateway';

export default () =>
  new FindOneStockController(
    makeStockServiceAxiosGateway(),
    makeHistoryRepository(),
    makeMessageBrokerPublisher(),
  );
