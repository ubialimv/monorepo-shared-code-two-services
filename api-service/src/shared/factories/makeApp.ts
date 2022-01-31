import makeMiddlewares from './makeMiddlewares';
import App from '../../../../common/app';
import userRoute from '../../routes/user.route';
import stockRoute from '../../routes/stock.route';
import statRoute from '../../routes/stat.route';
import makeSpec from './makeSpec';
import environments from '../environments';


export default () => new App({
    port: environments.APP_PORT,
    middleWares: makeMiddlewares(),
    routes: [userRoute, stockRoute, statRoute],
    spec: makeSpec()
})