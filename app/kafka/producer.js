const { Kafka } = require("kafkajs")

const {
    KAFKA_CLIENTID,
	KAFKA_BROKERS,
	KAFKA_TOPIC
  } = process.env;

  
const clientId = "kafka"
const brokers = ['localhost:9092']
const topic = "send-email"
//KAFKA_CLIENTID=kafka
//KAFKA_BROKERS=[localhost:9092]
//KAFKA_TOPIC=send-email
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

const produce = async (message) => {
	await producer.connect()
	
		try {
			await producer.send({
				topic,
				messages: [
					message
				],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("writes: ")
		} catch (err) {
			console.error("could not write message " + err)
		}
}

//module.exports = produce

produce({
	key: 'TESTE',
	value: "this is message 2"
})