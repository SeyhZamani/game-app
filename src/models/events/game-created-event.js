const uuidv1 = require('uuid/v1');
const moment = require('moment');
const BaseEvent = require('./base-event');
const aggregateTypeMapper = require('../../aggregate-type-mapper');
const eventTypeMapper = require('../../event-type-mapper');

class GameCreatedEvent extends BaseEvent {
    constructor(gameCreatedMetadata) {
        super(
            uuidv1(),
            aggregateTypeMapper.GAME,
            eventTypeMapper.GAME_CREATED,
            moment().utc(),
            gameCreatedMetadata,
        );
    }
}


module.exports = GameCreatedEvent;
