// Configurando inicialmente
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
app.post('/person', async (req, res) => {
    //req.body

    //{name: "Francisco Júnior", salary: 5000, approved: false}
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
    }

    const person = {
        name,
        salary,
        approved,
    }

    try {

        //Criar dados na coleção
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida com sucesso!' })

    } catch (err) {
        res.status(500).json({ error: error })
    }

})

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