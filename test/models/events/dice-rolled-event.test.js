const { expect } = require('chai');
const { DiceRolledData, DiceRolledEvent } = require('../../../src/models/events/dice-rolled-event');
const aggregateType = require('../../../src/models/aggregate-types');
const eventTypes = require('../../../src/models/event-types');

describe('DiceRolledEvent', function() {
    describe('DiceRolledData', function() {
        it('Should throw exception if playerId in undefined', function() {
            expect(function() {
                new DiceRolledData();
            }).to.throw(Error);
        })
        it('Should throw exception if playerId in invalid', function() {
            expect(function() {
                new DiceRolledData('DiceRolledData requires valid playerId!');
            }).to.throw(Error);
        })
        it('Should throw exception if dices in undefined', function() {
            expect(function() {
                new DiceRolledData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
            }).to.throw('DiceRolledData requires valid dices!');
        })
        it('Should throw exception if dices in invalid', function() {
            expect(function() {
                new DiceRolledData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 'test']);
            }).to.throw('DiceRolledData requires valid dices!');
        })
        it('Should throw exception if dices in invalid', function() {
            expect(function() {
                new DiceRolledData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, '1']);
            }).to.throw('DiceRolledData requires valid dices!');
        })
        it('Should return DiceRolledData if all paramaters are valid', function() {
            const data = new DiceRolledData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1]);
            expect(data.playerId).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
            expect(data.dices).to.be.eql([1, 1])
        })
    })
    describe('DiceRolledEvent', function() {
        it('Should throw exception diceRolledData in undefined', function() {
            expect(function() {
                new DiceRolledEvent();
            }).to.throw('DiceRolledEvent requires valid diceRolledData!')
        })
        it('Should return diceRolledEvent if paramaters are valid', function() {
            const data = new DiceRolledData("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1]);
            const event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", new Date('2019-01-01'), data);
            expect(event.getAggregateId()).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b");
            expect(event.getAggregateTypeId()).to.be.eq(aggregateType.GAME);
            expect(event.getEventTypeId()).to.be.eq(eventTypes.DICE_ROLLED);
            expect(event.getData()).to.be.eql(data);
        })
    })
});
