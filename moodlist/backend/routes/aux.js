const express = require('express');

const router = express.Router();

router.get('/live', async (req, res, next) => {
    return res
        .status(200)
        .json("Live");
})

router.get('/ready', async (req, res, next) => {
    return res
        .status(200)
        .json("Ready");
})

module.exports = router;