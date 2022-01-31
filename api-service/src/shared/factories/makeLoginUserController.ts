import LoginUserController from "../../domain/modules/user/usecases/login-user-controller.usecase";
import makeUserRepository from "./makeUserRepository";

export default () => new LoginUserController(makeUserRepository());