const { ChatGroup, PatientDetails, sequelize, ChatGroupMember } = require('../../../data/models');
const { QueryTypes, Op } = require('sequelize');
const promise = require('bluebird');
class ChatGroupService {
  /*------------------------
     fetch list of chat groups
  -------------------------*/
  async index() {
    try {
      let list = await ChatGroup.scope('active').findAll({
        attributes: ['uuid', 'image', 'status', 'type',
          [sequelize.literal(`CASE WHEN "ChatGroup"."type" = 1 THEN "members"."name" ELSE "ChatGroup"."name" END`), 'name']
        ],
        include: [{
          as: 'members',
          model: PatientDetails,
          attributes: [],
          required: false,
          where: {
            "$members->ChatGroupMember.member_id$": {
              [Op.ne]: sequelize.col(`"ChatGroup"."createdBy"`)
            }
          }
        }]
      });
      return list;
    } catch (error) {
      return promise.reject(error);
    }
  }

  /*------------------------
     fetch list of chat groups
  -------------------------*/
  async create(body) {
    const t = await sequelize.transaction();
    try {
      var chatGroup;
      let doctor = await PatientDetails.scope('active').findOne({
        where: {
          id: body.doctor_id
        }
      });
      if (doctor == null) {
        throw { message: 'DOCTOR_RESTRICTED', code: 400 };
      }
      // store group basic detaila
      if ('uuid' in body == false || body.uuid == null || body.uuid == '') {
        body.createdBy = doctor.id;
        body.updatedBy = doctor.id;
        chatGroup = await ChatGroup.create(body, { transaction: t });
      } else {
        body.updatedBy = doctor.id;
        chatGroup = await ChatGroup.findOne({ where: { uuid: body.uuid }, transaction: t });
        if (chatGroup == null) {
          throw { message: 'group_not_exist', code: 400 }
        }
        await chatGroup.update(body, { transaction: t });
      }
      // add or update group members
      if ('member_ids' in body && body.member_ids.length > 0) {
        body.member_ids.push(doctor.id);
        await this.addOrUpdateGroupMembers(body, t, chatGroup);
      }
      await t.commit();
      return chatGroup;
    } catch (error) {
      if (t) await t.rollback();
      return promise.reject(error);
    }
  }
  /*------------------------
    sync group 
  -------------------------*/
  async addOrUpdateGroupMembers(body, t, chatGroup) {
    try {
      let memberIds = body.member_ids.join(",");
      let groupData = await sequelize.query(`SELECT t.member_id::int, ${chatGroup.dataValues.id} as group_id FROM unnest(string_to_array('${memberIds}', ',')) AS t(member_id)
                          LEFT JOIN chat_group_members ON t.member_id = chat_group_members.member_id::text and chat_group_members.group_id = ${chatGroup.dataValues.id}
                          WHERE chat_group_members.member_id IS NULL`, { type: QueryTypes.SELECT });
      /* add new group members */
      if (groupData.length > 0) {
        await ChatGroupMember.bulkCreate(groupData, { transaction: t });
      }
      /* remove members */
      await ChatGroupMember.destroy({
        where: {
          member_id: {
            [Op.notIn]: body.member_ids
          },
          group_id: chatGroup.dataValues.id
        }, transaction: t
      });
    } catch (error) {
      if (t) await t.rollback();
      return promise.reject(error);
    }
  }
  /*------------------------
    delete chat group
  -------------------------*/
  async delete(body) {
    const t = await sequelize.transaction();
    try {
      let chatGroup = await ChatGroup.findOne({ where: { uuid: body.uuid }, transaction: t });
      if (chatGroup == null) {
        throw { message: 'group_not_exist', code: 400 }
      }
      await chatGroup.destroy({ transaction: t });
      t.commit();
      return;
    } catch (error) {
      if (t) await t.rollback();
      return promise.reject(error);
    }
  }
}
module.exports = new ChatGroupService();