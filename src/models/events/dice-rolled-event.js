const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class DiceRolledMetadata {
    constructor(playerId, dices) {
        if (!validator.isUUID(playerId)) {
            throw new TypeError('DiceRolledMetadata requires valid playerId!');
        }
        if (!Array.isArray(dices) || dices.length === 0 || dices.some((d) => typeof d !== 'number')) {
            throw new TypeError('DiceRolledMetadata requires valid dices!');
        }
        this.playerId = playerId;
        this.dices = dices;
    }
}


class DiceRolledEvent extends BaseEvent {
    constructor(gameId, timestamp, diceRolledMetadata) {
        if (!(diceRolledMetadata instanceof DiceRolledMetadata)) {
            throw new Error('DiceRolledEvent requires valid diceRolledMetadata!');
        }
        super(
            gameId,
            aggregateTypes.GAME,
            eventTypes.DICE_ROLLED,
            timestamp,
            JSON.stringify(diceRolledMetadata),
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { playerId, dices } = metadataObj;
        return new DiceRolledMetadata(playerId, dices);
    }
}


module.exports = {
    DiceRolledEvent,
    DiceRolledMetadata,
};
