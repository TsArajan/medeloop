'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventList.init({
    event_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mail_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    start_time: {
      allowNull: false,
      type: 'timestamp without time zone'
    },
    end_time: {
      allowNull: false,
      type: 'timestamp without time zone'
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    calendar_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    patient: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'event_lists',
    modelName: 'EventList',
  });
  return EventList;
};