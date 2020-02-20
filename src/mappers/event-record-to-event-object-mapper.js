const eventTypes = require('../models/event-types');
const { GameCreatedEvent, GameCreatedData } = require('../models/events/game-created-event');
const { DiceRolledEvent, DiceRolledData } = require('../models/events/dice-rolled-event');
const { PlayerJoinedToGameEvent, PlayerJoinedToGameData } = require('../models/events/player-joined-to-game-event');
const { GameFinishedEvent } = require('../models/events/game-finished-event');
const { PlayerActivatedEvent } = require('../models/events/player-activated-event');
const { PlayerCreatedEvent, PlayerCreatedData } = require('../models/events/player-created-event');
const { PlayerDeactivatedEvent } = require('../models/events/player-deactivated-event');
const { PlayerDepositCreditEvent, PlayerDepositCreditData } = require('../models/events/player-deposit-credit-event');
const { PlayerLostEvent, PlayerLostData } = require('../models/events/player-lost-event');
const { PlayerWithdrawCreditEvent, PlayerWithdrawCreditData } = require('../models/events/player-withdraw-credit-event');
const { PlayerWonEvent, PlayerWonData } = require('../models/events/player-won-event');

// Dice-Roll
const mapToDiceRolledEvent = (event) => {
    const { aggregate_uuid: gameId, create_time: timestamp, event_data: data } = event;
    const { playerId, dices } = data;
    return new DiceRolledEvent(
        gameId,
        timestamp,
        new DiceRolledData(playerId, dices),
    );
};
// Game-Created
const mapToGameCreatedEvent = (event) => {
    const { aggregate_uuid: gameId, create_time: timestamp, event_data: data } = event;
    const { gameType, playerIds, betAmount } = data;
    return new GameCreatedEvent(
        gameId,
        timestamp,
        new GameCreatedData(gameType, playerIds, betAmount),
    );
};
// Game-Finished
const mapToGameFinishedEvent = (event) => {
    const { aggregate_uuid: gameId, create_time: timestamp } = event;
    return new GameFinishedEvent(gameId, timestamp);
};
// Player-Activated
const mapToPlayerActivatedEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp } = event;
    return new PlayerActivatedEvent(playerId, timestamp);
};
// Player-Created
const mapToPlayerCreatedEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, event_data: data } = event;
    const { credit } = data;
    return new PlayerCreatedEvent(
        playerId,
        timestamp,
        new PlayerCreatedData(credit),
    );
};
// Player-Deactivated
const mapToPlayerDeactivatedEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp } = event;
    return new PlayerDeactivatedEvent(playerId, timestamp);
};
// Player-Deposit-Credit
const mapToPlayerDepositCreditEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, event_data: data } = event;
    const { credit } = data;
    return new PlayerDepositCreditEvent(
        playerId,
        timestamp,
        new PlayerDepositCreditData(credit),
    );
};
// Player-Joined-To-Game
const mapToPlayerJoinedToGameEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, event_data: data } = event;
    const { gameId, betAmount } = data;
    return new PlayerJoinedToGameEvent(
        playerId,
        timestamp,
        new PlayerJoinedToGameData(gameId, betAmount),
    );
};
// Player-Lost
const mapToPlayerLostEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, event_data: data } = event;
    const { gameId } = data;
    return new PlayerLostEvent(
        playerId,
        timestamp,
        new PlayerLostData(gameId),
    );
};
// Player-Withdraw-Credit
const mapToPlayerWithdrawCreditEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, event_data: data } = event;
    const { credit } = data;
    return new PlayerWithdrawCreditEvent(
        playerId,
        timestamp,
        new PlayerWithdrawCreditData(credit),
    );
};
// Player-Won
const mapToPlayerWonEvent = (event) => {
    const { aggregate_uuid: playerId, create_time: timestamp, event_data: data } = event;
    const { credit } = data;
    return new PlayerWonEvent(
        playerId,
        timestamp,
        new PlayerWonData(credit),
    );
};


const map = (event) => {
    switch (event.event_type_id) {
        case eventTypes.DICE_ROLLED:
            return mapToDiceRolledEvent(event);
        case eventTypes.GAME_CREATED:
            return mapToGameCreatedEvent(event);
        case eventTypes.GAME_FINISHED:
            return mapToGameFinishedEvent(event);
        case eventTypes.PLAYER_ACTIVATED:
            return mapToPlayerActivatedEvent(event);
        case eventTypes.PLAYER_CREATED:
            return mapToPlayerCreatedEvent(event);
        case eventTypes.PLAYER_DEACTIVATED:
            return mapToPlayerDeactivatedEvent(event);
        case eventTypes.PLAYER_DEPOSIT_CREDIT:
            return mapToPlayerDepositCreditEvent(event);
        case eventTypes.PLAYER_JOINED_TO_GAME:
            return mapToPlayerJoinedToGameEvent(event);
        case eventTypes.PLAYER_LOST:
            return mapToPlayerLostEvent(event);
        case eventTypes.PLAYER_WITHDRAW_CREDIT:
            return mapToPlayerWithdrawCreditEvent(event);
        case eventTypes.PLAYER_WON:
            return mapToPlayerWonEvent(event);
        default:
            throw new Error('Unknown Event Type!');
    }
};


module.exports = {
    map,
    mapToDiceRolledEvent,
    mapToGameCreatedEvent,
    mapToGameFinishedEvent,
    mapToPlayerActivatedEvent,
    mapToPlayerCreatedEvent,
    mapToPlayerDeactivatedEvent,
    mapToPlayerDepositCreditEvent,
    mapToPlayerJoinedToGameEvent,
    mapToPlayerLostEvent,
    mapToPlayerWithdrawCreditEvent,
    mapToPlayerWonEvent,
};
