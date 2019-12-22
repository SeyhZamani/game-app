class GameCreateCommand {
    constructor({ id, timestamp, player }) {
        this.id = id;
        this.timestamp = timestamp;
        this.player = player;
    }
}

module.exports = GameCreateCommand;
