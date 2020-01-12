const validator = require('validator');
const BaseCommand = require('./base-command');
const gameTypes = require('../game-types');

class GameCreateCommand extends BaseCommand {
    /**
     *
     * @param {string} gameId  UUID
     * @param {Array} playerIds [...UUID]
     * @param {string} gameType basic|
     * @param {number} betAmount int
     */
    constructor(gameId, playerIds, gameType, betAmount) {
        super();
        // Verify types
        if (!validator.isUUID(gameId)) {
            throw TypeError('GameId must be UUID!');
        }
        if (!Array.isArray(playerIds) || playerIds.length === 0 || playerIds.some((p) => !validator.isUUID(p))) {
            throw TypeError('PlayerId must be Array and each one must be UUID!');
        }

        if (!(Object.values(gameTypes)).includes(gameType)) {
            throw TypeError('Unknown game type!');
        }

        this.gameId = gameId;
        this.playerIds = playerIds;
        this.gameType = gameType;
        this.betAmount = Number.parseInt(betAmount, 10);
    }
}

module.exports = GameCreateCommand;
