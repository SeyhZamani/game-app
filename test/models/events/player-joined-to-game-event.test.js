const { expect } = require('chai');
const { PlayerJoinedToGameEvent, PlayerJoinedToGameMetadata } = require('../../../src/models/events/player-joined-to-game-event');
const aggregateType = require('../../../src/models/aggregate-types');
const eventTypes = require('../../../src/models/event-types');


describe('PlayerJoinedToGameEvent', function() {
    describe('PlayerJoinedToGameMetadata', function() {
        it('Should throw exception if gameId is undefined', function() {
            expect(function() {
                new PlayerJoinedToGameMetadata()
            }).to.throw(Error)
        })
        it('Should throw exception if gameId is invalid', function() {
            expect(function() {
                new PlayerJoinedToGameMetadata("1")
            }).to.throw('PlayerJoinedToGameMetadata requires valid gameId!')
        })
        it('Should throw exception if betAmount is undefined', function() {
            expect(function() {
                new PlayerJoinedToGameMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a")
            }).to.throw('PlayerJoinedToGameMetadata requires valid credit!')
        })
        it('Should throw exception if betAmount is invalid', function() {
            expect(function() {
                new PlayerJoinedToGameMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "1")
            }).to.throw('PlayerJoinedToGameMetadata requires valid credit!')
        })
        it('Should return playerJoinedToGameMetadata if paramaters are valid', function() {
            const metadata = new PlayerJoinedToGameMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 10)
            expect(metadata.gameId).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
            expect(metadata.credit).to.be.eq(-10);
        })
    })
    describe('PlayerJoinedToGameEvent', function() {
        it('Should throw exception if playerJoinedToGameMetadata is undefined', function() {
            expect(function() {
                new PlayerJoinedToGameEvent();
            }).to.throw('PlayerAssignedEvent requires valid playerAssignedMetadata!')
        })
        it('Should return playerJoinedToGameEvent if paramaters are valid', function() {
            const metadata = new PlayerJoinedToGameMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", -10)
            const event = new PlayerJoinedToGameEvent('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', new Date('2019-01-01'), metadata);
            expect(event.getAggregateId()).to.be.eq('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b');
            expect(event.getAggregateTypeId()).to.be.eq(aggregateType.PLAYER);
            expect(event.getEventTypeId()).to.be.eq(eventTypes.PLAYER_JOINED_TO_GAME);
            expect(event.getMetadata()).to.be.eql(metadata);
        })
    })
});
