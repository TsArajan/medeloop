'use strict';
/** @type {import('sequelize-cli').Migration} */

const moment = require('moment');
const date = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mail: {
        allowNull: true,
        type: Sequelize.STRING
      },
      token: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      type: {
        allowNull: true,
        type: Sequelize.SMALLINT
      },
      createdAt: {
        allowNull: false,
        type: 'timestamp without time zone'
      },
      updatedAt: {
        allowNull: false,
        type: 'timestamp without time zone'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};