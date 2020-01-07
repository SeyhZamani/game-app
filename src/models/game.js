const GameCreateCommand = require('./commands/game-create-command');
const GameCreatedEvent = require('./events/game-created-event');

class Game {
    constructor(events) {
        this.aggregateId = undefined;
        this.players = [];
        this.apply(events);
    }

    apply(events) {
        if (!events || events.length === 0) {
            return;
        }
        for (const event of events) {
            switch (event.constructor) {
                case GameCreatedEvent:
                    this.applyGameCreatedEvent(event);
                    break;
                default:
                    throw new Error('Unknown event !');
            }
        }
    }

    process(command) {
        switch (command.constructor) {
            case GameCreateCommand:
                return this.processGameCreateCommand(command);
            default:
                throw new Error('Unknown command !');
        }
    }

    applyGameCreatedEvent(event) {
        const { aggregateId, metadata } = event;
        const { players } = metadata;
        // Assign aggregateId
        this.aggregateId = aggregateId;
        if (!players || players.length <= 1) {
            throw new TypeError('Players must be valid and length is greater one');
        }
        // Assign players
        for (const player of players) {
            this.players.push(player);
        }
    }

    processGameCreateCommand(command) {
        const { players } = command;
        const gameCreatedMetadata = {
            players,
        };
        const event = new GameCreatedEvent(gameCreatedMetadata);
        this.apply([event]);
        return event;
    }
}


module.exports = Game;
