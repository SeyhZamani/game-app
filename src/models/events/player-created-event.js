const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerCreatedData {
    constructor(credit) {
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerCreatedData requires valid credit!');
        }
        this.credit = Math.abs(credit);
    }
}

class PlayerCreatedEvent extends BaseEvent {
    constructor(playerId, timestamp, playerCreatedData) {
        if (!(playerCreatedData instanceof PlayerCreatedData)) {
            throw new Error('PlayerCreatedEvent requires valid playerCreatedData!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_CREATED,
            timestamp,
            JSON.stringify(playerCreatedData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { credit } = dataObj;
        return new PlayerCreatedData(credit);
    }
}

module.exports = {
    PlayerCreatedEvent,
    PlayerCreatedData,
};
