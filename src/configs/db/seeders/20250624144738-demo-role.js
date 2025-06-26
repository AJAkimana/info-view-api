'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get the demo company id
    const [company] = await queryInterface.sequelize.query(
      `SELECT id FROM companies WHERE email = 'info@demo.com' LIMIT 1;`,
    );
    if (!company.length) return;

    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        companyId: company[0].id,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Revert the seed by deleting the demo role
    await queryInterface.bulkDelete('roles', {
      name: 'admin',
    });
  },
};
