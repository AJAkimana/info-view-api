'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert a demo company
    await queryInterface.bulkInsert('companies', [
      {
        name: 'Demo Company',
        email: 'info@demo.com',
        phoneNumber: '+1234567890',
        address: '123 Demo Street, City',
        logoUrl: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Revert the seed by deleting the demo company
    await queryInterface.bulkDelete('companies', {
      email: 'info@demo.com',
    });
  },
};
