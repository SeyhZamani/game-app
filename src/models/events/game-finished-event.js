const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class GameFinishedEvent extends BaseEvent {
    constructor(gameId, timestamp) {
        super(
            gameId,
            aggregateTypes.GAME,
            eventTypes.GAME_FINISHED,
            timestamp,
            null,
        );
    }

    getData() {
        return null;
    }
}

module.exports = {
    GameFinishedEvent,
};
