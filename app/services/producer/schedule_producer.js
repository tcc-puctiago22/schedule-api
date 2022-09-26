
const {produce} = require('../../kafka/producer')
const constants = require('../../helper/constants')
const { getMessageAssociate, getMessageProvider} = require('../../helper/notification_helper')

const {callApi} = require('../../http/http')

const {
  KAFKA_TOPIC_EMAIL,
  KAFKA_TOPIC_SCHEDULE
} = process.env;

async function produceSchedule(request) {
   
  let associeate = await checkCallApi(returnOptions(`/customers/v1/associetes/${request.associeateUuid}`));  
  let provider = await checkCallApi(returnOptions(`/customers/v1/providers/${request.providerUuid}`));  
  let partner = await checkCallApi(returnOptions(`/customers/v1/partner/${request.partnerUuid}`));   
  
  console.log(associeate)

  let messageAssociate = getMessageAssociate(request, associeate, provider, partner)
  await publishNotification(messageAssociate);
  
  let messageProvider = getMessageProvider(request, associeate, provider, partner)
  
  await publishNotification(messageProvider);
  await publishSchedule(request);

  return item;

}

function returnOptions(path){
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

async function checkCallApi(path){

    let retorno  = await callApi(path);
    
    if(retorno.statusCode!=200){
      console.log(retorno)
      throw Error(`dados não encontrato ${path}`)
    }

    return JSON.parse(retorno.data);

}

async function publishNotification(message){
  console.log(`produce ${KAFKA_TOPIC_EMAIL}`)
  await produce(KAFKA_TOPIC_EMAIL, message)

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

  await produce(KAFKA_TOPIC_SCHEDULE, message)

};

module.exports= {produceSchedule}

