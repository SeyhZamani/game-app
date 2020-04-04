const { knex, authenticate } = require('./utils/database');
const kafka = require('./kafka');
const logger = require('./utils/logger');

const { setupServer } = require('./server');

const run = async () => {
    await authenticate(knex);
    kafka.initiate();
    const server = setupServer();

    process.on('SIGTERM', () => {
        logger.info('Got SIGTERM. Gracefully shutdown is starting..');
        server.close((serverCloseErr) => {
            if (serverCloseErr) {
                logger.error(serverCloseErr);
                process.exit(1);
            }
            knex.destroy((dbCloseError) => {
                if (dbCloseError) {
                    logger.error(dbCloseError);
                    process.exit(1);
                }
                process.exit();
            });
        });
    });
};

run();
