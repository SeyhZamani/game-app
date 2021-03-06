const Game = require('../../models/game');
const Player = require('../../models/player');
const EventStoreWriteRepository = require('../../repositories/base-event-store-write-repository');
const GameEventStoreReadRepository = require('../../repositories/game-event-store-read-repository');
const PlayerEventStoreReadRepository = require('../../repositories/player-event-store-read-repository');
const logger = require('../../utils/logger');


const gameCreateCommandHandler = async (command) => {
    logger.info('gameCreateCommandHandler is handling command...');
    // repositories
    const esWriteRepository = new EventStoreWriteRepository();
    const gameESReadRepository = new GameEventStoreReadRepository();
    const playerESReadRepository = new PlayerEventStoreReadRepository();
    // [TO-DO] utilize betAmount
    const { gameId, playerIds, betAmount } = command;
    // Validate game exists or not ...
    const gameEvents = await gameESReadRepository.getAllById(gameId);
    // If there is at least one event about game , terminate operation ...
    if (gameEvents.length !== 0) {
        throw new Error(`Game with Id ${gameId} already exists!`);
    }
    // Validate players exists or not
    // Also validate player is active and has enough credits...
    for (const playerId of playerIds) {
        // Iterate over all players
        const playerEvents = await playerESReadRepository.getAllById(playerId);
        const player = new Player();
        player.apply(playerEvents);
        if (!player.hasEnoughCredit(betAmount)) {
            throw new Error(`Player with Id ${playerId} can't join the game!`);
        }
    }
    // Process command
    const game = new Game();
    const writingEvents = game.process(command);
    for (const event of writingEvents) {
        // Save events in DB...
        logger.info(`An event is created: ${JSON.stringify(event)}`);
        await esWriteRepository.create(event);
    }
};


module.exports = gameCreateCommandHandler;
