import dotenv from 'dotenv-safe'
import { cleanEnv, port, url, str, num } from 'envalid'

dotenv.config();

const env = cleanEnv(process.env, {
    APP_PORT: port(),
    STOCK_SERVICE_URL: url(),
    APP_SECRET: str(),
    TOKEN_EXPIRATION: num(),
    DATABASE_URL: str(),
})

export default env