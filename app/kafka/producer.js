const {randomUUID} = require('../helper/crypto')
const {kafka} = require('./kafka_config')

const producer = kafka.producer()


const produce = async (topic,key, message) => {

	console.log(`produce topic: ${topic}`)
	console.log(`produce topic key: ${key}`)

	await producer.connect()
		try {
			await producer.send({
				topic: topic,
				messages: [
					{ 
					key: key,
					 value: JSON.stringify(message),
					 headers: {
						'id': randomUUID(),
					  }
					}
				],
			})
			console.log(`message whrite: ${topic}`)
		} catch (err) {
			console.error("could not write message " + err)
		}
}

module.exports = produce