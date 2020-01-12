const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class PlayerJoinedToGameMetadata {
    constructor(gameId, betAmount) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid gameId!');
        }
        this.gameId = gameId;
        this.betAmount = Number.parseInt(betAmount, 10);
    }
}

class PlayerJoinedToGameEvent extends BaseEvent {
    /**
     *
     * @param {string} playerId
     * @param {timestamp} timestamp
     * @param {Object} playerJoinedToGameMetadata
     */
    constructor(playerId, timestamp, playerJoinedToGameMetadata) {
        if (!(playerJoinedToGameMetadata instanceof PlayerJoinedToGameMetadata)) {
            throw new Error('PlayerAssignedEvent requires valid playerAssignedMetadata!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_JOINED_TO_GAME,
            timestamp,
            playerJoinedToGameMetadata,
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { gameId, betAmount } = metadataObj;
        return new PlayerJoinedToGameMetadata(gameId, betAmount);
    }
}

module.exports = {
    PlayerJoinedToGameEvent,
    PlayerJoinedToGameMetadata,
};
