const {
    PG_HOST: host,
    PG_PORT: port,
    PG_DATABASE: database,
    PG_USERNAME: user,
    PG_PASSWORD: password,
} = process.env;

const knex = require('knex')({
    client: 'pg',
    connection: {
        host,
        port,
        database,
        password,
        user,
    },
    debug: true,
});

const authenticate = (dbInstance) => dbInstance.raw('SELECT 1+1 as Result');


module.exports = {
    knex,
    authenticate,
};
