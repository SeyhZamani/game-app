const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerWonMetadata {
    constructor(gameId) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid gameId!');
        }
    }
}

class PlayerWonEvent extends BaseEvent {
    constructor(playerId, timestamp, playerWonMetadata) {
        if (!(playerWonMetadata instanceof PlayerWonMetadata)) {
            throw new Error('PlayerWonEvent requires valid playerWonMetadata!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_WON,
            timestamp,
            JSON.stringify(playerWonMetadata),
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { gameId } = metadataObj;
        return new PlayerWonMetadata(gameId);
    }
}

module.exports = {
    PlayerWonMetadata,
    PlayerWonEvent,
};
