
const {randomUUID} = require('../../helper/crypto')
const constants = require('../../helper/constants')
const {callApi} = require('../../http/http')

const db = require("../../models");
const Schedule = db.schedule;

async function consumePostShcedule(request) {
   
  let item = await save(request);  
  
  await publish(request);
  
  return item;

  };

  async function save(request) {
   
    var item = new Schedule({
      uuid: randomUUID(),
      associeate_uuid: request.associeateUuid,
      provider_uuid: request.providerUuid,
      partner_uuid: request.partnerUuid,
      occupational: request.occupational,
      city: request.city,
      uf: request.uf,
      scheduled_date: request.scheduledDate,
      scheduled_time: request.scheduledTime,
      status: constants.STATUS.ACTIVE,
      create_at: request.createAt
    });

    await item.save(request);  

  };

 module.exports= {consumePostShcedule}