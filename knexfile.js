module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/dev.sqlite3',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './db/staging.sqlite3',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './db/production.sqlite3',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
