const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');


class PlayerJoinedToGameData {
    constructor(gameId, credit) {
        if (!validator.isUUID(gameId)) {
            throw new TypeError('PlayerJoinedToGameData requires valid gameId!');
        }
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerJoinedToGameData requires valid credit!');
        }
        this.gameId = gameId;
        this.credit = Math.abs(credit) * -1;
    }
}

class PlayerJoinedToGameEvent extends BaseEvent {
    constructor(playerId, timestamp, playerJoinedToGameData) {
        if (!(playerJoinedToGameData instanceof PlayerJoinedToGameData)) {
            throw new Error('PlayerAssignedEvent requires valid playerJoinedToGameData!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_JOINED_TO_GAME,
            timestamp,
            JSON.stringify(playerJoinedToGameData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { gameId, credit } = dataObj;
        return new PlayerJoinedToGameData(gameId, credit);
    }
}

module.exports = {
    PlayerJoinedToGameEvent,
    PlayerJoinedToGameData,
};
