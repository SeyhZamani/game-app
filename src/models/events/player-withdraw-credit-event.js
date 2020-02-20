const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerWithdrawCreditData {
    constructor(credit) {
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerWithdrawCreditData requires valid credit!');
        }
        this.credit = Math.abs(credit) * -1;
    }
}


class PlayerWithdrawCreditEvent extends BaseEvent {
    constructor(playerId, timestamp, playerWithdrawCreditData) {
        if (!(playerWithdrawCreditData instanceof PlayerWithdrawCreditData)) {
            throw new Error('PlayerWithdrawCreditEvent requires valid playerWithdrawCreditData!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_WITHDRAW_CREDIT,
            timestamp,
            JSON.stringify(playerWithdrawCreditData),
        );
    }

    getData() {
        const dataObj = JSON.parse(this.event_data);
        const { credit } = dataObj;
        return new PlayerWithdrawCreditData(credit);
    }
}

module.exports = {
    PlayerWithdrawCreditEvent,
    PlayerWithdrawCreditData,
};
