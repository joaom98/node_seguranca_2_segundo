import { createClient } from 'redis';

const DEFAULT_EXPIRE_TIME = parseInt((+new Date)/1000) + 86400 // 24h

let client = null


async function init() {
  client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('initialize', 'ok');
  const value = await client.get('initialize');

  if (value !== 'ok') {
    throw Error('Redis not setting key');
  }
}


async function set(key, value, expireIn = DEFAULT_EXPIRE_TIME) {
  await client.set(key, value)

  if (expireIn) {
    client.expireAt(key, expireIn);
  }
}

async function get(key, defaultValue = null) {
  return await client.get(key) || defaultValue
}


export { init, set, get }