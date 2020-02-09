const { BaseGameStrategy, TurnViolationError } = require('./base-game-strategy');
const { DiceRolledEvent, DiceRolledMetadata } = require('../models/events/dice-rolled-event');

/**
 ***  BasicGameStrategy***
 * Each player has three turns,and players rolls the dice in order
 * After all turns, whoever dices count most , this user win the game.
 * If player roll the dice before its turn , strategy should throw exception
 * If in the end , player are draw , they roll until they win
 */
class BasicGameStrategy extends BaseGameStrategy {
    constructor(context) {
        super(context);
        this.round = 3;
        this.diceNumber = 3;
    }

    handleDiceRoll(playerId, dices) {
        const turn = this.context.getTurn();
        const diceMapper = this.context.getDiceMapper();
        let activePlayersInOrder = diceMapper
            .values()
            .sort((val1, val2) => val1.order - val2.order)
            .map((v) => v.playerId);
        let currentRound = 0;
        let currentTurn = 0;
        let turnSinceElimination = 0;
        // Eliminate users
        for (let i = 0; i <= turn; i += 1) {
            const { length } = activePlayersInOrder;
            currentTurn = (turn - turnSinceElimination) % length;
            const currentPlayerId = activePlayersInOrder[currentTurn];
            // check eliminate other , or be eliminated
            const eliminatedPlayers = this.getEliminatedPlayers(currentPlayerId, activePlayersInOrder.slice(0, currentTurn), currentRound);
            if (eliminatedPlayers.length > 0) {
                eliminatedPlayers.forEach((e) => {
                    activePlayersInOrder = activePlayersInOrder.filter(item => item !== e);
                });
                turnSinceElimination = turn;
            }
            if (currentTurn === length) {
                currentRound += 1;
            }
        }
        if (activePlayersInOrder.length <= 1) {
            // Throw error
            throw new Error();
        }
        if (activePlayersInOrder[(currentTurn + 1) % activePlayersInOrder.length] !== playerId) {
            throw new Error();
        }
        // create event
        const { rolls } = this.diceMapper.get(playerId);
        rolls.push([...dices]);
        this.diceMapper.set(playerId, {
            ...this.diceMapper.get(playerId),
            rolls,
        });
        const elim2 = this.getEliminatedPlayers(playerId, activePlayersInOrder.filter((p) => p !== playerId), currentRound);
        // elininate activeuser
        // if one finish
        if ((mapValues.filter((value) => value.rolls.reduce((a, c) => a + c, 0) === maxSum).length === 1) && (mapValues.every((value) => this.round <= maxTurnCount && value.length === maxTurnCount))) {
            // game finished
        }
    }

    getEliminatedPlayers(playerId, opponentsId, round) {
        if (opponentsId.length === 0) {
            return [];
        }
        const maxRollInOneTurn = 6 * this.diceNumber;
        const minRollInOneTurn = 1 * this.diceNumber;
        const roundUntil = round < this.round ? 2 : round;
        const diceMapper = this.context.getDiceMapper();
        const maxItCanBe = diceMapper.get(playerId).rolls.slice(0, round + 1).reduce((acc, curr) => acc + curr, 0) + (roundUntil - round) * maxRollInOneTurn;
        const minItCanBe = diceMapper.get(playerId).rolls.slice(0, round + 1).reduce((acc, curr) => acc + curr, 0) + (roundUntil - round) * minRollInOneTurn;

        // get eliminated
        const elim = [];
        opponentsId.forEach((opId) => {
            const max = diceMapper.get(opId).rolls.slice(0, round + 1).reduce((acc, curr) => acc + curr, 0) + (roundUntil - round) * maxRollInOneTurn;
            const min = diceMapper.get(opId).rolls.slice(0, round + 1).reduce((acc, curr) => acc + curr, 0) + (roundUntil - round) * minRollInOneTurn;
            if (max < minItCanBe) {
                elim.push(opId);
            }
            if (min > maxItCanBe) {
                elim.push(playerId);
            }
        });
        return elim;
    }
}


module.exports = BasicGameStrategy;
