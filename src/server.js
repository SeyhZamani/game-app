const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const baseRouter = require('./routes');


const createServer = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
    app.use('/api', baseRouter);

    app.listen(PORT, () => {
        logger.info(`Game-App is listening on port: ${PORT} ...`);
    });

    return app;
};


module.exports = {
    createServer,
};
