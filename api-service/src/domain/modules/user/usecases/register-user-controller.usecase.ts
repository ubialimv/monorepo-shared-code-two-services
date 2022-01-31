import BaseController from '../../../../../../common/controller/base.controller';
import { HttpRequest, HttpResponse } from '../../../../../../common/http/http.interface';
import randomPassword from '../../../../shared/randomPassword';
import User from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';

export default class RegisterUserController extends BaseController {
    constructor(private readonly repository: UserRepositoryInterface) {
        super()
    }

    public async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { email } = req.body;

            const userData = {
                email,
                password: randomPassword(),
            }

            const user = new User(userData)

            const createdUser = await this.repository.create(user);

            return this.ok(200, createdUser.toResponse());

        } catch (error: any) {
            return this.serverError(error.message);
        }
    }
}