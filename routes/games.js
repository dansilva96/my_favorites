const axios = require('axios')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { data } = await axios.get(
            'https://simple-api-selection.herokuapp.com/list-games/?title=race')
        res.send(data);
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { data } = await axios.get(
            `https://store.steampowered.com/api/appdetails?appids=${req.params.id}`)
        res.send(data);
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
})

module.exports = router