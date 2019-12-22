const GameCreateCommand = require('../models/commands/game-create-command');

const gameCreateHandler = async (command) => {

};


const handle = (command) => {
    switch (command.constructor) {
        case GameCreateCommand:
            return gameCreateHandler(command);
        default:
            throw new Error('Unknown command !');
    }
};

module.exports = {
    handle,
};
