const { expect } = require('chai');
const sinon = require('sinon');
const GameCreateCommand = require('../../src/models/commands/game-create-command');
const DiceRollCommand = require('../../src/models/commands/dice-roll-command');

describe('Handler', function() {
    let spyDiceRoll;
    let spyGameCreated;
    let sandbox;
    beforeEach(function() {
        sandbox = sinon.createSandbox();
        spyDiceRoll = sandbox.spy();
        spyGameCreated = sandbox.spy();
        require.cache[require.resolve('../../src/handlers/dice-roll-command-handler')] = {
            exports: spyDiceRoll,
        };
        require.cache[require.resolve('../../src/handlers/game-create-command-handler')] = {
            exports: spyGameCreated,
        };
    })
    afterEach(function() {
        delete require.cache[require.resolve('../../src/handlers')];
        delete require.cache[require.resolve('../../src/handlers/dice-roll-command-handler')];
        delete require.cache[require.resolve('../../src/handlers/game-create-command-handler')];

    })
    it('Should throw exception if command is unknown', function() {
        const { handle } = require('../../src/handlers');
        expect(function() {
            handle({})
        }).to.throw('Unknown command!');
    })
    it('Should call once if GameCreateCommand', function() {
        const { handle } = require('../../src/handlers');
        const command = new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
            ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c",
                "e0ba4a44-3dc6-4564-8b44-6ab1403ac41d"
            ], 'basic', '10');
        handle(command);
        sinon.assert.calledOnce(spyGameCreated);
        sinon.assert.notCalled(spyDiceRoll);
    })
    it('Should call once if DiceRollCommand', function() {
        const { handle } = require('../../src/handlers');
        const command = new DiceRollCommand(
            "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
            "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
            [1, 2]);
        handle(command);
        sinon.assert.calledOnce(spyDiceRoll);
        sinon.assert.notCalled(spyGameCreated);
    })
})
