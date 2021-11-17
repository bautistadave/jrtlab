//import express from 'express'
import app from './app.js'
import mongoose from 'mongoose'
require('dotenv').config()

//const app = express()
//const PORT = 3000
const PORT = process.env.PORT || 3000;

//DB Connection
/* const uri =`mongodb+srv://mongoApi:${process.env.PASSWORD}@cluster0.aa8pf.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
) */

mongoose.connect('mongodb://mongo/address', { 
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('DB connected...'))
.catch(e => console.log('error db:', e))


app.get('/', (req, res) => res.send('Welcome to home route'))

app.listen(PORT, () => console.log(`server on ${PORT}`))