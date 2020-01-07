const { knex, authenticate } = require('./utils/database');
const server = require('./server');

const run = async () => {
    await authenticate(knex);
    server.createServer();
};

run();
