// Configurando inicialmente
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')

//Formando uma rota para ler o JSON // Middleware
app.use (
    express.urlencoded({
        extended: true,
    }),
)

app.use (express.json())

//Rotas da API
const personRouter = require('./routes/personRouter')

//Rota inicial / endpoint
app.get('/', (req, res) => {

    //Mostrar req

    res.json({ message: 'Oi, Express!' })
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//Entregar uma porta
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apirestfull.wjffxzb.mongodb.net/bancoapi?retryWrites=true&w=majority&appName=Apirestfull`,
    )
    .then( () => {
        console.log('Conectamos com sucesso ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))