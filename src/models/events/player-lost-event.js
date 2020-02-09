const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerLostMetadata {
    constructor(gameId) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid gameId!');
        }
    }
}

class PlayerLostEvent extends BaseEvent {
    constructor(playerId, timestamp, playerLostMetadata) {
        if (!(playerLostMetadata instanceof PlayerLostMetadata)) {
            throw new Error('PlayerLostEvent requires valid playerLostMetadata!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_LOST,
            timestamp,
            JSON.stringify(playerLostMetadata),
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { gameId } = metadataObj;
        return new PlayerLostMetadata(gameId);
    }
}

module.exports = {
    PlayerLostMetadata,
    PlayerLostEvent,
};
