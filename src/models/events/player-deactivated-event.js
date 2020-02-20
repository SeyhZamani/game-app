const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class PlayerDeactivatedEvent extends BaseEvent {
    constructor(playerId, timestamp) {
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_DEACTIVATED,
            timestamp,
            null,
        );
    }

    getData() {
        return null;
    }
}

module.exports = {
    PlayerDeactivatedEvent,
};
