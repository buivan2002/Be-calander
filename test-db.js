require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME_PROD, process.env.DB_USERNAME_PROD, process.env.DB_PASSWORD_PROD, {
  host: process.env.DB_HOST_PROD,
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('✅ DB connected successfully!'))
  .catch(err => console.error('❌ Unable to connect to the DB:', err));
