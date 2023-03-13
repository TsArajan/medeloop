const iCloud = require('apple-icloud');
const fetch = require('node-fetch');
const promise = require('bluebird');
const FormData = require('form-data');
const { sequelize, EventList } = require('../../../data/models');
const { QueryTypes } = require('sequelize');

class appleService {
  async auth(body) {
    try {
      var session = {}; // An empty session. Has to be a session object or file path that points on a JSON file containing your session
      const username = 'tristate.mteam@gmail.com';
      const password = 'Tri12@3state';

      // This creates your iCloud instance
      var myCloud = new iCloud(session, username, password)
      console.log(myCloud.Calendar.getEvents)

      return myCloud;
    } catch (error) {
      return promise.reject(error);
    }
  }
}
module.exports = new appleService();