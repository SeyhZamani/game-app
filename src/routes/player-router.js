const playerRouter = require('express').Router();
const logger = require('../utils/logger');
const queryHandler = require('../handlers/queries');
const PlayerGetByIdQuery = require('../models/queries/player-get-by-id-query');
const { routerWrapper } = require('../utils/express-utils');

playerRouter.get('/:id', routerWrapper(async (req, res) => {
    logger.info('Player fetching is called ...');
    const { id: playerId } = req.params;
    const query = new PlayerGetByIdQuery(playerId);
    logger.info(`PlayerGetByIdQuery is created : ${JSON.stringify(query)}`);
    const player = queryHandler.handle(query);
    return res.JSON(player);
}));


module.exports = playerRouter;
