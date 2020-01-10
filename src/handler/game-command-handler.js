const GameCreateCommand = require('../models/commands/game-create-command');
const Game = require('../models/game');

const eventStoreRepository = require('../repositories/event-store-repository');
const logger = require('../utils/logger');


const gameCreateCommandHandler = async (command) => {
    const { gameId, playerIds } = command;
    // Validate game exists or not ...
    // Validate players exists or not...

    // Process command
    const game = new Game();
    const gameEvents = game.process(command);
    for (const gameEvent of gameEvents) {
        // Save events in DB...
        logger.info(`An event is created: ${JSON.stringify(gameEvent)}`);
        await eventStoreRepository.create(gameEvent);
    }
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
