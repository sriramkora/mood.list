const express = require('express');

const router = express.Router();

router.get('/live', async (req, res, next) => {
    // console.log("/live called")
    return res
        .status(200)
        .json("Live");
})

router.get('/ready', async (req, res, next) => {
    // console.log("/ready called")
    return res
        .status(200)
        .json("Ready");
})

module.exports = router;