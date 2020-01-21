const eventTypes = require('../models/event-types');
const { PlayerJoinedToGameMetadata, PlayerJoinedToGameEvent } = require('../models/events/player-joined-to-game-event');


const mapToPlayerJoinedToGameEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, metadata } = event;
    const { gameId, betAmount } = metadata;
    return new PlayerJoinedToGameEvent(
        playerId,
        timestamp,
        new PlayerJoinedToGameMetadata(gameId, betAmount)
    );
};

const map = (event) => {
    switch (event.event_type_id) {
        case eventTypes.PLAYER_JOINED_TO_GAME:
            return mapToPlayerJoinedToGameEvent(event);
        default:
            throw new Error('Unknown PlayerEvent Type!');
    }
};

module.exports = {
    map,
    mapToPlayerJoinedToGameEvent,
};
