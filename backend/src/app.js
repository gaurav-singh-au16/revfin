const express = require('express')
const db = require('./helpers/db.helper')

const app = express()

// db connection
db.sync({alter: true}).then(() => {
    console.log('Database Connected!')
}).catch((err) => {
    console.log('Error => ', err)
})

// test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Working!'
    })
})

module.exports = app