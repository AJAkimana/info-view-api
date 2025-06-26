'use strict';

const baseColumns = require('./helpers/_base-columns');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('service_info', {
      ...baseColumns(Sequelize),
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      basePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serviceType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('service_info');
  },
};
