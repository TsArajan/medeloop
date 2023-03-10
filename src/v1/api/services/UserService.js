const { User, sequelize, EventList, PatientDetails } = require('../../../data/models/index');
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

class UserService {
  async calenderList(body) {
    // return new Promise(async (resolve, reject) => {
    try {
      let {
        code,
        type,
        mail
      } = body, access_token;

      let user = await User.findOne({
        attributes: ['token'],
        where: {
          mail: mail,
          type: type
        }
      });
      var calendarList = [];
      // google calendar
      if (body.type == 1) {
        calendarList = this.googleCalendarList(body)
      }
      // console.log("user", user);

      return calendarList;
    } catch (error) {
      console.log("calenderList Service Error=====>>>>", error)
      return promise.reject(error)
    }
  }

  async googleCalendarList(body) {
    try {
      let {
        code,
        type,
        mail
      } = body, access_token;

      var options = {
        'method': 'get',
        'url': 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        'headers': {
          'Authorization': 'Bearer ' + code
        }
      };
      let calendarList = await axios(options);

      return calendarList.data || [];

    } catch (error) {
      return Promise.reject(error)
    }
  }

  async eventList(body) {
    try {
      let {
        calendar_id,
        code,
        mail,
        type,
        user_id = 1
      } = body, access_token, data = [], event = [], eventList = [];

      var options2 = {
        'method': 'get',
        'url': `https://www.googleapis.com/calendar/v3/calendars/${calendar_id}/events`,
        'headers': {
          'Authorization': 'Bearer ' + code
        }
      };
      let eventlist = await axios(options2).then(data => {
        console.log("data=====", data)
        event = data.data.items
      }).catch(error => {
        error.code = 501;
        error.messaeg = 'This calendar is not available. Please select another calendar'
        console.log("error=====", error)
        throw error;
      });
      // let event = eventlist.data.items;

      let list = [];
      const loopForHistory1 = async _ => {
        let promises2 = event.map(async (x) => {
          console.log(x.id)
          data.push({
            mail_id: mail,
            event_id: x.id,
            start_time: x.start.dateTime || x.start.date,
            end_time: x.end.dateTime || x.end.date,
            summary: x.summary,
            calendar_id: calendar_id,
            type: type,
            user_id: user_id
          })

          let arr = await sequelize.query(`select * from event_lists where mail_id = '${mail}' and event_id = '${x.id}'`, { type: QueryTypes.SELECT });
          if (arr.length == 0) {
            list.push({
              mail_id: mail,
              event_id: x.id,
              start_time: x.start.dateTime || x.start.date,
              end_time: x.end.dateTime || x.end.date,
              summary: x.summary,
              calendar_id: calendar_id,
              type: type,
              user_id: user_id
            })
          }
        })
        await Promise.all(promises2)
      }
      await loopForHistory1()

      if (list.length > 0)
        eventList = await EventList.bulkCreate(list)
      return data;
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async addEvent(body) {
    try {
      let {
        user_id = 1,
        start_time,
        end_time,
        summary,
        title,
        patient
      } = body, date = moment()

      let data = {
        user_id: user_id,
        start_time: moment(start_time).format("YYYY-MM-DD HH:mm:ss.SSSZ"),
        end_time: moment(end_time).format("YYYY-MM-DD HH:mm:ss.SSSZ"),
        summary: summary,
        createdAt: date,
        updatedAt: date,
        type: 0,
        event_id: title,
        mail_id: "",
        calendar_id: "medeloopCalendar",
        patient: patient
      }
      await EventList.create(data);
      return []
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async editEvent(body) {
    try {
      let {
        user_id = 1,
        start_time,
        end_time,
        summary,
        title,
        patient,
        event_id
      } = body, date = moment()

      let data = {
        user_id: user_id,
        start_time: moment(start_time).format("YYYY-MM-DD HH:mm:ss.SSSZ"),
        end_time: moment(end_time).format("YYYY-MM-DD HH:mm:ss.SSSZ"),
        summary: summary,
        event_id: title,
        updatedAt: date,
        type: 0,
        mail_id: "",
        calendar_id: "medeloopCalendar",
        patient: patient
      }
      await EventList.update(data,
        {
          where: {
            id: event_id
          }
        })

      return []
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async allEventList(body) {
    try {
      let {
        user_id = 1,
        year,
        month
      } = body, startDate, endDate;

      if (year && month) {
        startDate = moment().set('month', month).set('year', year).startOf('month').format("YYYY-MM-DD HH:mm:ss.SSS");
        endDate = moment().set('month', month).set('year', year).endOf('month').format("YYYY-MM-DD HH:mm:ss.SSS");
      } else {
        startDate = moment().startOf('month').format("YYYY-MM-DD HH:mm:ss.SSS");
        endDate = moment().endOf('month').format("YYYY-MM-DD HH:mm:ss.SSS");
      }

      startDate = new Date(startDate);
      endDate = new Date(endDate);
      // console.log(date)

      // return []
      let eventList = await EventList.findAll({
        where: {
          user_id: user_id,
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        }
      });

      /* let eventList = await EventList.findAll({
        where: {
          user_id: user_id
        }
      }); */

      eventList.map(x => {
        x.patient = x.patient ? x.patient : []
      })

      return eventList || []
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async patientDetail(body) {
    try {
      let {
        user_id
      } = body;

      let eventList = await PatientDetails.findAll({
        attributes: ['id', 'name', 'profile_pic', 'age', 'createdAt'],
        where: {
          is_active: 1
        }
      });

      return eventList || []
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getEventByID(body) {
    try {
      let {
        user_id,
        event_id
      } = body;

      let eventList = await EventList.findAll({
        where: {
          id: event_id
        }
      });

      eventList.map(x => {
        x.patient = x.patient ? x.patient : []
      })
      return eventList || []
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async deleteEvent(body) {
    try {
      let {
        user_id,
        event_id
      } = body;

      await EventList.destroy({
        where: {
          id: event_id
        }
      });

      return []
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
module.exports = new UserService()