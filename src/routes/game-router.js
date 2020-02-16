const gameRouter = require('express').Router();
const uuidv1 = require('uuid/v1');
const logger = require('../utils/logger');
const commandHandler = require('../handlers/commands');
const queryHandler = require('../handlers/queries');
const GameCreateCommand = require('../models/commands/game-create-command');
const DiceRollCommand = require('../models/commands/dice-roll-command');
const GameGetByIdQuery = require('../models/queries/game-get-by-id-query');
const { routerWrapper } = require('../utils/express-utils');

gameRouter.get('/:id', routerWrapper(async (req, res) => {
    logger.info('Game fetching is called ...');
    const { id: gameId } = req.params;
    const query = new GameGetByIdQuery(gameId);
    logger.info(`GameGetByIdQuery is created : ${JSON.stringify(query)}`);
    const game = queryHandler.handle(query);
    return res.JSON(game);
}));

gameRouter.post('/', routerWrapper(async (req, res) => {
    logger.info('Game creation is initializing ...');
    const { playerIds, gameType, betAmount } = req.body;
    const gameId = uuidv1();
    // Create Game command...
    const command = new GameCreateCommand(gameId, playerIds, gameType, betAmount);
    logger.info(`GameCreateCommand is created : ${JSON.stringify(command)}`);
    await commandHandler.handle(command);
    logger.info('Handler successfully handle command');
    return res.sendStatus(200);
}));

gameRouter.put('/:id', routerWrapper(async (req, res) => {
    logger.info('Game updation is initializing ...');
    const { id: gameId } = req.params;
    const { playerId, dices } = req.body;
    // Create Game command...
    const command = new DiceRollCommand(gameId, playerId, dices);
    logger.info(`DiceRollCommand is created : ${JSON.stringify(command)}`);
    await commandHandler.handle(command);
    logger.info('Handler successfully handle command');
    return res.sendStatus(200);
}));

module.exports = gameRouter;
