class TurnViolationError extends Error {
    constructor(playerId) {
        super(`Player with id: ${playerId} did not roll dices in its turn!`);
    }
}


class BaseGameStrategy {
    constructor(context) {
        if (!(context.constructor.name === 'Game')) {
            throw new Error('GameStrategy is only applicable with Game Context!');
        }
        this.context = context;
    }
    handleDiceRoll() {
        throw new Error('handleDiceRoll should be implemented on derived class!');
    }
}

module.exports = {
    BaseGameStrategy,
    TurnViolationError,
};
