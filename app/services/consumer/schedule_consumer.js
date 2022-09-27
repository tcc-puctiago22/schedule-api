
const produce = require('../../kafka/producer')
const { randomUUID } = require('../../helper/crypto')
const constants = require('../../helper/constants')
const { callApi } = require('../../http/http')
const { getMessageAssociate, getMessageProvider } = require('../../helper/notification_helper')

const db = require("../../models");
const Schedule = db.schedule;

const {
  KAFKA_TOPIC_NOTIFICATION,
  KAFKA_TOPIC_NOTIFICATION_KEY_EMAIL
} = process.env;

async function consumePostShcedule(request) {

  console.log(` ** init consumePostShcedule **`)

  request = JSON.parse(request.value);

  let associeate = await checkCallApi(returnOptions(`/customers/v1/associetes/${request.associeateUuid}`));
  let provider = await checkCallApi(returnOptions(`/customers/v1/providers/${request.providerUuid}`));
  let partner = await checkCallApi(returnOptions(`/customers/v1/partner/${request.partnerUuid}`));

  let messageAssociate = getMessageAssociate(request, associeate, provider, partner)
  await publishNotification(messageAssociate);

  let messageProvider = getMessageProvider(request, associeate, provider, partner)

  await publishNotification(messageProvider);

  let item = await save(request, associeate, provider, partner);
  
  console.log(` ** finish consumePostShcedule **`)

  return item;

};

async function save(request, associeate, provider, partner) {

  var item = new Schedule({
    uuid: randomUUID(),
    associeate:{
      uuid: associeate.uuid,
      givenName: associeate.customer.givenName,
      document: associeate.customer.document
    },
    provider:{
      uuid: provider.uuid,
      givenName: provider.customer.givenName,
      document: provider.customer.document
    },
    partner:{
      uuid: partner.uuid,
      givenName: partner.customer.givenName,
      document: partner.customer.document
    },
    occupational: request.occupational,
    city: request.city,
    uf: request.uf,
    scheduled_date: request.scheduledDate,
    scheduled_time: request.scheduledTime,
    status: constants.STATUS.ACTIVE,
    create_at: request.createAt
  });

  console.log(item)
  console.log('********')
  await item.save(item);

};

async function checkCallApi(path) {

  let retorno = await callApi(path);

  if (retorno.statusCode != 200) {
    console.log(retorno)
    throw Error(`dados não encontrato ${path}`)
  }

  return JSON.parse(retorno.data);

}


function returnOptions(path) {
  return {
    hostname: 'localhost',
    port: 8080,
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

async function publishNotification(message) {

  console.log(`consumer publishNotification > ${KAFKA_TOPIC_NOTIFICATION}`)

  await produce(KAFKA_TOPIC_NOTIFICATION, KAFKA_TOPIC_NOTIFICATION_KEY_EMAIL, message)

}

module.exports = { consumePostShcedule }