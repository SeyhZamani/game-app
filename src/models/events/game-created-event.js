const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');
const gameTypes = require('../game-types');

class GameCreatedData {
    constructor(gameType, playerIds, betAmount) {
        if (!Object.values(gameTypes).includes(gameType)) {
            throw new TypeError('GameCreatedData requires valid gameType!');
        }
        if (!Array.isArray(playerIds) || playerIds.length === 0 || playerIds.some((p) => !validator.isUUID(p))) {
            throw new TypeError('GameCreatedData requires valid playerIds!');
        }
        if (typeof betAmount !== 'number') {
            throw new TypeError('GameCreatedData requires valid betAmount!');
        }
        this.gameType = gameType;
        this.playerIds = playerIds;
        this.betAmount = betAmount;
    }
}

class GameCreatedEvent extends BaseEvent {
    constructor(gameId, timestamp, gameCreatedData) {
        if (!(gameCreatedData instanceof GameCreatedData)) {
            throw new Error('GameCreatedEvent requires valid gameCreatedData!');
        }
        super(
            gameId,
            aggregateTypes.GAME,
            eventTypes.GAME_CREATED,
            timestamp,
            JSON.stringify(gameCreatedData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { gameType, playerIds, betAmount } = dataObj;
        return new GameCreatedData(gameType, playerIds, betAmount);
    }
}


module.exports = {
    GameCreatedEvent,
    GameCreatedData,
};
