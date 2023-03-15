'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type: Sequelize.UUID,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'doctors',
          },
        },
        allowNull: true,
        comment: 'foreign key of doctors table id column',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'doctors',
          },
        },
        allowNull: true,
        comment: 'foreign key of doctors table id column',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      status: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 1,
        comment: '0=inactive,1=active'
      },
      type: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 1,
        comment: '1=single ,2=multple'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chat_groups');
  }
};