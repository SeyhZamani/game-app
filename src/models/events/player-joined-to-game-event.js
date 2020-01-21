const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class PlayerJoinedToGameMetadata {
    constructor(gameId, betAmount) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid gameId!');
        }
        if (typeof betAmount !== 'number') {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid betAmount!');
        }
        this.gameId = gameId;
        this.betAmount = betAmount;
    }
}

class PlayerJoinedToGameEvent extends BaseEvent {
    constructor(playerId, timestamp, playerJoinedToGameMetadata) {
        if (!(playerJoinedToGameMetadata instanceof PlayerJoinedToGameMetadata)) {
            throw new Error('PlayerAssignedEvent requires valid playerAssignedMetadata!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_JOINED_TO_GAME,
            timestamp,
            JSON.stringify(playerJoinedToGameMetadata),
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
