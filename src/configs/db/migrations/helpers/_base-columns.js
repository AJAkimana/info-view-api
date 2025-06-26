'use strict';

/** * Base columns for Sequelize migrations
 * @param {import('sequelize').Sequelize} Sequelize - Sequelize instance
 * @returns {Object} Base columns definition
 */
module.exports = (Sequelize) => ({
  id: {
    type: 'UUID',
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    type: 'TIMESTAMP WITH TIME ZONE',
  },
  updatedAt: {
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    type: 'TIMESTAMP WITH TIME ZONE',
  },
});
