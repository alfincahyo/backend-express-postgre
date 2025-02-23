'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('roles', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true, // Allow null because the column is only set when a record is soft-deleted
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('roles', 'deletedAt');
  }
};
