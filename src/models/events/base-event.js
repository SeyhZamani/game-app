const validator = require('validator');
const moment = require('moment');
const aggregateTypes = require('../../models/aggregate-types');
const eventTypes = require('../../models/event-types');

class BaseEvent {
    constructor(aggregateId, aggregateTypeId, eventTypeId, timestamp, metadata) {
        if (!validator.isUUID(aggregateId)) {
            throw new TypeError('BaseEvent requires valid aggregateId!');
        }
        if (!Object.values(aggregateTypes).includes(aggregateTypeId)) {
            throw new TypeError('BaseEvent requires valid aggregateTypeId!');
        }
        if (!Object.values(eventTypes).includes(eventTypeId)) {
            throw new TypeError('BaseEvent requires valid eventTypeId!');
        }
        if (!timestamp || !moment(timestamp).isValid()) {
            throw new TypeError('BaseEvent requires valid timestamp!');
        }
        if (metadata && !validator.isJSON(metadata)) {
            throw new TypeError('BaseEvent requires valid JSON metadata!');
        }
        this.aggregate_uuid = aggregateId;
        this.aggregate_type_id = aggregateTypeId;
        this.event_type_id = eventTypeId;
        this.create_time = moment(timestamp).toDate();
        this.metadata = metadata;
    }

    getAggregateId() {
        return this.aggregate_uuid;
    }

    getAggregateTypeId() {
        return this.aggregate_type_id;
    }

    getEventTypeId() {
        return this.event_type_id;
    }

    getTimestamp() {
        return this.create_time;
    }

    getMetadata() {
        throw new Error('getMatdata must be implemeted in derived classes!');
    }
}

module.exports = BaseEvent;
