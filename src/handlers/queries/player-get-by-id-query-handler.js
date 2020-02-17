const Player = require('../../models/player');
const PlayerEventStoreReadRepository = require('../../repositories/player-event-store-read-repository');
const logger = require('../../utils/logger');


const playerGetByIdQueryHandler = async (query) => {
    logger.info('playerGetByIdQueryHandler is handling query...');
    // repositories
    const { playerId } = query;
    const playerESReadRepository = new PlayerEventStoreReadRepository();
    const playerEvents = await playerESReadRepository.getAllById(playerId);
    const player = new Player();
    player.apply(playerEvents);
    return player;
};

module.exports = playerGetByIdQueryHandler;
