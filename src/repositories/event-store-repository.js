const { knex } = require('../utils/database');

class BaseEventStore {
    create(event) {
        return knex('event_store').insert(event);
    }
}


module.exports = BaseEventStore;
