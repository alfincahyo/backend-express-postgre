'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('users', 'phone', {
        type: Sequelize.STRING(20),
        allowNull: true
      }),
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'is_active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }),
      queryInterface.addColumn('users', 'deletedAt', {
        type: Sequelize.DATE,
        allowNull: true, // Allow null because the column is only set when a record is soft-deleted
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */ 
    return Promise.all([
      queryInterface.removeColumn('users', 'phone'),
      queryInterface.removeColumn('users', 'image'),
      queryInterface.removeColumn('users', 'is_active'),
      queryInterface.removeColumn('users', 'deletedAt'),
    ]);
  },
};
