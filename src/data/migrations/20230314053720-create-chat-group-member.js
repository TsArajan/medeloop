'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat_group_members', {
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
        comment: 'foreign key of member id',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chat_group_members');
  }
};