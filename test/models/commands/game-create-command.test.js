const { expect } = require('chai');
const GameCreateCommand = require('../../../src/models/commands/game-create-command');


describe('GameCreateCommand', function() {
    it('Should throw expection if gameId is undefined', function() {
        expect(function() {
            new GameCreateCommand();
        }).to.throw(Error);
    });
    it('Should throw expection if gameId is not string', function() {
        expect(function() {
            new GameCreateCommand(1);
        }).to.throw(Error);
    });
    it('Should throw expection if gameId is not valid', function() {
        expect(function() {
            new GameCreateCommand("1");
        }).to.throw('GameCreateCommand requires valid gameId!');
    });
    it('Should throw expection if playerIds is undefined', function() {
        expect(function() {
            new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
        }).to.throw('GameCreateCommand requires valid playerIds!');
    });
    it('Should throw expection if playerIds is empty', function() {
        expect(function() {
            new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", []);
        }).to.throw('GameCreateCommand requires valid playerIds!');
    });
    it('Should throw expection if playerIds is invalid', function() {
        expect(function() {
            new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a", [1, 2, 3]);
        }).to.throw(Error);
    });
    it('Should throw expection if gameType is undefined', function() {
        expect(function() {
            new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41d"
                ]);
        }).to.throw('GameCreateCommand requires valid gameType!');
    });
    it('Should throw expection if gameType is invalid', function() {
        expect(function() {
            new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41d"
                ], 'test');
        }).to.throw('GameCreateCommand requires valid gameType!');
    });
    it('Should throw expection if betAmount is invalid', function() {
        expect(function() {
            new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41d"
                ], 'basic', );
        }).to.throw('GameCreateCommand requires valid betAmount!');
    });
    it('Should throw expection if betAmount is invalid', function() {
        expect(function() {
            new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
                ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c",
                    "e0ba4a44-3dc6-4564-8b44-6ab1403ac41d"
                ], 'basic', 'test');
        }).to.throw('GameCreateCommand requires valid betAmount!');
    });
    it('Should return GameCreateCommand if paramaters are valid', function() {
        var command = new GameCreateCommand("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a",
            ["e0ba4a44-3dc6-4564-8b44-6ab1403ac41b",
                "e0ba4a44-3dc6-4564-8b44-6ab1403ac41c",
                "e0ba4a44-3dc6-4564-8b44-6ab1403ac41d"
            ], 'basic', '10');
        expect(command.gameId).to.be.eq("e0ba4a44-3dc6-4564-8b44-6ab1403ac41a");
        expect(command.playerIds.length).to.be.eq(3);
        expect(command.gameType).to.be.eq("basic");
        expect(command.betAmount).to.be.eq(10);
    });
})
