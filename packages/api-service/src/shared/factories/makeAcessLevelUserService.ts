import AccessLevelUserService from '../../domain/modules/user/usecases/accessLevel-user-service.usecase';
import makeUserRepository from './makeUserRepository';

export default () => new AccessLevelUserService(makeUserRepository());
