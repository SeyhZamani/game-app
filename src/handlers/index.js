const GameCreateCommand = require('../models/commands/game-create-command');
const DiceRollCommand = require('../models/commands/dice-roll-command');
const gameCreateCommandHandler = require('./game-create-command-handler');
const diceRollCommandHandler = require('./dice-roll-command-handler');

const handle = (command) => {
    switch (command.constructor) {
        case GameCreateCommand:
            return gameCreateCommandHandler(command);
        case DiceRollCommand:
            return diceRollCommandHandler(command);
        default:
            throw new Error('Unknown command!');
    }
};

module.exports = {
    handle,
};
