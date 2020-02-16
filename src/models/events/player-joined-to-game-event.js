const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class PlayerJoinedToGameMetadata {
    constructor(gameId, credit) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid gameId!');
        }
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid credit!');
        }
        this.gameId = gameId;
        this.credit = Math.abs(credit) * -1;
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
        const { gameId, credit } = metadataObj;
        return new PlayerJoinedToGameMetadata(gameId, credit);
    }
}

module.exports = {
    PlayerJoinedToGameEvent,
    PlayerJoinedToGameMetadata,
};
