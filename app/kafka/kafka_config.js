const { Kafka } = require("kafkajs")

const {
    KAFKA_CLIENTID,
	  KAFKA_BROKERCONNECT,
    KAFKA_TOPIC_SCHEDULE
  } = process.env;

  
const kafka = new Kafka({ KAFKA_CLIENTID, brokers: [KAFKA_BROKERCONNECT]  })

module.exports={kafka,KAFKA_CLIENTID,KAFKA_TOPIC_SCHEDULE}

