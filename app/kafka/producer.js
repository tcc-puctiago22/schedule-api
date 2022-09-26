const { Kafka } = require("kafkajs")

const {
    KAFKA_CLIENTID,
	KAFKA_BROKERS
  } = process.env;

  
const clientId = KAFKA_CLIENTID
const brokers = KAFKA_BROKERS
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

const produce = async (topic, message) => {
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