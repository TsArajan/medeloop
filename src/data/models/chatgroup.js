'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatGroup.belongsToMany(models.PatientDetails,{
        through:models.ChatGroupMember,
        foreignKey:'group_id',
        otherKey:'member_id',
        as:'members',
      })
      // ChatGroup.hasOne(models.ChatGroupMember,{
      //   as:'member',
      //   foreignKey:'doctor_id',
      //   onDelete:'CASCADE',
      //   onUpdate:'CASCADE',
      // })
    }
  }
  ChatGroup.init({
    uuid:{
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue:DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'doctors',
        },
      },
      allowNull: true,
      comment: 'foreign key of doctors table id column'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'doctors',
        },
      },
      allowNull: true,
      comment: 'foreign key of doctors table id column'
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1,
      comment: '0=inactive,1=active'
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 1,
      comment: '1=single ,2=multple'
    }
  }, {
    sequelize,
    paranoid:true,
    scopes:{
      active:{
        where: { status: 1 }
      }
    },
    tableName: 'chat_groups',
    modelName: 'ChatGroup',
  });
  return ChatGroup;
};