import HistoryUserController from "../../domain/modules/user/usecases/history-user-controller.usecase";
import makeHistoryRepository from "./makeHistoryRepository";
import makeUserRepository from "./makeUserRepository";

export default () => new HistoryUserController(makeUserRepository(), makeHistoryRepository())