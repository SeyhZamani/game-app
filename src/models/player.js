class Player {

    apply(events) {
        if (!Array.isArray(events) || events.length === 0) {
            throw new Error('Player Events should be array and be greater 0');
        }
    }

    process(command) {

    }

    canPlay() {
        return true;
    }
}


module.exports = Player;
