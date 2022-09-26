const {produceSchedule} = require('./producer/schedule_producer')

async function postSchedule(request) {
   
  return await produceSchedule(request);;

}

module.exports= {postSchedule}