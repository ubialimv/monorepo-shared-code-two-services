import FindOneStockController from '../../domain/stock/usecases/findOne-stock-controller.usecase';
import makeStockAxiosGateway from './makeStockAxiosGateway';

export default () => new FindOneStockController(makeStockAxiosGateway());
