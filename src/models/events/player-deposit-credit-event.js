const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerDepositCreditData {
    constructor(credit) {
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerDepositCreditData requires valid credit!');
        }
        this.credit = Math.abs(credit);
    }
}


class PlayerDepositCreditEvent extends BaseEvent {
    constructor(playerId, timestamp, playerDepositCreditData) {
        if (!(playerDepositCreditData instanceof PlayerDepositCreditData)) {
            throw new Error('PlayerDepositCreditEvent requires valid playerDepositCreditData!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_DEPOSIT_CREDIT,
            timestamp,
            JSON.stringify(playerDepositCreditData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { credit } = dataObj;
        return new PlayerDepositCreditData(credit);
    }
}

module.exports = {
    PlayerDepositCreditEvent,
    PlayerDepositCreditData,
};
