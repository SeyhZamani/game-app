const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerDepositCreditMetadata {
    constructor(credit) {
        if (typeof credit !== 'number') {
            throw new TypeError('PlayerJoinedToGameMetadata requires valid credit!');
        }
        this.credit = Math.abs(credit);
    }
}


class PlayerDepositCreditEvent extends BaseEvent {
    constructor(playerId, timestamp, playerDepositCreditMetadata) {
        if (!(playerDepositCreditMetadata instanceof PlayerDepositCreditMetadata)) {
            throw new Error('PlayerDepositCreditEvent requires valid playerDepositCreditMetadata!');
        }
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_DEPOSIT_CREDIT,
            timestamp,
            JSON.stringify(playerDepositCreditMetadata),
        );
    }

    getMetadata() {
        const metadataObj = JSON.parse(this.metadata);
        const { credit } = metadataObj;
        return new PlayerDepositCreditMetadata(credit);
    }
}

module.exports = {
    PlayerDepositCreditEvent,
    PlayerDepositCreditMetadata,
};
