const { DataSource } = require('typeorm');
const path = require('path');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [path.join(__dirname, '/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '/migration/*.{ts,js}')],
  synchronize: false,
});

module.exports = AppDataSource;
