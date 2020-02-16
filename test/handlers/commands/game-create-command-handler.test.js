const chai = require('chai');
const sinon = require('sinon');
const gameCommandHandler = require('../../../src/handlers/commands/game-create-command-handler');
const WriteRepo = require('../../../src/repositories/base-event-store-write-repository');
const GameReadRepo = require('../../../src/repositories/game-event-store-read-repository')
const Game = require('../../../src/models/game');

chai.use(require('chai-as-promised'))
const { expect } = chai;

describe('GameCreateCommandHandler', function() {
    var sandbox;
    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });
    it('Should throw exception there is already GameEvent', async function() {
        const gameId = "1234";
        const playerIds = ["1234", "5678"];
        const betAmount = 10;
        const gameEvent = ['test', 'test2'];
        const command = {
            gameId,
            playerIds,
            betAmount
        };
        const getAllByIdStub = sandbox.stub(GameReadRepo.prototype, 'getAllById')
            .resolves(gameEvent);
        await expect(gameCommandHandler(command)).to.be.rejectedWith(`Game with Id ${gameId} already exists!`);
        getAllByIdStub.restore();
    })
})
