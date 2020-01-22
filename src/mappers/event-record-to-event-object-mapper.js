const eventTypes = require('../models/event-types');
const { GameCreatedEvent, GameCreatedMetadata } = require('../models/events/game-created-event');
const { DiceRolledEvent, DiceRolledMetadata } = require('../models/events/dice-rolled-event');
const { PlayerJoinedToGameMetadata, PlayerJoinedToGameEvent } = require('../models/events/player-joined-to-game-event');

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
    const { playerId, dices } = metadata;
    return new DiceRolledEvent(
        gameId,
        timestamp,
        new DiceRolledMetadata(playerId, dices),
    );
};

const mapToPlayerJoinedToGameEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, metadata } = event;
    const { gameId, betAmount } = metadata;
    return new PlayerJoinedToGameEvent(
        playerId,
        timestamp,
        new PlayerJoinedToGameMetadata(gameId, betAmount),
    );
};

const map = (event) => {
    switch (event.event_type_id) {
        case eventTypes.GAME_CREATED:
            return mapToGameCreatedEvent(event);
        case eventTypes.DICE_ROLLED:
            return mapToDiceRolledEvent(event);
        case eventTypes.PLAYER_JOINED_TO_GAME:
            return mapToPlayerJoinedToGameEvent(event);
        default:
            throw new Error('Unknown Event Type!');
    }
};


module.exports = {
    map,
    mapToGameCreatedEvent,
    mapToDiceRolledEvent,
    mapToPlayerJoinedToGameEvent,
};
