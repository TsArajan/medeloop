'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatMessage.init({
    uuid:{
      type: DataTypes.UUID,
      allowNull: true,
    },
    group_id:{
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'chat_groups',
        },
      },
      allowNull: true,
      comment: 'foreign key of chat_groups table id column'
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media_type: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: '1=image,2=video,3=audio'
    },
    fk_message_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'chat_messages',
        },
      },
      allowNull: true,
      comment: 'foreign key of chat_messages table id column'
    },
  }, {
    paranoid:true,
    tableName:'chat_messages',
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};