const { expect } = require('chai');
const BaseEvent = require('../../../src/models/events/base-event');
const aggregateType = require('../../../src/models/aggregate-types');

describe('BaseEvent', function() {
    it('Should throw exception if aggregateId is undefined', function() {
        expect(function() {
            new BaseEvent();
        }).to.throw(Error);
    });
    it('Should throw exception if aggregateId is invalid', function() {
        expect(function() {
            new BaseEvent("1");
        }).to.throw('BaseEvent requires valid aggregateId!');
    });
    it('Should throw exception if aggregateTypes is undefined', function() {
        expect(function() {
            new BaseEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
        }).to.throw(Error);
    });
    it('Should throw exception if aggregateTypesId is invalid', function() {
        expect(function() {
            new BaseEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "1");
        }).to.throw('BaseEvent requires valid aggregateTypeId!');
    });
    it('Should throw exception if eventTypeId is undefined', function() {
        expect(function() {
            new BaseEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 1001);
        }).to.throw('BaseEvent requires valid eventTypeId!');
    });
    it('Should throw exception if eventTypeId is invalid', function() {
        expect(function() {
            new BaseEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 1001, "1");
        }).to.throw('BaseEvent requires valid eventTypeId!');
    });
    it('Should throw exception if timestamp is undefined', function() {
        expect(function() {
            new BaseEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 1001, 10001);
        }).to.throw('BaseEvent requires valid timestamp!');
    });
    it('Should throw exception if metadata is invalid', function() {
        expect(function() {
            const jsonStr = JSON.stringify({ a: "test" });
            new BaseEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 1001, 10001, '2019-01-01', { a: "test" });
        }).to.throw(Error);
    });
    it('Should return BaseEvent if every paramater is valid', function() {
        const jsonStr = JSON.stringify({ a: "test" });
        const event = new BaseEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 1001, 10001, '2019-01-01', jsonStr);
        expect(event.getAggregateId()).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
        expect(event.getAggregateTypeId()).to.be.eq(1001);
        expect(event.getEventTypeId()).to.be.eq(10001);
        expect(event.getTimestamp().toString()).to.be.eq('Tue Jan 01 2019 00:00:00 GMT-0800 (Pacific Standard Time)');
    });
});
