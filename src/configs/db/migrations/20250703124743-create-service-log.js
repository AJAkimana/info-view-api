'use strict';

const baseColumns = require('./helpers/_base-columns');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('service_log', {
      ...baseColumns(Sequelize),
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deviceType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      serviceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'service_info',
          key: 'id',
        },
      },
      payload: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('service_log');
  },
};
