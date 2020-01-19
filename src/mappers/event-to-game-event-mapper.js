const eventTypes = require('../models/event-types');
const { GameCreatedEvent, GameCreatedMetadata } = require('../models/events/game-created-event');

const mapToGameCreatedEvent = (event) => {
    const { aggregate_uuid: gameId, create_time: timestamp, metadata } = event;
    const { gameType, playerIds, betAmount } = metadata;
    return new GameCreatedEvent(
        gameId,
        timestamp,
        new GameCreatedMetadata(gameType, playerIds, betAmount),
    );
};

const mapToDiceRolledEvent = (event) => {
    const { aggregate_uuid: gameId, create_time: timestamp, metadata } = event;
};


const map = (event) => {
    switch (event.event_type_id) {
        case eventTypes.GAME_CREATED:
            return mapToGameCreatedEvent(event);
        case eventTypes.DICE_ROLLED:
            return mapToDiceRolledEvent(event);
        default:
            throw new Error('Unknown Event Type!');
    }
};

module.exports = map;
