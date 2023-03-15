'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init({
    uuid:{
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue:DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      comment:'0=inactive,1=active'
    },
  }, {
    paranoid:true,
    sequelize,
    tableName: 'doctors',
    modelName: 'Doctor',
    scopes:{
      active:{
        where:{
          is_active:1
        }
      }
    },
  });
  return Doctor;
};