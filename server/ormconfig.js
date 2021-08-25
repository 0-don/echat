require('dotenv/config');
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/dist/entity/*'],
  migrations: [__dirname + '/dist/migration/*'],
};
