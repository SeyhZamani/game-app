const { ConsumerGroup } = require('kafka-node');
const moment = require('moment');
const EventStoreWriteRepository = require('../../repositories/base-event-store-write-repository');
const kafkaTopics = require('../../models/kafka-topics');
const { PlayerCreatedEvent, PlayerCreatedData } = require('../../models/events/player-created-event');
const logger = require('../../utils/logger');

exports.create = () => {
    const options = {
        kafkaHost: process.env.KAFKA_BROKER_HOST,
        groupId: `${kafkaTopics.PLAYER_CREATED}-group`,
        ssl: true,
        encoding: 'utf8',
        protocol: ['roundrobin'],
        fromOffset: 'latest',
        commitOffsetsOnFirstJoin: true,
        outOfRangeOffset: 'earliest',
    };

    const consumerGroup = new ConsumerGroup(options, kafkaTopics.PLAYER_CREATED);
    consumerGroup.on('connect', () => {
        logger.info(`${options.groupId} is connected.`);
    });
    consumerGroup.on('message', async (message) => {
        logger.info(JSON.stringify(message));
        const { playerId, data: { credit } } = message;
        const data = new PlayerCreatedData(credit);
        const event = new PlayerCreatedEvent(playerId, moment().utc(), data);
        // repositories
        const esWriteRepository = new EventStoreWriteRepository();
        await esWriteRepository.create(event);
    });
    consumerGroup.on('error', async (error) => {
        logger.info(`${options.groupId} has error`);
        logger.error(error);
    });
};
