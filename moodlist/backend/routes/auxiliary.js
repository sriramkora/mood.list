const express = require('express');
const logger = require('pino')()

const router = express.Router();

router.get('/live', async (req, res, next) => {
    // logger.debug("/live called")
    return res
        .status(200)
        .json("Live");
})

router.get('/ready', async (req, res, next) => {
    // logger.debug("/ready called")
    return res
        .status(200)
        .json("Ready");
})

module.exports = router;