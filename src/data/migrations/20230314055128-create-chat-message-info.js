'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat_message_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'chat_groups',
          },
        },
        allowNull: true,
        comment: 'foreign key of chat_groups table id column',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      chat_message_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'chat_messages',
          },
        },
        allowNull: true,
        comment: 'foreign key of chat_messages table id column',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      is_delivered: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue:0,
        comment: '0=false,1=true',
      },
      is_read: {
        type: Sequelize.SMALLINT,
        allowNull:true,
        defaultValue:0,
        comment: '0=false,1=true',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chat_message_info');
  }
};