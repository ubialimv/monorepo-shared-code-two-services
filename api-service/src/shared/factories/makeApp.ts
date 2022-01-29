import path from 'path'

import makeMiddlewares from './makeMiddlewares'
import App from '../../../../common/app'
import stockRoutes from '../../routes/stock.route'
import makeSpec from './makeSpec'


export default () => new App({
    port: 3000,
    middleWares: makeMiddlewares(),
    routes: [stockRoutes],
    spec: makeSpec()
})