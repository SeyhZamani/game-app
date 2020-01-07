const BaseCommand = require('./base-command');

class GameCreateCommand extends BaseCommand {
    constructor(players) {
        super();
        this.players = players;
    }
}

module.exports = GameCreateCommand;
