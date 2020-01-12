const { knex } = require('../utils/database');

class BaseEventStoreWriteRepository {
    create(event) {
        return knex('event_store').insert(event);
    }
}

module.exports = BaseEventStoreWriteRepository;
