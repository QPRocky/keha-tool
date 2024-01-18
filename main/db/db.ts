import knex, { Knex } from 'knex';
import Connection from '../../interfaces/Connection';
import getKnexConfig from './getKnexConfig';
import ConnectionType from '../../interfaces/ConnectionType';

let db: Knex = undefined;

const connect = (connectionConfig: Connection) => {
  disconnect()

  const knexConfig = getKnexConfig(connectionConfig);
  db = knex(knexConfig);
}

const disconnect = () => {
  if (db) {
    db.destroy();
    db = undefined;
  }
};

const testConnection = async (connectionConfig: Connection): Promise<string> => {
  let testDb: Knex = undefined;

  try {
    const knexConfig = getKnexConfig(connectionConfig);
    testDb = knex(knexConfig);
    await testDb.raw('SELECT 1');
    return "";
  } catch (error) {
    console.error('Database connection test failed:', error);
    return error.message;
  } finally {
    testDb.destroy();
  }
}

const getConnectionType = (): ConnectionType => {
  return db.client.config.client as ConnectionType;
}

const getDb = () => {
  if (!db) {
    throw new Error('No database connection');
  }
  return db;
}

export { getDb, connect, disconnect, testConnection, getConnectionType };
