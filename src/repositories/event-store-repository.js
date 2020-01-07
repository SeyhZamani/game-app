const { knex } = require('../utils/database');

const findAllBy = (aggregateId, aggregateTypeId) => knex('event_store')
    .where({
        aggregate_uuid: aggregateId,
        aggregate_type_id: aggregateTypeId,
    });

const create = (event) => knex('event_store').insert(event);


module.exports = {
    findAllBy,
    create,
};
