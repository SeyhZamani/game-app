const { knex } = require('../utils/database');
const AggregateTypes = require('../models/aggregate-types');
const EventStoreRepository = require('./event-store-repository');

class GameEventStoreRepository extends EventStoreRepository {
    findById(gameId) {
        return knex('event_store')
            .where({
                aggregate_uuid: gameId,
                aggregate_type_id: AggregateTypes.GAME,
            });
    }
}

module.exports = GameEventStoreRepository;
