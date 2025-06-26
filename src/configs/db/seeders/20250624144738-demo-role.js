'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'superadmin',
        key: 'superadmin',
        description: 'Super Administrator role with full access',
      },
      {
        name: 'admin',
        key: 'admin',
        description: 'Administrator role with most of the access',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Revert the seed by deleting the demo role
    await queryInterface.bulkDelete('roles', {
      key: 'admin',
    });
  },
};
