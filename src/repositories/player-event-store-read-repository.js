const AggregateTypes = require('../models/aggregate-types');
const BaseEventStoreReadRepository = require('./base-event-store-read-repository');

class PlayerEventStoreReadRepository extends BaseEventStoreReadRepository {
    constructor() {
        super(AggregateTypes.PLAYER);
    }
}

module.exports = PlayerEventStoreReadRepository;
