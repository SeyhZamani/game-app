const BaseEvent = require('./base-event');
const aggregateTypes = require('../aggregate-types');
const eventTypes = require('../event-types');

class PlayerAssigned extends BaseEvent {

    /**
     * 
     * @param {string} playerId 
     * @param {timestamp} timestamp 
     * @param {Object} playerAssignedMetadata 
     *  metadata
     * @param {string} playerAssignedMetadata.gameId
     * @param {string} playerAssignedMetadata.gameType
     * @param {Array} playerAssignedMetadata.opponents
     */
    constructor(playerId, timestamp, playerAssignedMetadata) {
        super(
            playerId,
            aggregateTypes.PLAYER,
            eventTypes.PLAYER_ASSIGNED,
            timestamp,
            playerAssignedMetadata,
        );
    }
}


module.exports = PlayerAssigned;
