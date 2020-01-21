const validator = require('validator');
const BaseCommand = require('./base-command');
const gameTypes = require('../game-types');

class GameCreateCommand extends BaseCommand {
    constructor(gameId, playerIds, gameType, betAmount) {
        super();
        // Verify types
        if (!validator.isUUID(gameId)) {
            throw TypeError('GameCreateCommand requires valid gameId!');
        }
        if (!Array.isArray(playerIds) || playerIds.length === 0 || playerIds.some((p) => !validator.isUUID(p))) {
            throw TypeError('GameCreateCommand requires valid playerIds!');
        }
        if (!(Object.values(gameTypes)).includes(gameType)) {
            throw TypeError('GameCreateCommand requires valid gameType!');
        }
        if (isNaN(betAmount)) {
            throw TypeError('GameCreateCommand requires valid betAmount!');
        }

        this.gameId = gameId;
        this.playerIds = playerIds;
        this.gameType = gameType;
        this.betAmount = Number.parseInt(betAmount, 10);
    }
}

module.exports = GameCreateCommand;
