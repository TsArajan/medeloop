'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('event_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.STRING
      },
      mail_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      start_time: {
        allowNull: false,
        type: 'timestamp without time zone'
      },
      end_time: {
        allowNull: false,
        type: 'timestamp without time zone'
      },
      summary: {
        type: Sequelize.TEXT
      },
      calendar_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: 'timestamp without time zone'
      },
      updatedAt: {
        allowNull: false,
        type: 'timestamp without time zone'
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event_lists');
  }
};