'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventPatient.init({
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_collaborate: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_event: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    tableName: 'event_patient',
    modelName: 'EventPatient',
  });
  return EventPatient;
};