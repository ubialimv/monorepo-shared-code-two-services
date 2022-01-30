import FindOneStockController from "../../domain/stock/usecases/findOne-stock-controller.usecase";
import makeStockServiceAxiosGateway from "./makeStockServiceAxiosGateway";
import makeUserRepository from "./makeUserRepository";

export default () => new FindOneStockController(makeStockServiceAxiosGateway(), makeUserRepository())