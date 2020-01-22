const Game = require('../models/game');
const logger = require('../utils/logger');
const EventStoreWriteRepository = require('../repositories/base-event-store-write-repository');
const GameEventStoreReadRepository = require('../repositories/game-event-store-read-repository');


const diceRollCommandHandler = async (command) => {
    logger.info('diceRollCommandHandler is handling command.');
    // repositories
    const esWriteRepository = new EventStoreWriteRepository();
    const gameESReadRepository = new GameEventStoreReadRepository();
    // destruct command
    const { gameId } = command;
    // fetch all game events
    const gameEvents = await gameESReadRepository.getAllById(gameId);
    const game = new Game();
    game.apply(gameEvents);
    // process command
    const writingEvents = game.process(command);
    // write new events
    for (const event of writingEvents) {
        logger.info(`An event is created: ${JSON.stringify(event)}`);
        await esWriteRepository.create(event);
    }
    logger.info('diceRollCommandHandler handled command successfully.');
};

module.exports = diceRollCommandHandler;
