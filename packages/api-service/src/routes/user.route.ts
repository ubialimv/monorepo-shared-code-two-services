import { Router } from 'express';
import { expressRoutesAdapter } from 'ubialimv-common';

import authMiddleware from '../application/middlewares/auth.middleware';
import makeHistoryUserController from '../shared/factories/makeHistoryUserController';
import makeLoadUserMiddleware from '../shared/factories/makeLoadUserMiddleware';
import makeLoginUserController from '../shared/factories/makeLoginUserController';
import makeRegisterUserController from '../shared/factories/makeRegisterUserController';

export default (router: Router): void => {
  router.post(
    '/users/register',
    expressRoutesAdapter(makeRegisterUserController()),
  );

  router.post('/users/login', expressRoutesAdapter(makeLoginUserController()));

  router.get(
    '/users/history',
    authMiddleware,
    makeLoadUserMiddleware().handle,
    expressRoutesAdapter(makeHistoryUserController()),
  );
};
