const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class GameCreatedEvent extends BaseEvent {
    /**
     * 
     * @param {string} gameId UUID
     * @param {timestamp} timestamp
     * @param {Object} gameCreatedMetadata
     *  *metadata*
     * @param {string} gameCreatedMetadata.gameType
     * @param {Array} gameCreatedMetadata.shuffledPlayerIds
     */
    constructor(gameId, timestamp, gameCreatedMetadata) {
        super(
            gameId,
            aggregateTypes.GAME,
            eventTypes.GAME_CREATED,
            timestamp,
            gameCreatedMetadata,
        );
    }
}


module.exports = GameCreatedEvent;
