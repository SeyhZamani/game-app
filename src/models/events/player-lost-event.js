const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerLostData {
    constructor(gameId) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerLostData requires valid gameId!');
        }
        this.gameId = gameId;
    }
}

class PlayerLostEvent extends BaseEvent {
    constructor(playerId, timestamp, playerLostData) {
        if (!(playerLostData instanceof PlayerLostData)) {
            throw new Error('PlayerLostEvent requires valid playerLostData!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_LOST,
            timestamp,
            JSON.stringify(playerLostData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { gameId } = dataObj;
        return new PlayerLostData(gameId);
    }
}

module.exports = {
    PlayerLostData,
    PlayerLostEvent,
};
