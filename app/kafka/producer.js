const { Kafka } = require("kafkajs")

const {
    KAFKA_CLIENTID,
	KAFKA_BROKERS_HOST_1,
	KAFKA_BROKERS_HOST_PORT_1
  } = process.env;

  
const clientId = KAFKA_CLIENTID
const kafka = new Kafka({ clientId, brokers: [KAFKA_BROKERS_HOST_1.concat(":").concat(KAFKA_BROKERS_HOST_PORT_1)]  })
const producer = kafka.producer()

const produce = async (topic, message) => {
	console.log(`produce topic: ${topic}`)
	await producer.connect()
	
		try {
			await producer.send({
				topic,
				messages: [
					message
				],
			})
			console.log(`message whrite: ${topic}`)
		} catch (err) {
			console.error("could not write message " + err)
		}
}

module.exports = produce