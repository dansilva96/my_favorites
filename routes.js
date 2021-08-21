const axios = require('axios')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const data = require('./db.json')

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/?format=json')
        res.send(response.data);
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${req.params.id}`)
        res.send(response.data);
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
})

module.exports = router