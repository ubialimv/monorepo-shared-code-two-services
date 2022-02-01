import makeApp from './shared/factories/makeApp';

const app = makeApp();

(async () => {
  await app.start();
})();
