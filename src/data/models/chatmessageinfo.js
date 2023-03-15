'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessageInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatMessageInfo.init({
    group_id: {
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
    },
    chat_message_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'chat_messages',
        },
      },
      allowNull: true,
      comment: 'foreign key of chat_messages table id column'
    },
    is_delivered: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue:0,
      comment: '0=false,1=true',
    },
    is_read: {
      type: DataTypes.SMALLINT,
      allowNull:true,
      defaultValue:0,
      comment: '0=false,1=true',
    },
  }, {
    sequelize,
    tableName: 'chat_message_info',
    modelName:'ChatMessageInfo'
  });
  return ChatMessageInfo;
};