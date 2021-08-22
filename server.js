const express = require('express')
const app = express()
const games = require('./routes/games')
const favorites = require('./routes/favorites')

app.use(express.json())

// app.use('/', games)

app.use('/favorites', favorites)

app.listen(3000, () => {
    console.log('server is running');
})