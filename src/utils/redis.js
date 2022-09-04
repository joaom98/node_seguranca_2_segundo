import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('initialize', 'ok');
const value = await client.get('initialize');

if (value !== 'ok') {
  throw Error('Redis not setting key');
}


async function set(key, value) {
  // TODO: set value in redis
}

async function get(key, defaultValue = null) {
  // TODO: get value in redis
}


export { set, get }