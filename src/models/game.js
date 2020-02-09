const moment = require('moment');
const GameCreateCommand = require('./commands/game-create-command');
const { GameCreatedEvent, GameCreatedMetadata } = require('./events/game-created-event');
const { DiceRolledEvent, DiceRolledMetadata } = require('./events/dice-rolled-event');
const { PlayerJoinedToGameEvent, PlayerJoinedToGameMetadata } = require('./events/player-joined-to-game-event');
const aggregateTypes = require('./aggregate-types');
const BasicGameStrategy = require('../strategies/basic-game-strategy');


class Game {
    constructor() {
        this.gameId = null;
        this.gameType = null;
        this.betAmount = null;
        this.diceMapper = new Map();
        this.strategy = null;
        this.turn = 0;
    }

    getGameId() {
        return this.gameId;
    }

    getTurn() {
        return this.turn;
    }

    getDiceMapper() {
        return this.diceMapper;
    }

    getStrategy() {
        return this.strategy;
    }

    setStrategy(gameType) {
        switch (gameType) {
            case 'basic':
                this.strategy = new BasicGameStrategy(this);
                break;
            default:
                throw new Error('Unknown GameType!');
        }
    }

    apply(events) {
        if (!Array.isArray(events) || events.length === 0) {
            throw new Error('Events should be array and length greater 0');
        }
        for (const event of events) {
            switch (event.constructor) {
                case GameCreatedEvent:
                    this.applyGameCreatedEvent(event);
                    break;
                case DiceRolledEvent:
                    this.applyDiceRolledEvent(event);
                    break;
                default:
                    throw new Error('Unknown Event!');
            }
        }
    }

    process(command) {
        switch (command.constructor) {
            case GameCreateCommand:
                return this.processGameCreateCommand(command);
            default:
                throw new Error('Unknown Command!');
        }
    }

    applyGameCreatedEvent(gameCreatedEvent) {
        const { playerIds, gameType, betAmount } = gameCreatedEvent.getMetadata();
        this.gameId = gameCreatedEvent.getAggregateId();
        this.gameType = gameType;
        this.betAmount = betAmount;
        playerIds.forEach((playerId, idx) => {
            this.diceMapper.set(playerId, {
                order: idx,
                rolls: [],
                playerId,
                points: [],
            });
        });
        this.setStrategy(this.gameType);
    }

    applyDiceRolledEvent(diceRolledEvent) {
        const { playerId, dices } = diceRolledEvent.getMetadata();
        const { rolls } = this.diceMapper.get(playerId);
        rolls.push([...dices]);
        this.diceMapper.set(playerId, {
            ...this.diceMapper.get(playerId),
            rolls,
        });
        this.turn += 1;
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

    processDiceRolledCommand(command) {
        const { playerId, dices } = command;
        const events = this.strategy.handleDiceRoll(playerId, dices);
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
        for (let i = cloneList.length - 1; i > 0; i -= 1) {
            // Get random number between i and 0
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements
            [cloneList[i], cloneList[j]] = [cloneList[j], cloneList[i]];
        }
        return cloneList;
    }
}

module.exports = Game;
