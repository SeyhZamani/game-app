const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerWonMetadata {
    constructor(gameId, credit) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerWonMetadata requires valid gameId!');
        }
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerWonMetadata requires valid credit!');
        }
        this.gameId = gameId;
        this.credit = Math.abs(credit);
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
        const { gameId, credit } = metadataObj;
        return new PlayerWonMetadata(gameId, credit);
    }
}

module.exports = {
    PlayerWonMetadata,
    PlayerWonEvent,
};
