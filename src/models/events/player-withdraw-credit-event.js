const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerWithdrawCreditMetadata {
    constructor(credit) {
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid credit!');
        }
        this.credit = Math.abs(credit) * -1;
    }
}


class PlayerWithdrawCreditEvent extends BaseEvent {
    constructor(playerId, timestamp, playerWithdrawCreditMetadata) {
        if (!(playerWithdrawCreditMetadata instanceof PlayerWithdrawCreditMetadata)) {
            throw new Error('PlayerWithdrawCreditEvent requires valid playerWithdrawCreditMetadata!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_WITHDRAW_CREDIT,
            timestamp,
            JSON.stringify(playerWithdrawCreditMetadata),
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { credit } = metadataObj;
        return new PlayerWithdrawCreditMetadata(credit);
    }
}

module.exports = {
    PlayerWithdrawCreditEvent,
    PlayerWithdrawCreditMetadata,
};
