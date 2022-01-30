import jwt from 'jsonwebtoken';

import BaseController from '../../../../../common/controller/base.controller';
import { HttpRequest, HttpResponse } from '../../../../../common/http/http.interface';
import environments from '../../../shared/environments'
import randomPassword from '../../../shared/randomPassword';
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

            await this.repository.create(new User(userData));

            // const token = jwt.sign({ data: userData, exp: environments.TOKEN_EXPIRATION }, environments.APP_SECRET);
            const token = jwt.sign(userData, environments.APP_SECRET, {
                expiresIn: environments.TOKEN_EXPIRATION
            });

            return this.ok(200, { ...userData, token });

        } catch (error: any) {
            return this.serverError(error.message);
        }
    }
}