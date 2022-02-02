import HistoryUserController from '../../domain/modules/user/usecases/history-user-controller.usecase';
import makeHistoryRepository from './makeHistoryRepository';

export default () =>
  new HistoryUserController(makeHistoryRepository());
