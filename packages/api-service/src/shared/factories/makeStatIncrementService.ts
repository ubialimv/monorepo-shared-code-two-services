import StatIncrementService from '../../domain/modules/stat/usecases/stat-increment-service.usecase';
import makeStatRepository from './makeStatRepository';

export default () => new StatIncrementService(makeStatRepository());
