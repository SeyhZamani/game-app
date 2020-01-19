const Game = require('../models/game');
const Player = require('../models/player');
const logger = require('../utils/logger');

const diceRollCommandHandler = async (command) => {
    logger.info('diceRollCommandHandler is handling command...');
};

module.exports = diceRollCommandHandler;
