const { Kafka } = require("kafkajs")

const {consumePostShcedule} = require('./consumer/schedule_producer')


const {
    KAFKA_CLIENTID,
	KAFKA_BROKERS,
    KAFKA_TOPIC_SCHEDULE
  } = process.env;

  
const kafka = new Kafka({ KAFKA_CLIENTID, KAFKA_BROKERS })
const consumer = kafka.consumer({groupId:clientId})

const consumerSchedule = async () => {

    await consumer.connect()
	await consumer.subscribe({ topic: KAFKA_TOPIC_SCHEDULE, fromBeginning: true })
	await consumer.run({

        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {

            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })

            await consumePostShcedule(message)

        },
	})
}

consumerSchedule()