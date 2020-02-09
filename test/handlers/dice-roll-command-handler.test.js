const { expect } = require('chai');
const sinon = require('sinon');
const diceRollHandler = require('../../src/handlers/dice-roll-command-handler');
const WriteRepo = require('../../src/repositories/base-event-store-write-repository');
const GameReadRepo = require('../../src/repositories/game-event-store-read-repository')
const Game = require('../../src/models/game');

describe('DiceRollCommandHandler', function() {

    var sandbox;
    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Should call GameReadRepo one time', async function() {
        const gameId = '1234'
        const gameEvent = ['test', 'test2'];
        const command = { gameId };
        const getAllByIdStub = sandbox.stub(GameReadRepo.prototype, 'getAllById')
            .resolves(gameEvent);
        const applyStub = sandbox.stub(Game.prototype, 'apply')
            .returns(undefined);
        const processStub = sandbox.stub(Game.prototype, 'process')
            .returns([]);
        await diceRollHandler(command);
        applyStub.calledWith(gameEvent);
        getAllByIdStub.calledWith(gameId);
        sinon.assert.calledOnce(getAllByIdStub);
        getAllByIdStub.restore();
        applyStub.restore();
        processStub.restore()
    })
    it('Should call WriteRepo three times if game process return three events', async function() {
        const gameId = '1234'
        const gameEvent = ['test', 'test2'];
        const command = { gameId };
        const getAllByIdStub = sandbox.stub(GameReadRepo.prototype, 'getAllById')
            .resolves(gameEvent);
        const createStub = sandbox.stub(WriteRepo.prototype, 'create')
            .resolves(undefined);
        const applyStub = sandbox.stub(Game.prototype, 'apply')
            .returns(undefined);
        const processStub = sandbox.stub(Game.prototype, 'process')
            .returns(['test', 'test', 'test']);
        await diceRollHandler(command);
        sinon.assert.calledThrice(createStub);
        getAllByIdStub.restore();
        applyStub.restore();
        processStub.restore()
        createStub.restore();
    })
})
