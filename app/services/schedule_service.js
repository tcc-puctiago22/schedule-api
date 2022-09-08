
const {randomUUID} = require('../helper/crypto')
const constants = require('../helper/constants')
const {callApi} = require('../http/http')

const db = require("../models");
const Schedule = db.schedule;


async function init(request) {
   
  await checkCallApi(returnOptions(`/customers/v1/associetes/${request.associeateUuid}`));  
  await checkCallApi(returnOptions(`/customers/v1/providers/${request.providerUuid}`));  
  await checkCallApi(returnOptions(`/customers/v1/partner/${request.partnerUuid}`));   

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
      note: request.note,
      scheduled_date: request.scheduledDate,
      scheduled_time: request.scheduledTime,
      status: constants.STATUS.ACTIVE,
      create_at: new Date()
    });

    await item.save(request);  

  };

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

}
  module.exports= {init}