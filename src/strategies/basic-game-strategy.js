const moment = require('moment');
const { BaseGameStrategy, TurnViolationError } = require('./base-game-strategy');
const { DiceRolledEvent, DiceRolledMetadata } = require('../models/events/dice-rolled-event');
const { GameFinishedEvent } = require('../models/events/game-finished-event');
const { PlayerWonEvent, PlayerWonMetadata } = require('../models/events/player-won-event');
const { PlayerLostEvent, PlayerLostMetadata } = require('../models/events/player-lost-event');

const sum = (acc, curr) => acc + curr;

class BasicGameStrategy extends BaseGameStrategy {
    constructor(context) {
        super(context);
        this.maxPoint = 3;
    }

    handleDiceRoll(playerId, dices) {
        const events = [];
        const gameId = this.context.getGameId();
        const turn = this.context.getTurn();
        const diceMapper = this.context.getDiceMapper();
        let activePlayersInOrder = Array.from(diceMapper.values())
            .sort((val1, val2) => val1.order - val2.order)
            .map((v) => v.playerId);
        let currentRound = 0;
        let currentTurn = 0;
        let turnSinceElimination = 0;
        for (let i = 0; i < turn; i += 1) {
            const { length: playersSize } = activePlayersInOrder;
            currentTurn = i - turnSinceElimination;
            if ((currentTurn % playersSize) === playersSize - 1) {
                let winnersOfRound = [];
                let max = 0;
                for (const activePlayerId of activePlayersInOrder) {
                    const roundDices = diceMapper.get(activePlayerId).rolls[currentRound];
                    const sumOfRound = roundDices.reduce((acc, curr) => curr + acc, 0);
                    if (sumOfRound > max) {
                        max = sumOfRound;
                        winnersOfRound = [activePlayerId];
                    } else if (sumOfRound === max) {
                        winnersOfRound.push(activePlayerId);
                    }
                }
                for (const activePlayerId of activePlayersInOrder) {
                    if (winnersOfRound.includes(activePlayerId)) {
                        diceMapper.get(activePlayerId).points.push(1);
                    } else {
                        diceMapper.get(activePlayerId).points.push(0);
                    }
                }
                const eliminated = this.getEliminatedPlayers(activePlayersInOrder);
                if (eliminated.length > 0) {
                    turnSinceElimination = i + 1;
                }
                activePlayersInOrder = activePlayersInOrder.filter((p) => !eliminated.includes(p));
                currentRound += 1;
            }
        }
        currentTurn = turn - turnSinceElimination;
        if (activePlayersInOrder.length <= 1) {
            // Throw error
            throw new Error();
        }
        if (activePlayersInOrder[currentTurn % activePlayersInOrder.length] !== playerId) {
            throw new TurnViolationError(playerId);
        }
        const diceRolledMetadata = new DiceRolledMetadata(playerId, dices);
        const diceRolledEvent = new DiceRolledEvent(gameId, moment().utc(), diceRolledMetadata);
        events.push(diceRolledEvent);
        // create event 1....
        const { rolls } = diceMapper.get(playerId);
        rolls.push([...dices]);
        diceMapper.set(playerId, {
            ...diceMapper.get(playerId),
            rolls,
        });
        if ((currentTurn % activePlayersInOrder.length) === activePlayersInOrder.length - 1) {
            let winnersOfRound = [];
            let max = 0;
            for (const activePlayerId of activePlayersInOrder) {
                const roundDices = diceMapper.get(activePlayerId).rolls[currentRound];
                const sumOfRound = roundDices.reduce(sum, 0);
                if (sumOfRound > max) {
                    max = sumOfRound;
                    winnersOfRound = [activePlayerId];
                } else if (sumOfRound === max) {
                    winnersOfRound.push(activePlayerId);
                }
            }
            for (const activePlayerId of activePlayersInOrder) {
                if (winnersOfRound.includes(activePlayerId)) {
                    diceMapper.get(activePlayerId).points.push(1);
                } else {
                    diceMapper.get(activePlayerId).points.push(0);
                }
            }
            const eliminated = this.getEliminatedPlayers(activePlayersInOrder);
            if (eliminated.length > 0) {
                eliminated.forEach((eId) => {
                    const playerLostMetadata = new PlayerLostMetadata(gameId);
                    const playerLostEvent = new PlayerLostEvent(eId, moment().utc(), playerLostMetadata);
                    events.push(playerLostEvent);
                });
            }
            activePlayersInOrder = activePlayersInOrder.filter((p) => !eliminated.includes(p));
            if (activePlayersInOrder.length === 1) {
                const [winnerPlayerId] = activePlayersInOrder;
                const playerWonMetadata = new PlayerWonMetadata(gameId);
                const playerWonEvent = new PlayerWonEvent(winnerPlayerId, moment().utc(), playerWonMetadata);
                const gameFinishedEvent = new GameFinishedEvent(gameId, moment().utc());
                events.push(...[playerWonEvent, gameFinishedEvent]);
            }
        }
        return events;
    }

    getEliminatedPlayers(activePlayersIds) {
        const diceMapper = this.context.getDiceMapper();
        if (activePlayersIds.some((p) => diceMapper.get(p).points.reduce(sum, 0) >= this.maxPoint)) {
            let maxPoint = 0;
            activePlayersIds.forEach((playerId) => {
                const maxPointOfPlayer = diceMapper.get(playerId).points.reduce(sum, 0);
                if (maxPointOfPlayer > maxPoint) {
                    maxPoint = maxPointOfPlayer;
                }
            });
            return activePlayersIds.filter((p) => diceMapper.get(p).points.reduce(sum, 0) < maxPoint);
        }
        return [];
    }
}

module.exports = BasicGameStrategy;
