const fetch = require('node-fetch');
const promise = require('bluebird');
const FormData = require('form-data');
const { sequelize, EventList } = require('../../../data/models');
const { QueryTypes } = require('sequelize');

class OutlookService {
  async getAccessToken(req) {
    try {
      const form = new FormData();
      form.append('grant_type', process.env.OUTLOOK_GRANT_TYPE);
      form.append('code', req.body.code);
      form.append('client_secret', process.env.OUTLOOK_CLIENT_SECRET);
      form.append('client_id', process.env.OUTLOOK_CLIENT_ID);
      form.append('redirect_uri', process.env.OUTLOOK_REDIRECT_URI);

      let tokenData = await fetch(process.env.OUTLOOK_TOKEN_URL, {
        method: 'POST',
        body: form,
      })
      let authUserData = await tokenData.json();
      if ('error' in authUserData) {
        throw { message: authUserData.error_description || authUserData.error.message, code: 501 }
      }
      let userDetail = await this.userProfile(authUserData.access_token);
      userDetail.access_token = authUserData.access_token;
      userDetail.refresh_token = authUserData.refresh_token;
      return userDetail;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async getRefreshToken(req) {
    try {
      const form = new FormData();
      form.append('grant_type', 'refresh_token');
      form.append('refresh_token', req.body.refresh_token);
      form.append('client_secret', process.env.OUTLOOK_CLIENT_SECRET);
      form.append('client_id', process.env.OUTLOOK_CLIENT_ID);
      form.append('redirect_uri', process.env.OUTLOOK_REDIRECT_URI);

      let tokenData = await fetch(process.env.OUTLOOK_TOKEN_URL, {
        method: 'POST',
        body: form,
      })
      let authUserData = await tokenData.json();
      if ('error' in authUserData) {
        throw { message: authUserData.error_description || authUserData.error.message, code: 501 }
      }
      return authUserData;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async userProfile(token) {
    try {
      let tokenData = await fetch('https://graph.microsoft.com/v1.0/me', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer' + ' ' + token },
      })
      let userDetail = await tokenData.json();
      if ('error' in userDetail) {
        throw { message: userDetail.error_description || userDetail.error.message, code: 501 }
      }
      return userDetail;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async getCalenderList(token) {
    try {
      let calendarData = await fetch('https://graph.microsoft.com/v1.0/me/calendars', {
        method: 'GET',
        headers: { 'Authorization': token },
      });
      let calenderList = await calendarData.json();
      if ('error' in calenderList) {
        throw { message: calenderList.error_description || calenderList.error.message, code: 501 };
      }
      return calenderList;
    } catch (error) {
      return promise.reject(error);
    }
  }

  async getCalenderEvents(token, calendarId, email) {
    try {
      let newEventData = [];
      let calendarData = await fetch(`https://graph.microsoft.com/v1.0/me/calendars/${calendarId}/events`, {
        method: 'GET',
        headers: { 'Authorization': token },
      });
      let calenderListData = await calendarData.json();
      if ('error' in calenderListData) {
        throw { message: calenderListData.error_description || calenderListData.error.message, code: 501 };
      }
      if (calenderListData.value.length > 0) {
        let eventData = [];
        let eventIds = '';
        calenderListData.value.forEach((event, key) => {
          let data = {
            mail_id: email,
            event_id: event.id,
            start_time: event.start.dateTime,
            end_time: event.end.dateTime,
            summary: event.subject,
            calendar_id: calendarId,
            type: 2
          }
          eventData.push(data);
          if (key > 0) {
            eventIds = eventIds + ',' + event.id
          } else {
            eventIds = event.id;
          }
        });
        let ids = await sequelize.query(`SELECT t.value FROM unnest(string_to_array('${eventIds}', ',')) AS t(value)  
                                        LEFT JOIN event_lists ON t.value = event_lists.event_id WHERE event_lists.event_id IS NULL`, { type: QueryTypes.SELECT })
        ids.forEach((id) => {
          const resultData = eventData.find((event) => id.value == event.event_id);
          if (resultData != undefined) {
            newEventData.push(resultData)
          }
        });
        if (newEventData.length > 0) {
          await EventList.bulkCreate(newEventData);
        }
      }
      let eventList = await EventList.findAll({
        where: {
          mail_id: email,
          calendar_id: calendarId,
          type: 2
        }
      })
      return eventList;
    } catch (error) {
      console.log('error ====>', error);
      return promise.reject(error);
    }
  }
}
module.exports = new OutlookService();