const { expect } = require('chai');
const { DiceRolledMetadata, DiceRolledEvent } = require('../../../src/models/events/dice-rolled-event');
const aggregateType = require('../../../src/models/aggregate-types');
const eventTypes = require('../../../src/models/event-types');

describe('DiceRolledEvent', function() {
    describe('DiceRolledMetadata', function() {
        it('Should throw exception if playerId in undefined', function() {
            expect(function() {
                new DiceRolledMetadata();
            }).to.throw(Error);
        })
        it('Should throw exception if playerId in invalid', function() {
            expect(function() {
                new DiceRolledMetadata('DiceRolledMetadata requires valid playerId!');
            }).to.throw(Error);
        })
        it('Should throw exception if dices in undefined', function() {
            expect(function() {
                new DiceRolledMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
            }).to.throw('DiceRolledMetadata requires valid dices!');
        })
        it('Should throw exception if dices in invalid', function() {
            expect(function() {
                new DiceRolledMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 'test']);
            }).to.throw('DiceRolledMetadata requires valid dices!');
        })
        it('Should throw exception if dices in invalid', function() {
            expect(function() {
                new DiceRolledMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, '1']);
            }).to.throw('DiceRolledMetadata requires valid dices!');
        })
        it('Should return DiceRolledMetadata if all paramaters are valid', function() {
            const metadata = new DiceRolledMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1]);
            expect(metadata.playerId).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
            expect(metadata.dices).to.be.eql([1, 1])
        })
    })
    describe('DiceRolledEvent', function() {
        it('Should throw exception diceRolledMetadata in undefined', function() {
            expect(function() {
                new DiceRolledEvent();
            }).to.throw('DiceRolledEvent requires valid diceRolledMetadata!')
        })
        it('Should return diceRolledEvent if paramaters are valid', function() {
            const metadata = new DiceRolledMetadata("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1]);
            const event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", new Date('2019-01-01'), metadata);
            expect(event.getAggregateId()).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b");
            expect(event.getAggregateTypeId()).to.be.eq(aggregateType.GAME);
            expect(event.getEventTypeId()).to.be.eq(eventTypes.DICE_ROLLED);
            expect(event.getMetadata()).to.be.eql(metadata);
        })
    })
});
