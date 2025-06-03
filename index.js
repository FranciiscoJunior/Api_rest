// Configurando inicialmente
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Formando uma rota para ler o JSON // Middleware
app.use (
    express.urlencoded({
        extended: true,
    }),
)

app.use (express.json())

//Rota inicial / endpoint
app.get('/', (req, res) => {

    //Mostrar req

    res.json({ message: 'Oi, Express!' })
})

const DB_USER = 'contatojuniiordev'
const DB_PASSWORD = encodeURIComponent('q4weSw2BD9MC3uTD')

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