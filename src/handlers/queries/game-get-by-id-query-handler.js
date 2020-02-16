const Game = require('../../models/game');
const GameEventStoreReadRepository = require('../../repositories/game-event-store-read-repository');
const logger = require('../../utils/logger');


const gameGetByIdQueryHandler = async (query) => {
    logger.info('gameGetQueryHandler is handling query...');
    // repositories
    const { gameId } = query;
    const gameESReadRepository = new GameEventStoreReadRepository();
    const gameEvents = await gameESReadRepository.getAllById(gameId);
    const game = new Game();
    game.apply(gameEvents);
    return game;
};

module.exports = gameGetByIdQueryHandler;
