import makeMiddlewares from './makeMiddlewares'
import App from '../../../../common/app'
import stockRoute from '../../routes/stock.route'
import makeSpec from './makeSpec'
import environments from './environments';


export default () => new App({
    port: environments.APP_PORT,
    middleWares: makeMiddlewares(),
    routes: [stockRoute],
    spec: makeSpec()
})