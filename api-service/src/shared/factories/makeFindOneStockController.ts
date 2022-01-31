import FindOneStockController from "../../domain/modules/stock/usecases/findOne-stock-controller.usecase";
import makeHistoryRepository from "./makeHistoryRepository";
import makeMessageBrokerPublisher from "./makeMessageBrokerPublisher";
import makeStockServiceAxiosGateway from "./makeStockServiceAxiosGateway";
import makeUserRepository from "./makeUserRepository";

export default () => new FindOneStockController(makeStockServiceAxiosGateway(), makeUserRepository(), makeHistoryRepository(), makeMessageBrokerPublisher())