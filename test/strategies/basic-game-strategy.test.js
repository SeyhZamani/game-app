const { expect } = require('chai');
const sinon = require('sinon');
const Game = require('../../src/models/game');
const { TurnViolationError } = require('../../src/strategies/base-game-strategy');
const BasicGameStrategy = require('../../src/strategies/basic-game-strategy');
const { GameCreatedMetadata, GameCreatedEvent } = require('../../src/models/events/game-created-event');
const { DiceRolledEvent, DiceRolledMetadata } = require('../../src/models/events/dice-rolled-event');


describe('BasicGameStrategy', function() {
    var sandbox;
    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });
    describe('Two Players with normal win', function() {
        it('Should throw exception if player in wrong order', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);
            context.apply([gcEvent]);
            const strategy = context.getStrategy();
            expect(() => strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", [1, 1, 1])).to.throw(TurnViolationError);
        })
        it('Should create DiceRolledEvent in first round first turn ', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);
            context.apply([gcEvent]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1, 1]);
            expect(events.length).to.be.eq(1);
        })
        it('Should throw exception if player in wrong order in first round second turn', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);
            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 2]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);
            context.apply([gcEvent, dc1Event]);
            const strategy = context.getStrategy();
            expect(() => strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1, 1])).to.throw(TurnViolationError);
        })
        it('Should create DiceRolledEvent in first round second turn', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 2]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);
            context.apply([gcEvent, dc1Event]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", [1, 1, 1]);
            expect(events.length).to.be.eq(1);
        });
        it('Should create DiceRolledEvent in second round third turn', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 2]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

            const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 2]);
            const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);
            context.apply([gcEvent, dc1Event, dc2Event]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1, 1]);
            expect(events.length).to.be.eq(1);
        });
        it('Should create DiceRolledEvent in second round forth turn ', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 2]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

            const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 2]);
            const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

            const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 2]);
            const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

            context.apply([gcEvent, dc1Event, dc2Event, dc3Event]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", [1, 1, 1]);
            expect(events.length).to.be.eq(1);
        });
        it('Should create DiceRolledEvent in third round fifth turn ', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

            const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

            const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
            const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

            const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
            const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

            context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 1, 1]);
            expect(events.length).to.be.eq(1);
        });
        it('Should create DiceRolledEvent and GameCompletedEvent in third round sixth turn ', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

            const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

            const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
            const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

            const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

            const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
            const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);


            context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", [1, 1, 1]);
            expect(events.length).to.be.eq(3);
        });
    })
    describe('Two Players with same points wait last round', function() {
        it('Should send DiceRolledEvent even if last round', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

            const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

            const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
            const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

            const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

            const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
            const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);


            context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", [1, 1, 1]);
            expect(events.length).to.be.eq(1);
        })
        it('Should create DiceRolledEvent and GameCompletedEvent in forth round eighth turn', function() {
            const context = new Game();
            const gcMetadata = new GameCreatedMetadata('basic', ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b"], 10);
            const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

            const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
            const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

            const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

            const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
            const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

            const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

            const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
            const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);

            const dc6Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
            const dc6Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc6Metadata);

            const dc7Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
            const dc7Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc7Metadata);

            context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event, dc6Event, dc7Event]);
            const strategy = context.getStrategy();
            const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41b", [2, 1, 1]);
            expect(events.length).to.be.eq(3);
        })
    })
    describe('Three Players with elimination on third round', function() {
        describe('Eliminate first player', function() {
            it('Should create DiceRolledEvent and PlayerLostEvent', function() {
                const context = new Game();
                const gcMetadata = new GameCreatedMetadata('basic', [
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c"
                ], 10);
                const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

                const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
                const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

                const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
                const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

                const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

                const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
                const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

                const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
                const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);

                const dc6Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc6Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc6Metadata);

                const dc7Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
                const dc7Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc7Metadata);

                const dc8Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
                const dc8Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc8Metadata);

                context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event, dc6Event, dc7Event, dc8Event]);
                const strategy = context.getStrategy();
                const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", [2, 2, 2]);
                expect(events.length).to.be.eq(2);
            })
            it('Should create DiceRolledEvent and GameCompletedEvent after elimiation', function() {
                const context = new Game();
                const gcMetadata = new GameCreatedMetadata('basic', [
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c"
                ], 10);
                const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);
                // 1 round
                const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
                const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

                const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
                const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

                const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);
                // 2 round
                const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
                const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

                const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
                const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);

                const dc6Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc6Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc6Metadata);
                // 3 round
                const dc7Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [1, 1, 1]);
                const dc7Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc7Metadata);

                const dc8Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
                const dc8Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc8Metadata);

                const dc9Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc9Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc9Metadata);
                // 4 round
                const dc10Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [2, 2, 2]);
                const dc10Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc10Metadata);


                context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event, dc6Event, dc7Event, dc8Event, dc9Event, dc10Event]);
                const strategy = context.getStrategy();
                const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", [3, 3, 3]);
                expect(events.length).to.be.eq(3);
            })
        });
        describe('Eliminate second player', function() {
            it('Should create DiceRolledEvent and PlayerLostEvent', function() {
                const context = new Game();
                const gcMetadata = new GameCreatedMetadata('basic', [
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c"
                ], 10);
                const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

                const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
                const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

                const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

                const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

                const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
                const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

                const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);

                const dc6Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc6Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc6Metadata);

                const dc7Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
                const dc7Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc7Metadata);

                const dc8Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc8Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc8Metadata);

                context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event, dc6Event, dc7Event, dc8Event]);
                const strategy = context.getStrategy();
                const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", [2, 2, 2]);
                expect(events.length).to.be.eq(2);
            })
            it('Should create DiceRolledEvent and GameCompletedEvent after elimiation', function() {
                const context = new Game();
                const gcMetadata = new GameCreatedMetadata('basic', [
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c"
                ], 10);
                const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);
                // 1 round
                const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
                const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

                const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

                const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);
                // 2 round
                const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
                const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

                const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);

                const dc6Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc6Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc6Metadata);
                // 3 round
                const dc7Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
                const dc7Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc7Metadata);

                const dc8Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc8Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc8Metadata);

                const dc9Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc9Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc9Metadata);
                // 4 round
                const dc10Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [2, 2, 2]);
                const dc10Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc10Metadata);


                context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event, dc6Event, dc7Event, dc8Event, dc9Event, dc10Event]);
                const strategy = context.getStrategy();
                const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", [3, 3, 3]);
                expect(events.length).to.be.eq(3);
            })
        });
        describe('Eliminate second and third player', function() {
            it('Should create DiceRolledEvent and PlayerLostEvent and GameCompletedEvent', function() {
                const context = new Game();
                const gcMetadata = new GameCreatedMetadata('basic', [
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c"
                ], 10);
                const gcEvent = new GameCreatedEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), gcMetadata);

                const dc1Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [3, 3, 3]);
                const dc1Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc1Metadata);

                const dc2Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc2Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc2Metadata);

                const dc3Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc3Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc3Metadata);

                const dc4Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [3, 3, 3]);
                const dc4Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc4Metadata);

                const dc5Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc5Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc5Metadata);

                const dc6Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41c', [2, 2, 2]);
                const dc6Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc6Metadata);

                const dc7Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41a', [3, 3, 3]);
                const dc7Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc7Metadata);

                const dc8Metadata = new DiceRolledMetadata('e0ba4a44-3dc6-4564-8b44-6ab1403ac41b', [1, 1, 1]);
                const dc8Event = new DiceRolledEvent("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", new Date('2019-01-01'), dc8Metadata);

                context.apply([gcEvent, dc1Event, dc2Event, dc3Event, dc4Event, dc5Event, dc6Event, dc7Event, dc8Event]);
                const strategy = context.getStrategy();
                const events = strategy.handleDiceRoll("e0ba4a44-3dc6-4564-8b44-6ab1403ac41c", [2, 2, 2]);
                expect(events.length).to.be.eq(3);
            });
        });
    });
});
