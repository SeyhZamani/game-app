const { expect } = require('chai');
const { GameCreatedMetadata, GameCreatedEvent } = require('../../../src/models/events/game-created-event');
const aggregateType = require('../../../src/models/aggregate-types');
const eventTypes = require('../../../src/models/event-types');


describe('GameCreatedEvent', function() {
    describe('GameCreatedMetadata', function() {
        it('Should throw error if gameType is undefined', function() {
            expect(function() {
                new GameCreatedMetadata();
            }).to.throw('GameCreatedMetadata requires valid gameType!')
        })
        it('Should throw error if gameType is invalid', function() {
            expect(function() {
                new GameCreatedMetadata('test');
            }).to.throw('GameCreatedMetadata requires valid gameType!')
        })
        it('Should throw error if playerIds is undefined', function() {
            expect(function() {
                new GameCreatedMetadata('basic');
            }).to.throw('GameCreatedMetadata requires valid playerIds!')
        })
        it('Should throw error if playerIds is invalid', function() {
            expect(function() {
                new GameCreatedMetadata('basic', ["test1", "test2"]);
            }).to.throw('GameCreatedMetadata requires valid playerIds!')
        })
        it('Should throw error if betAmount is undefined', function() {
            expect(function() {
                new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"]);
            }).to.throw('GameCreatedMetadata requires valid betAmount!')
        })
        it('Should throw error if betAmount is invalid', function() {
            expect(function() {
                new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], "test");
            }).to.throw('GameCreatedMetadata requires valid betAmount!')
        })
        it('Should return gameCreatedMetadata if paramaters are valid', function() {
            const event = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            expect(event.gameType).to.be.eq('basic');
            expect(event.playerIds).to.be.eql(["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"]);
            expect(event.betAmount).to.be.eq(10);
        })
    })
    describe('GameCreatedEvent', function() {
        it('Should throw exception if gameCreatedMetadata is undefined', function() {
            expect(function() {
                new GameCreatedEvent();
            }).to.throw('GameCreatedEvent requires valid gameCreatedMetadata!')
        })
        it('Should return gameCreatedEvent if all paramaters are valid', function() {
            const metadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const event = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), metadata);
            expect(event.getAggregateId()).to.be.eq('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c');
            expect(event.getAggregateTypeId()).to.be.eq(aggregateType.GAME);
            expect(event.getEventTypeId()).to.be.eq(eventTypes.GAME_CREATED);
            expect(event.getMetadata()).to.be.eql(metadata);
        })
    })
})
