const { expect } = require('chai');
const DiceRollCommand = require('../../../src/models/commands/dice-roll-command');

describe('DiceRollCommand', function() {
    it('Should throw exception if gameId is undefined', function() {
        expect(function() {
            new DiceRollCommand()
        }).to.throw(Error);
    });
    it('Should throw exception if gameId is not string', function() {
        expect(function() {
            new DiceRollCommand(1)
        }).to.throw(Error);
    });
    it('Should throw exception if gameId is invalid', function() {
        expect(function() {
            new DiceRollCommand("1")
        }).to.throw('DiceRollCommand requires valid gameId!');
    });
    it('Should throw exception if playerId is undefined', function() {
        expect(function() {
            new DiceRollCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a")
        }).to.throw(Error);
    });
    it('Should throw exception if playerId is not string', function() {
        expect(function() {
            new DiceRollCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", 2)
        }).to.throw(Error);
    });
    it('Should throw exception if playerId is invalid', function() {
        expect(function() {
            new DiceRollCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "2")
        }).to.throw('DiceRollCommand requires valid playerId!');
    });
    it('Should throw exception if dices is undefined', function() {
        expect(function() {
            new DiceRollCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a")
        }).to.throw('DiceRollCommand requires valid dices!');
    });
    it('Should throw exception if dices is invalid', function() {
        expect(function() {
            new DiceRollCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, "test"])
        }).to.throw('DiceRollCommand requires valid dices!');
    });
    it('Should return DiceRollCommand if all paramaters are valid', function() {
        const command = new DiceRollCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", [1, 2]);
        expect(command.gameId).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
        expect(command.playerId).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b");
        expect(command.dices.length).to.be.eq(2);
    });
});
