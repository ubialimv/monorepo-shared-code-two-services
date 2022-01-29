import * as OpenApiValidator from 'express-openapi-validator';

const openApiValidatorMiddleware = (path: string) => OpenApiValidator.middleware({
    apiSpec: path,
    validateRequests: true,
    validateResponses: true,
    validateFormats: 'full',
});

export default openApiValidatorMiddleware;