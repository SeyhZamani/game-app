const router = require('express').Router();
const gameApi = require('./game-router');
const playerApi = require('./player-router');

router.use('/game', gameApi);
router.use('/player', playerApi);


module.exports = router;
