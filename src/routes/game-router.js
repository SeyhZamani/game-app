const gameRouter = require('express').Router();
const moment = require('moment');
const uuid = require('uuid/v4');
const logger = require('../utils/logger');
const gameCommandHandler = require('../handler/game-command-handler');
const GameCreateCommand = require('../models/commands/game-create-command');


gameRouter.get('/:id', (req, res) => {
    logger.info('Game fetching is called ...');
    return res.sendStatus(200);
});

gameRouter.post('/', async (req, res) => {
    logger.info('Game creation is initializing ...');
    const { players } = req.body;
    // Create Game command...
    const command = new GameCreateCommand(players);
    logger.info(`GameCreateCommand is created : ${JSON.stringify(command)}`);
    await gameCommandHandler.handle(command);
    logger.info('Handler is successfully handle command');
    return res.sendStatus(200);
});

gameRouter.put('/:id', async (req, res) => {

});

module.exports = gameRouter;
