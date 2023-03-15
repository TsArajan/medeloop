'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatGroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatGroupMember.init({
    group_id: {
      primaryKey:true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'chat_groups',
        },
      },
      allowNull: true,
      comment: 'foreign key of chat_groups table id column'
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'group member id'
    },
  }, {
    sequelize,
    tableName: 'chat_group_members',
    modelName: 'ChatGroupMember',
    timestamps:false,
  });
  return ChatGroupMember;
};