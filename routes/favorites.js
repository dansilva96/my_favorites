const axios = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../db.json')
const path = require('path')
const fs = require('fs')

router.get('/', (req, res) => {
    const favoriteGames = db.filter(game => game.user == req.headers.user)

    res.json(favoriteGames)
})

router.post('/', async (req, res) => {
    if (!req.headers.user) res.send('Usuário inválido')

    try {
        const { data } = await axios.get(
            `https://store.steampowered.com/api/appdetails?appids=${req.body.appid}`)

        const gameId = Object.keys(data)

        if (data[gameId].success) {
            const hasGame = db.find(game => game.info.steam_appid === req.body.appid
                && game.user == req.headers.user)

            if (!hasGame) {
                const newFavorite = {
                    user: req.headers.user,
                    rating: req.body.rating,
                    info: data[gameId].data
                }

                db.push(newFavorite)

                fs.writeFile(path.join(__dirname, '../db.json'),
                    JSON.stringify(db), err => {
                        console.log(err || 'saved file')
                    })

                res.json(newFavorite)
            } else {
                res.send('Jogo já favoritado por este usuário')
            }
        } else {
            res.send('Jogo não encontrado. ID inválido')
        }

    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
})

router.delete('/:id', (req, res) => {
    const hasGame = db.find(game => game.info.steam_appid == req.params.id
        && game.user == req.headers.user)

    if (hasGame) {
        const updateFavorites = db.filter(game => game.info.steam_appid != req.params.id
            || game.user != req.headers.user)

        fs.writeFile(path.join(__dirname, '../db.json'),
            JSON.stringify(updateFavorites), err => {
                console.log(err || 'saved file')
            })

        res.json(updateFavorites)
    } else {
        res.send('Jogo não favoritado por este usuário')
    }
})

module.exports = router
