import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import openApiMiddleware from '../../../../common/middlewares/openApi.middleware'
import makeSpec from './makeSpec';

export default () => [
    json(),
    urlencoded({ extended: true }),
    cors(),
    compression(),
    helmet(),
    morgan('combined'),
    openApiMiddleware(makeSpec())
];