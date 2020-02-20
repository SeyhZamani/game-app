const { expect } = require('chai');
const { PlayerJoinedToGameEvent, PlayerJoinedToGameData } = require('../../../src/models/events/player-joined-to-game-event');
const aggregateType = require('../../../src/models/aggregate-types');
const eventTypes = require('../../../src/models/event-types');


describe('PlayerJoinedToGameEvent', function() {
    describe('PlayerJoinedToGameData', function() {
        it('Should throw exception if gameId is undefined', function() {
            expect(function() {
                new PlayerJoinedToGameData()
            }).to.throw(Error)
        })
        it('Should throw exception if gameId is invalid', function() {
            expect(function() {
                new PlayerJoinedToGameData("1")
            }).to.throw('PlayerJoinedToGameData requires valid gameId!')
        })
        it('Should throw exception if betAmount is undefined', function() {
            expect(function() {
                new PlayerJoinedToGameData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a")
            }).to.throw('PlayerJoinedToGameData requires valid credit!')
        })
        it('Should throw exception if betAmount is invalid', function() {
            expect(function() {
                new PlayerJoinedToGameData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "1")
            }).to.throw('PlayerJoinedToGameData requires valid credit!')
        })
        it('Should return playerJoinedToGameData if paramaters are valid', function() {
            const data = new PlayerJoinedToGameData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 10)
            expect(data.gameId).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
            expect(data.credit).to.be.eq(-10);
        })
    })
    describe('PlayerJoinedToGameEvent', function() {
        it('Should throw exception if PlayerJoinedToGameData is undefined', function() {
            expect(function() {
                new PlayerJoinedToGameEvent();
            }).to.throw('PlayerAssignedEvent requires valid playerJoinedToGameData!')
        })
        it('Should return playerJoinedToGameEvent if paramaters are valid', function() {
            const data = new PlayerJoinedToGameData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", -10)
            const event = new PlayerJoinedToGameEvent('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', new Date('2019-01-01'), data);
            expect(event.getAggregateId()).to.be.eq('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b');
            expect(event.getAggregateTypeId()).to.be.eq(aggregateType.PLAYER);
            expect(event.getEventTypeId()).to.be.eq(eventTypes.PLAYER_JOINED_TO_GAME);
            expect(event.getData()).to.be.eql(data);
        })
    })
});
