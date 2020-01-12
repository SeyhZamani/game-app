const AggregateTypes = require('../models/aggregate-types');
const BaseEventStoreReadRepository = require('./base-event-store-read-repository');

class GameEventStoreReadRepository extends BaseEventStoreReadRepository {
    constructor() {
        super(AggregateTypes.GAME);
    }
}

module.exports = GameEventStoreReadRepository;
