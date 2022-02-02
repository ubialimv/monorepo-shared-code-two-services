import LoadUserMiddleware from "../../application/middlewares/LoadUser.middleware";
import makeUserRepository from "./makeUserRepository";

export default () => new LoadUserMiddleware(makeUserRepository());