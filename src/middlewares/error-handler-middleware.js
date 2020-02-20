const logger = require('../utils/logger');

const errorHandlerMiddlware = (err, req, res, next) => {
    logger.error(err.stack);
    return res.status(500).send(err.message);
};

module.exports = errorHandlerMiddlware;
