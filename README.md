## This code is using TypeScript, Express.js and [Prisma](https://www.prisma.io/)

### Description

This monorepo is composed by 3 packages:

- api-service: Web-facing service that allows to register users, login, request stock information, query user's history of requests and stats based on top 5 requested stocks;
- common: Codebase sheared between `api-service` and `stock-service`;
- stock-service: Internal service that gets stock information from [stooq](https://stooq.com/t/?i=518) and returns to the service that has requested the information.

The `api-service` and `stock-service` are Contract-First, so it's using a middleware that reads the routes documentation and validates each route accordingly to it. This middleware validates requests and responses, so any new route or any change must start with the documentation.

The documentation is a [Swagger](https://swagger.io/resources/open-api/) file and can be found in the `contracts` folder in the root folder of the `api-service` or `stock-service`. After you start `api-service` or `stock-service` you may see it accessing `/docs` route.

### Dependencies

To install the dependencies of the project, run the following command on the root folder:

```bash
$ yarn
```

### Running the services

The `api-service` has three dependencies, `postgres`, `rabbitMq` and `stock-service`, so before starting the service you'll need to start `postgres` and `rabbitMq` from the docker-compose.yml in the root folder of the repository:

```bash
$ docker-compose up
```

After you run the above command you'll need to create the database and its tables, you can run the following in the root folder of the repository:

```bash
$ yarn workspace api-service run prisma:db
```

Before starting the `api-service`, you'll need to start `stock-service`. Check the next section to do it.

### Development

Once you have done the previous steps you may be able to start the services on development mode. All you'll need to do is is create a `.env` accordantly to the `.env.example`. These examples are located on the root folder from `api-service` and `stock-service` as well.

All done? go to the root folder of the repository and run:

```bash
# api-service
$ yarn workspace api-service run dev
```

```bash
# stock-service
$ yarn workspace stock-service run dev
```

### Production

To start the services on production mode, you need to make sure that you already have created the `.env` files in the root folder of the `api-service` and `stock-service` as well. See [Development](#development). Once you confirmed, go to the root folder of the repository and run:

```bash
# building
$ yarn workspaces run build
```

And now you can start the services:

```bash
# api-service
$ yarn workspace api-service run start
```

```bash
# stock-service
$ yarn workspace stock-service run start
```

## Env vars

### api-service

- APP_PORT: Port the service is going to use;
- APP_SECRET: Secret used to create JWT token;
- TOKEN_EXPIRATION: Time in seconds that the JWT token will expire.
- STOCK_SERVICE_URL: `stock-service` url;
- DATABASE_URL: The connection url including authentication info. Check [Prisma](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#datasource). Ex: `postgresql://user:password@localhost:5432/mydb?schema=public`;
- RABBITMQ_URL: The connection url. Ex: `amqp://localhost`;
- RABBITMQ_PREFETCH: Number of unacknowledged messages on a channel. Ex: 10;
- STOCK_EXCHANGE: The name of the stock exchange;
- STOCK_QUEUE: The name of stock queue;
- STOCK_EXCHANGE_DLQ: The name of dlq exchange. Messages that have not been consumed successfully will be sent to this exchange.
- STOCK_DLQ: The name of dlq. Messages sent to STOCK_EXCHANGE_DLQ will be bound to this queue.

### stock-service

- APP_PORT: Port the service is going to use;
- STOCK_URL=The url from [stoop](https://stooq.com);

## Aditional info

- Some routes from `api-service` require authentication, so you'll need a valid JWT token with this specification: `Bearer <token>`. You can get one, after registering a user `POST users/register` and then logging in using `POST users/login`. Detailed information can be found after you start up the `api-service` and go to `GET /docs`.

- The information about the most requested stocks is created asynchronously. Each request executed on `GET stocks/:id` will be sent a payload to the message-broker (`rabbitMq`) and eventually, this payload will be consumed and create or update the stock stats.
