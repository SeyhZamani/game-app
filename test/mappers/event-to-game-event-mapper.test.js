const { expect } = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const mapper = rewire('../../src/mappers/event-to-game-event-mapper');
const aggregateType = require('../../src/models/aggregate-types');
const eventTypes = require('../../src/models/event-types');



describe('EventToGameEventMapper', function() {
    it('Should throw exception if eventTypeId is invalid', function() {
        expect(function() {
            mapper.map({
                event_type_id: -1
            })
        }).to.throw('Unknown GameEvent Type!');
    });
    it('Should call mapToGameCreatedEvent once if event type is GAME_CREATED', function() {
        const mapToGameCreatedEventStub = sinon.stub(mapper, 'mapToGameCreatedEvent').returns(true);
        const unset = mapper.__set__('mapToGameCreatedEvent', mapToGameCreatedEventStub);
        mapper.map({
            event_type_id: eventTypes.GAME_CREATED
        })
        sinon.assert.calledOnce(mapToGameCreatedEventStub);
        mapToGameCreatedEventStub.restore();
        unset();
    });
    it('Should call mapToDiceRolledEvent once if event type is DICE_ROLLED', function() {
        const mapToDiceRolledEventStub = sinon.stub(mapper, 'mapToDiceRolledEvent').returns(true);
        const unset = mapper.__set__('mapToDiceRolledEvent', mapToDiceRolledEventStub);
        mapper.map({
            event_type_id: eventTypes.DICE_ROLLED
        })
        sinon.assert.calledOnce(mapToDiceRolledEventStub);
        mapToDiceRolledEventStub.restore();
        unset();
    });
    it('Should call multiple times based on event types', function() {
        const mapToDiceRolledEventStub = sinon.stub(mapper, 'mapToDiceRolledEvent').returns(true);
        const mapToGameCreatedEventStub = sinon.stub(mapper, 'mapToGameCreatedEvent').returns(true);
        const unset1 = mapper.__set__('mapToDiceRolledEvent', mapToDiceRolledEventStub);
        const unset2 = mapper.__set__('mapToGameCreatedEvent', mapToGameCreatedEventStub);
        [
            { event_type_id: eventTypes.GAME_CREATED },
            { event_type_id: eventTypes.DICE_ROLLED },
            { event_type_id: eventTypes.DICE_ROLLED },
            { event_type_id: eventTypes.DICE_ROLLED }
        ].map(mapper.map)
        sinon.assert.calledOnce(mapToGameCreatedEventStub);
        sinon.assert.calledThrice(mapToDiceRolledEventStub);
        mapToDiceRolledEventStub.restore();
        mapToGameCreatedEventStub.restore();
        unset1();
        unset2();
    });
});
