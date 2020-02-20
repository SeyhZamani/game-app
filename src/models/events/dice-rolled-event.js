const validator = require('validator');
const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class DiceRolledData {
    constructor(playerId, dices) {
        if (!validator.isUUID(playerId)) {
            throw new TypeError('DiceRolledData requires valid playerId!');
        }
        if (!Array.isArray(dices) || dices.length === 0 || dices.some((d) => typeof d !== 'number')) {
            throw new TypeError('DiceRolledData requires valid dices!');
        }
        this.playerId = playerId;
        this.dices = dices;
    }
}


class DiceRolledEvent extends BaseEvent {
    constructor(gameId, timestamp, diceRolledData) {
        if (!(diceRolledData instanceof DiceRolledData)) {
            throw new Error('DiceRolledEvent requires valid diceRolledData!');
        }
        super(
            gameId,
            aggregateTypes.GAME,
            eventTypes.DICE_ROLLED,
            timestamp,
            JSON.stringify(diceRolledData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { playerId, dices } = dataObj;
        return new DiceRolledData(playerId, dices);
    }
}


module.exports = {
    DiceRolledEvent,
    DiceRolledData,
};
