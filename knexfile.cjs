// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html

module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'Mycaren014324!',
    database: 'executive-dashboard-backend'
  },
  migrations: {
    directory: './migrations'
  }
};
