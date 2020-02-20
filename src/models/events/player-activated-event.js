const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class PlayerActivatedEvent extends BaseEvent {
    constructor(playerId, timestamp) {
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_ACTIVATED,
            timestamp,
            null,
        );
    }

    getData() {
        return null;
    }
}

module.exports = {
    PlayerActivatedEvent,
};
