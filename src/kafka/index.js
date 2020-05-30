const playerCreatedConsumerGroup = require('./consumer-groups/player-created-consumer-group');
const logger = require('../utils/logger');

let playerCreatedGroup;

exports.initiate = async () => {
    logger.info('*******Kafka is initiating********');
    playerCreatedGroup = await playerCreatedConsumerGroup.create();
};

exports.disconnect = async () => {
    logger.info('Kafka disconnecting');
    await playerCreatedGroup.closeAsync();
};
