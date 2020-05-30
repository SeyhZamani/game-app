const dbAdapter = require('./utils/database');
const kafkaAdapter = require('./kafka');
const logger = require('./utils/logger');

const { setupServer } = require('./server');

const run = async () => {
    try {
        await dbAdapter.init();
        await dbAdapter.authenticate();
        await kafkaAdapter.initiate();

        const server = setupServer();

        process.on('SIGTERM', async () => {
            logger.info('Got SIGTERM. Gracefully shutdown is starting..');
            server.close(async (serverCloseErr) => {
                if (serverCloseErr) {
                    logger.error(serverCloseErr);
                    process.exit(1);
                }
                await kafkaAdapter.disconnect();
                await dbAdapter.disconnect();
                process.exit();
            });
        });
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};

run();
