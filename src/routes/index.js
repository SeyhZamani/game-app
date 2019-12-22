const router = require('express').Router();
const gameApi = require('./game-router');

router.use('/game', gameApi);


module.exports = router;
