const moment = require('moment');
const GameCreateCommand = require('./commands/game-create-command');
const { GameCreatedEvent, GameCreatedMetadata } = require('./events/game-created-event');
const { PlayerJoinedToGameEvent, PlayerJoinedToGameMetadata } = require('./events/player-joined-to-game-event');
const aggregateTypes = require('./aggregate-types');

class Game {
    constructor(events = []) {
        this.gameId = undefined;
        this.gameType = undefined;
        this.betAmount = undefined;
        this.playerIds = [];
        this.apply(events);
    }

    apply(events) {
        for (const event of events) {
            switch (event.constructor) {
                case GameCreatedEvent:
                    this.applyGameCreatedEvent(event);
                    break;
                default:
                    throw new Error('Unknown event !');
            }
        }
    }

    process(command) {
        switch (command.constructor) {
            case GameCreateCommand:
                return this.processGameCreateCommand(command);
            default:
                throw new Error('Unknown command !');
        }
    }

    applyGameCreatedEvent(gameCreatedEvent) {
        const { aggregateId, metadata } = gameCreatedEvent;
        const { playerIds, gameType, betAmount } = metadata;
        // Assign event metadata to game aggregate instance
        this.gameId = aggregateId;
        this.gameType = gameType;
        this.betAmount = betAmount;
        for (const playerId of playerIds) {
            this.playerIds.push(playerId);
        }
    }

    processGameCreateCommand(command) {
        const events = [];
        const {
            gameId,
            playerIds,
            gameType,
            betAmount,
        } = command;
        // Shuffle players
        const shuffledPlayerIds = this.shufflePlayersList(playerIds);
        const gameCreatedMetadata = new GameCreatedMetadata(gameType, shuffledPlayerIds, betAmount);
        events.push(new GameCreatedEvent(gameId, moment().utc(), gameCreatedMetadata));
        for (const playerId of shuffledPlayerIds) {
            const playerJoinedToGameMetadata = new PlayerJoinedToGameMetadata(gameId, betAmount);
            events.push(new PlayerJoinedToGameEvent(playerId, moment().utc(), playerJoinedToGameMetadata));
        }
        // Only apply game types
        this.apply(events.filter((e) => e.aggregate_type_id === aggregateTypes.GAME));
        return events;
    }

    /**
     * The purpose of this function is that
     * randomly decide the order of players
     * using [Fisher-Yates shuffle Algorithm ]
     * @param {Array} playerIds
     * @returns {Array}
     */
    shufflePlayersList(playerIds) {
        const cloneList = [...playerIds];
        for (let i = cloneList.length - 1; i > 0; i--) {
            // Get random number between i and 0
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements
            [cloneList[i], cloneList[j]] = [cloneList[j], cloneList[i]];
        }
        return cloneList;
    }
}


module.exports = Game;
