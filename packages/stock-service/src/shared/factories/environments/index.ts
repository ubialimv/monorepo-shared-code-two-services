import dotenv from 'dotenv-safe';
import { cleanEnv, port, url } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  APP_PORT: port(),
  STOCK_URL: url(),
});

export default env;
