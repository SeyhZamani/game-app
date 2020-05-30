const dbAdapter = require('../utils/database');

class BaseEventStoreWriteRepository {
    create(event) {
        const db = dbAdapter.getDB();
        return db('event_store').insert(event);
    }
}

module.exports = BaseEventStoreWriteRepository;
