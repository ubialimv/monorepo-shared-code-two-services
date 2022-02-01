import { Router } from 'express';
import { expressRoutesAdapter } from 'ubialimv-common';

import makeFindOneController from '../shared/factories/makeFindOneController';

export default (router: Router): void => {
  router.get('/stocks/:id', expressRoutesAdapter(makeFindOneController()));
};
