'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat_messages', {
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
      group_id:{
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
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      media: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      media_type: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        comment: '1=image,2=video,3=audio'
      },
      fk_message_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'foreign key of chat_messages table id column',
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
        allowNull: true
      },
    });
    await queryInterface.sequelize.query('ALTER TABLE "chat_messages" ADD FOREIGN KEY ("fk_message_id") REFERENCES "chat_messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chat_messages');
  }
};