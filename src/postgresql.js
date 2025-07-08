// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import Knex from 'knex'

export const postgresql = app => {
  // Use the 'postgres' config key from config/default.json
  const config = app.get('postgres');
  const knex = Knex(config);
  app.set('postgresqlClient', knex);
}
