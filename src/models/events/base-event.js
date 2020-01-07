class BaseEvent {
    constructor(aggregateId, aggregateTypeId, eventTypeId, timestamp, metadata) {
        if (!aggregateId || !aggregateTypeId || !eventTypeId || !timestamp || !metadata) {
            throw new Error('Event should have valid aggregateId, aggregateTypeId, eventTypeId, timestamp, metadata !');
        }
        this.aggregate_uuid = aggregateId;
        this.aggregate_type_id = aggregateTypeId;
        this.event_type_id = eventTypeId;
        this.create_time = timestamp;
        this.metadata = metadata;
    }
}

module.exports = BaseEvent;
