const express = require('express')
const cors = require('cors');
const db = require('./helpers/db.helper')
const router = require('./routes')


const app = express()

app.use(express.json())

const corsOptions = {
    origin: 'https://revfin-27hp.vercel.app/', 
    methods: 'POST, GET, OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Handle Preflight (OPTIONS) requests
app.options('*', cors(corsOptions));
app.use(router);

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