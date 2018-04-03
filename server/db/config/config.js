require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'swampious',
    database: 'testdb',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DATABASE_TEST,
    password: process.env.DATABASE_PASSWORD_TEST,
    database: process.env.DATABASE_TEST,
    host: process.env.DATABASE_HOST_TEST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DATABASE_PROD,
    password: process.env.DATABASE_PASSWORD_PROD,
    database: process.env.DATABASE_PROD,
    host: process.env.DATABASE_HOST_PROD,
    dialect: 'postgres',
  },
};
