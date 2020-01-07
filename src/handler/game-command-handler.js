const GameCreateCommand = require('../models/commands/game-create-command');
const Game = require('../models/game');
const eventStoreRepository = require('../repositories/event-store-repository');
const logger = require('../utils/logger');


const gameCreateCommandHandler = async (command) => {
    // Create Game created Event
    const game = new Game();
    const event = game.process(command);
    logger.info(`An event is created: ${JSON.stringify(event)}`);
    await eventStoreRepository.create(event);
};


const handle = (command) => {
    switch (command.constructor) {
        case GameCreateCommand:
            return gameCreateCommandHandler(command);
        default:
            throw new Error('Unknown command !');
    }
};

module.exports = {
    handle,
};
