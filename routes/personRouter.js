const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    //req.body

    //{name: "Francisco Júnior", salary: 5000, approved: false}
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
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

// read - para leitura de dados
router.get('/', async (req, res) => {

    try {

        const people = await Person.find()

        res.status(200).json(people)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/:id', async (req, res) => {

    //Extraindo o dado da requisição, pela URL = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({ error: 'O usuário não foi encontrado!' })
            return
        }

        res.status(200).json(person)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//Update - para atualizar dados - (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id 

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ error: 'O usuário não foi encontrado!' })
            return
        }

        res.status(200).json(person)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


//Delete - para deletar dados da aplicação
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ error: 'O usuário não foi encontrado!' })
        return
    }

    try {

        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router