const { knex } = require('../utils/database');
const { map: mapToEventObject } = require('../mappers/event-record-to-event-object-mapper');


class BaseEventStoreReadRepository {
    constructor(aggregateTypeId) {
        if (!aggregateTypeId) {
            throw new TypeError('BaseEventStoreReadRepository requires aggregateTypeId!');
        }
        this.aggregateTypeId = aggregateTypeId;
    }

    getAllById(id) {
        return knex('event_store')
            .where({
                aggregate_uuid: id,
                aggregate_type_id: this.aggregateTypeId,
            })
            .then((r) => r.map(mapToEventObject));
    }
}


module.exports = BaseEventStoreReadRepository;
