'use strict';

const open = require('amqplib')

const url = process.env.AMQP_URL || 'amqp://glrpzdgo:Rru_Awj4jbIE-pVhqTyWHT0zJ-EGAVw2@duckbill.rmq.cloudamqp.com/glrpzdgo'

const connectionPromise = amqplib.connect(url).catch(err => {console.log("AMQP",err)})

module.exports = connectionPromise;
