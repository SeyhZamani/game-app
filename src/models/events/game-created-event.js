const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');
const gameTypes = require('../game-types');

class GameCreatedMetadata {
    constructor(gameType, playerIds, betAmount) {
        if (!Object.values(gameTypes).includes(gameType)) {
            throw new TypeError('GameCreatedMetadata requires valid gameType!');
        }
        if (!Array.isArray(playerIds) || playerIds.length === 0 || playerIds.some((p) => !validator.isUUID(p))) {
            throw new TypeError('GameCreatedMetadata requires valid playerIds!');
        }
        if (typeof betAmount !== 'number') {
            throw new TypeError('GameCreatedMetadata requires valid betAmount!');
        }
        this.gameType = gameType;
        this.playerIds = playerIds;
        this.betAmount = betAmount;
    }
}

class GameCreatedEvent extends BaseEvent {
    constructor(gameId, timestamp, gameCreatedMetadata) {
        if (!(gameCreatedMetadata instanceof GameCreatedMetadata)) {
            throw new Error('GameCreatedEvent requires valid gameCreatedMetadata!');
        }
        super(
            gameId,
            aggregateTypes.GAME,
            eventTypes.GAME_CREATED,
            timestamp,
            JSON.stringify(gameCreatedMetadata),
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { gameType, playerIds, betAmount } = metadataObj;
        return new GameCreatedMetadata(gameType, playerIds, betAmount);
    }
}


module.exports = {
    GameCreatedEvent,
    GameCreatedMetadata,
};
