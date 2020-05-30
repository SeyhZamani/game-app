const { ConsumerGroup } = require('kafka-node');
const moment = require('moment');
const avro = require('avsc');
const EventStoreWriteRepository = require('../../repositories/base-event-store-write-repository');
const kafkaTopics = require('../../models/kafka-topics');
const { PlayerCreatedEvent } = require('../../models/events/player-created-event');
const logger = require('../../utils/logger');
const userCreatedSchema = require('../../models/kafka-schemas/user-created-schema');

const type = avro.parse(userCreatedSchema);


exports.create = () => new Promise((resolve, reject) => {
    const options = {
        kafkaHost: process.env.KAFKA_BROKER_HOST,
        groupId: `${kafkaTopics.PLAYER_CREATED}-group-${process.env.APP_NAME}`,
        ssl: true,
        encoding: 'utf8',
        protocol: ['roundrobin'],
        fromOffset: 'latest',
        commitOffsetsOnFirstJoin: true,
        outOfRangeOffset: 'earliest',
        autoCommit: false,
    };
    const consumerGroup = new ConsumerGroup(options, kafkaTopics.PLAYER_CREATED);
    consumerGroup.on('connect', () => {
        logger.info(`${options.groupId} is connected.`);
        return resolve(consumerGroup);
    });
    consumerGroup.on('error', (error) => {
        logger.error(error);
        return reject(error);
    });
    consumerGroup.on('message', async (message) => {
        const { value, timestamp } = message;
        const buf = Buffer.from(value, 'utf8');
        const { id } = type.fromBuffer(buf);
        const event = new PlayerCreatedEvent(id, moment(timestamp));
        // repositories
        const esWriteRepository = new EventStoreWriteRepository();
        await esWriteRepository.create(event);
        await consumerGroup.commitAsync();
    });
    consumerGroup.closeAsync = () => new Promise((resolveClose, rejectClose) => {
        consumerGroup.close((err) => {
            if (err) {
                return rejectClose(err);
            }
            return resolveClose(true);
        });
    });
    consumerGroup.commitAsync = () => new Promise((resolveCommit, rejectCommit) => {
        consumerGroup.commit((err, data) => {
            if (err) {
                logger.error(err);
                return rejectCommit(err);
            }
            logger.info(JSON.stringify(data));
            return resolveCommit(data);
        });
    });
});
