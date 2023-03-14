const { User, sequelize, EventList, TaskDetails, EventPatient, EventDoctor } = require('../../../data/models/index');
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
      } = body, time = moment().format("YYYY-MM-DD HH:mm:ss.SSSZ"), patient_lsit, collaborate_list;

      let data = {
        creater_id: user_id,
        name,
        description,
        date,
        other,
        createdAt: time,
        updatedAt: time
      };

      let todotask = await TaskDetails.create(data);
      if (todotask) {
        if (collaborate && collaborate.length) {
          let data = []
          collaborate.map(x => {
            data.push({
              event_id: todotask.id,
              doctor_id: x,
              creator_id: user_id,
              createdAt: time,
              updatedAt: time
            });
          })

          await EventDoctor.bulkCreate(data)
        }
        if (patient && patient.length) {
          let data = []
          patient.map(x => {
            data.push({
              event_id: todotask.id,
              patient_id: x,
              creator_id: user_id,
              createdAt: time,
              updatedAt: time
            });
          })
          await EventPatient.bulkCreate(data)
        }
      }
      todotask.collaborate = collaborate
      todotask.patient = patient

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

      let todotask = await sequelize.query(`select td.id, creater_id, name, description, date, patient, other, ARRAY_AGG(ep.patient_id) as patient, array_agg(ed.doctor_id) as collaborate from task_details td left join event_patient ep on ep.event_id = td.id left join event_doctor ed on ed.event_id = td.id where creater_id = ${user_id} group by td.id`);
      todotask = todotask[0];
      if (todotask.length) {
        todotask.map(x => {
          if (x.collaborate[0] == null)
            x.collaborate = []
          if (x.patient[0] == null)
            x.patient = []
          x.collaborate = [...new Set(x.collaborate)]
          x.patient = [...new Set(x.patient)]

        })
      }
      return todotask;
    } catch (error) {
      console.log("calenderList Service Error=====>>>>", error)
      return promise.reject(error)
    }
  }
}
module.exports = new TodotaskService()