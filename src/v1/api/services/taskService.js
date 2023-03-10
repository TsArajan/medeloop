const { User, sequelize, EventList, TaskDetails } = require('../../../data/models/index');
const { QueryTypes, Op, where } = require('sequelize');
const promise = require('bluebird')
const axios = require('axios');
const moment = require('moment')

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000'
);

class TodotaskService {
  async createTask(body) {
    // return new Promise(async (resolve, reject) => {
    try {
      let {
        user_id = 1,
        name,
        description,
        date,
        collaborate,
        patient,
        other
      } = body, time = moment().format("YYYY-MM-DD HH:mm:ss.SSSZ");

      let data = {
        creater_id: user_id,
        name,
        description,
        date,
        collaborate,
        patient,
        other,
        createdAt: time,
        updatedAt: time
      };

      let todotask = await TaskDetails.create(data)

      return todotask || [];
    } catch (error) {
      console.log("calenderList Service Error=====>>>>", error)
      return promise.reject(error)
    }
  }

  async getTaskById(body) {
    try {
      let {
        user_id = 1,
        task_id
      } = body, time = moment().format("YYYY-MM-DD HH:mm:ss.SSSZ");

      let todotask = await TaskDetails.findOne({
        where: {
          id: task_id
        }
      })

      return todotask || [];
    } catch (error) {
      console.log("calenderList Service Error=====>>>>", error)
      return promise.reject(error)
    }
  }

  async editTask(body) {
    // return new Promise(async (resolve, reject) => {
    try {
      let {
        user_id = 1,
        name,
        description,
        date,
        collaborate,
        patient,
        other,
        task_id
      } = body, time = moment().format("YYYY-MM-DD HH:mm:ss.SSSZ");

      let data = {
        creater_id: user_id,
        name,
        description,
        date,
        collaborate,
        patient,
        other,
        createdAt: time,
        updatedAt: time
      };

      let todotask = await TaskDetails.update(data,
        {
          where: {
            id: task_id
          }
        })

      return todotask || [];
    } catch (error) {
      console.log("calenderList Service Error=====>>>>", error)
      return promise.reject(error)
    }
  }

  async deletetask(body) {
    try {
      let {
        user_id = 1,
        task_id
      } = body, time = moment().format("YYYY-MM-DD HH:mm:ss.SSSZ");

      let todotask = await TaskDetails.destroy({
        where: {
          id: task_id
        }
      })

      return todotask || [];
    } catch (error) {
      console.log("calenderList Service Error=====>>>>", error)
      return promise.reject(error)
    }
  }

  async taskList(body) {
    try {
      let {
        user_id = 1
      } = body;

      let todotask = await TaskDetails.findAll({
        where: {
          creater_id: user_id
        }
      })

      return todotask || [];
    } catch (error) {
      console.log("calenderList Service Error=====>>>>", error)
      return promise.reject(error)
    }
  }
}
module.exports = new TodotaskService()