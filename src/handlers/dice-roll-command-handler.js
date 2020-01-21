const Game = require('../models/game');
const Player = require('../models/player');
const logger = require('../utils/logger');
const EventStoreWriteRepository = require('../repositories/base-event-store-write-repository');
const GameEventStoreReadRepository = require('../repositories/game-event-store-read-repository');
const PlayerEventStoreReadRepository = require('../repositories/player-event-store-read-repository');
const { map: mapEventToGameEvent } = require('../mappers/event-to-game-event-mapper');
const { map: mapEventToPlayerEvent } = require('../mappers/event-to-player-event-mapper');


const diceRollCommandHandler = async (command) => {
    logger.info('diceRollCommandHandler is handling command...');
    // repositories
    const esWriteRepository = new EventStoreWriteRepository();
    const gameESReadRepository = new GameEventStoreReadRepository();
    const playerESReadRepository = new PlayerEventStoreReadRepository();
    // destruct command
    const { gameId, playerId } = command;
    // fetch all game events
    const gameEvents = await gameESReadRepository.getAllById(gameId)
        .then((r) => r.map(mapEventToGameEvent));
    const game = new Game();
    game.apply(gameEvents);
    // fetch all player events
    const playerEvents = await playerESReadRepository.getAllById(playerId)
        .then((r) => r.map(mapEventToPlayerEvent));
    const player = new Player();
    player.apply(playerEvents);
    // process command
    const writingEvents = game.process(command);
    // write new events
    for (const event of writingEvents) {
        logger.info(`An event is created: ${JSON.stringify(event)}`);
        await esWriteRepository.create(event);
    }
};

module.exports = diceRollCommandHandler;
