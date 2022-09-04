/* eslint-disable no-console */
import app from './src/app.js';
import { init as redisInit } from './src/utils/cache.js';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await redisInit();
  console.log(`Servidor escutando em http://localhost:${port}`);
});
