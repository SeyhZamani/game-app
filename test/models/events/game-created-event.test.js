const { expect } = require('chai');
const { GameCreatedData, GameCreatedEvent } = require('../../../src/models/events/game-created-event');
const aggregateType = require('../../../src/models/aggregate-types');
const eventTypes = require('../../../src/models/event-types');


describe('GameCreatedEvent', function() {
    describe('GameCreatedData', function() {
        it('Should throw error if gameType is undefined', function() {
            expect(function() {
                new GameCreatedData();
            }).to.throw('GameCreatedData requires valid gameType!')
        })
        it('Should throw error if gameType is invalid', function() {
            expect(function() {
                new GameCreatedData('test');
            }).to.throw('GameCreatedData requires valid gameType!')
        })
        it('Should throw error if playerIds is undefined', function() {
            expect(function() {
                new GameCreatedData('basic');
            }).to.throw('GameCreatedData requires valid playerIds!')
        })
        it('Should throw error if playerIds is invalid', function() {
            expect(function() {
                new GameCreatedData('basic', ["test1", "test2"]);
            }).to.throw('GameCreatedData requires valid playerIds!')
        })
        it('Should throw error if betAmount is undefined', function() {
            expect(function() {
                new GameCreatedData('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"]);
            }).to.throw('GameCreatedData requires valid betAmount!')
        })
        it('Should throw error if betAmount is invalid', function() {
            expect(function() {
                new GameCreatedData('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], "test");
            }).to.throw('GameCreatedData requires valid betAmount!')
        })
        it('Should return gameCreatedData if paramaters are valid', function() {
            const event = new GameCreatedData('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            expect(event.gameType).to.be.eq('basic');
            expect(event.playerIds).to.be.eql(["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"]);
            expect(event.betAmount).to.be.eq(10);
        })
    })
    describe('GameCreatedEvent', function() {
        it('Should throw exception if gameCreatedData is undefined', function() {
            expect(function() {
                new GameCreatedEvent();
            }).to.throw('GameCreatedEvent requires valid gameCreatedData!')
        })
        it('Should return gameCreatedEvent if all paramaters are valid', function() {
            const data = new GameCreatedData('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const event = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), data);
            expect(event.getAggregateId()).to.be.eq('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c');
            expect(event.getAggregateTypeId()).to.be.eq(aggregateType.GAME);
            expect(event.getEventTypeId()).to.be.eq(eventTypes.GAME_CREATED);
            expect(event.getData()).to.be.eql(data);
        })
    })
})
