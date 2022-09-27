const {kafka,KAFKA_CLIENTID,KAFKA_TOPIC_SCHEDULE} = require('./kafka_config')

const {consumePostShcedule} = require('../services/consumer/schedule_consumer')

const consumer = kafka.consumer({groupId:KAFKA_CLIENTID})

const consumerSchedule = async () => {
    console.log('***consumerSchedule****')
    await consumer.connect()
	await consumer.subscribe({ topic: KAFKA_TOPIC_SCHEDULE, fromBeginning: true })
	await consumer.run({

        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {

            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers.toString(),
            })
            
            await consumePostShcedule(message)
        },
	})

}

consumerSchedule().catch(async error => {
    console.error(error)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
  })
