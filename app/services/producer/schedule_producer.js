
const produce = require('../../kafka/producer')
const constants = require('../../helper/constants')

const {
  KAFKA_TOPIC_SCHEDULE
} = process.env;

async function produceSchedule(request) {

  await publishSchedule(request);

  return request;

}

async function publishSchedule(request) {

  let message = {
    associeateUuid: request.associeateUuid,
    providerUuid: request.providerUuid,
    partnerUuid: request.partnerUuid,
    occupational: request.occupational,
    city: request.city,
    uf: request.uf,
    scheduledDate: request.scheduledDate,
    scheduledTime: request.scheduledTime,
    status: constants.STATUS.ACTIVE,
    createAt: new Date()
  }

  await produce(KAFKA_TOPIC_SCHEDULE, 'POST', message)

};

module.exports = { produceSchedule }


