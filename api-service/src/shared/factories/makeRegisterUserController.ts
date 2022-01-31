import RegisterUserController from "../../domain/modules/user/usecases/register-user-controller.usecase";
import makeUserRepository from "./makeUserRepository";

export default () => new RegisterUserController(makeUserRepository())