import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'develop';
const { username, password, database, ...configs } =
  require('../configs/env-config')[env] || {};

export const sequelize = new Sequelize(database, username, password, configs);

export async function initializeDatabase() {
  try {
    console.log({ username, password, database, configs });

    await sequelize.authenticate();
    // For development, you can use sync to create tables based on models
    // Uncomment the line below to sync models with the database
    // Note: Create migrations for production use instead of sync
    // This will create tables if they do not exist, or alter them if they do
    // await sequelize.sync({ alter: true }); // or { force: true } for dev
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
