const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerWonData {
    constructor(gameId, credit) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerWonData requires valid gameId!');
        }
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerWonData requires valid credit!');
        }
        this.gameId = gameId;
        this.credit = Math.abs(credit);
    }
}

class PlayerWonEvent extends BaseEvent {
    constructor(playerId, timestamp, playerWonData) {
        if (!(playerWonData instanceof PlayerWonData)) {
            throw new Error('PlayerWonEvent requires valid playerWonData!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_WON,
            timestamp,
            JSON.stringify(playerWonData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { gameId, credit } = dataObj;
        return new PlayerWonData(gameId, credit);
    }
}

module.exports = {
    PlayerWonData,
    PlayerWonEvent,
};
