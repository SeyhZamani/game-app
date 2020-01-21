const { expect } = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const mapper = rewire('../../src/mappers/event-to-player-event-mapper');
const aggregateType = require('../../src/models/aggregate-types');
const eventTypes = require('../../src/models/event-types');




describe('EventToPlayerEventMapper', function() {
    it('Should throw exception if eventTypeId is invalid', function() {
        expect(function() {
            mapper.map({
                event_type_id: -1
            })
        }).to.throw('Unknown PlayerEvent Type!');
    });
    it('Should call mapToPlayerJoinedToGameEvent once if event type is PLAYER_JOINED_TO_GAME', function() {
        const mapToPlayerJoinedEventStub = sinon.stub(mapper, 'mapToPlayerJoinedToGameEvent').returns(true);
        const unset = mapper.__set__('mapToPlayerJoinedToGameEvent', mapToPlayerJoinedEventStub);
        mapper.map({
            event_type_id: eventTypes.PLAYER_JOINED_TO_GAME
        })
        sinon.assert.calledOnce(mapToPlayerJoinedEventStub);
        mapToPlayerJoinedEventStub.restore();
        unset();
    });
})
