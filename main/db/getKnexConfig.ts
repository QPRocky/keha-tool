import { Knex } from "knex";
import Connection from "../../interfaces/Connection";

const getKnexConfig = (config: Connection): Knex.Config => {
  let knexConfig: Knex.Config;

  switch (config.connectionType) {
    case 'pg':
      knexConfig = {
        client: 'pg',
        connection: {
          host: config.server,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
        },
      };
      break;
    case 'mssql':
      knexConfig = {
        client: 'mssql',
        connection: {
          server: config.server,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          options: {
            encrypt: true,
            trustServerCertificate: true,
          }
        },
      };
      break;
    default:
      throw new Error('Unknown connection type');
  }

  return knexConfig
};

export default getKnexConfig;