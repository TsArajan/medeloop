'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PatientDetails.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
    is_doctor: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    },
  }, {
    sequelize,
    tableName: 'patient_detail',
    modelName: 'PatientDetails',
    scopes:{
      active:{
        where:{
          is_active:1
        }
      }
    },
  });
  return PatientDetails;
};