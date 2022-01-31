import StatController from "../../domain/modules/stat/usecases/stat-controller.usecase";
import makeStatRepository from "./makeStatRepository";

export default () => new StatController(makeStatRepository());