
const randomUUID = require('../helper/crypto')
const constants = require('../helper/constants')

const db = require("../models");
const Schedule = db.schedule;


async function main(req) {
   
    var item = new Schedule({
      uuid: randomUUID(),
      associeate_uuid: req.body.associeateUuid,
      provider_uuid: req.body.providerUuid,
      partner_uuid: req.body.partnerUuid,
      note: req.body.note,
      scheduled_date: req.body.scheduledDate,
      scheduled_time: req.body.scheduledTime,
      status: constants.STATUS.ACTIVE,
      create_at: new Date()
    });

    await item.save();  

    return item

  };

  module.export=main