const logger = require('../utils/logger');

const errorHandlerMiddlware = (err, req, res, next) => {
    logger.error(err.stack);
    res.type('json');
    return res.status(500).send({ error: err.message });
};

module.exports = errorHandlerMiddlware;
