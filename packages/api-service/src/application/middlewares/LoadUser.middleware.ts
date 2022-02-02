import { NextFunction, Request, Response } from 'express';
import { UserExceptions } from '../../domain/modules/user/exceptions';
import { UserRepositoryInterface } from "../../domain/modules/user/repositories/user.repository.interface";

export default class LoadUserMiddleware {
    constructor(private readonly userRepository: UserRepositoryInterface) {}

     handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const { email } = req.context;
    
            const user = await this.userRepository.findUserByEmail(email);
            if(!user) {
                return res.status(400).send({ message: UserExceptions.USER_NOT_FOUND });
            }

            req.context = user;

            return next();

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
          }
    }
}