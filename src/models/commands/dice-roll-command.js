const validator = require('validator');
const BaseCommand = require('./base-command');

class DiceRollCommand extends BaseCommand {
    constructor(gameId, playerId, dices) {
        super();
        if (!validator.isUUID(gameId)) {
            throw new TypeError('DiceRollCommand requires valid gameId!');
        }
        if (!validator.isUUID(playerId)) {
            throw new TypeError('DiceRollCommand requires valid playerId!');
        }
        if (!Array.isArray(dices) || dices.length === 0) {
            throw new TypeError('DiceRollCommand requires valid dices!');
        }
        this.gameId = gameId;
        this.playerId = playerId;
        this.dices = dices.map((d) => Number.parseInt(d, 10));
    }
}


module.exports = DiceRollCommand;
