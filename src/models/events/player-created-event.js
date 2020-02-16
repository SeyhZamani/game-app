const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerCreatedMetadata {
    constructor(credit) {
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerWonMetadata requires valid credit!');
        }
        this.credit = Math.abs(credit);
    }
}

class PlayerCreatedEvent extends BaseEvent {
    constructor(playerId, timestamp, playerCreatedMetadata) {
        if (!(playerCreatedMetadata instanceof PlayerCreatedMetadata)) {
            throw new Error('PlayerCreatedEvent requires valid playerCreatedMetadata!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_CREATED,
            timestamp,
            JSON.stringify(playerCreatedMetadata),
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { credit } = metadataObj;
        return new PlayerCreatedMetadata(credit);
    }
}

module.exports = {
    PlayerCreatedEvent,
    PlayerCreatedMetadata,
};
