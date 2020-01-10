const { knex } = require('../utils/database');
const AggregateTypes = require('../models/aggregate-types');
const EventStoreRepository = require('./event-store-repository');

class PlayerEventStoreRepository extends EventStoreRepository {
    findById(aggregateId) {
        return knex('event_store')
            .where({
                aggregate_uuid: aggregateId,
                aggregate_type_id: AggregateTypes.PLAYER,
            });
    }

    countById(aggregateId) {
        return knex('event_store')
            .where({
                aggregate_uuid: aggregateId,
                aggregate_type_id: AggregateTypes.PLAYER,
            })
            .count();
    }
}

module.exports = PlayerEventStoreRepository;
