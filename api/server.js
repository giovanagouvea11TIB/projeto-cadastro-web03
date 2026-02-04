import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mb'
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados: ' + err.stack)
        return
    }
    console.log('Conectado como id ' + connection.threadId)
})

app.post('/products', (req, res) => {
    const { name, price, description, category } = req.body
    const sql = 'INSERT INTO `3mb_0giovana_gouvea` (name, price, description, category) VALUES (?, ?, ?, ?)'
    connection.query(sql, [name, price, description, category], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao salvar produto', error: err })
        } else {
            res.status(201).json({ message: 'Produto salvo com sucesso', id: results.insertId })
        }
    })
})

app.get('/products', (req, res) => {
    const sql = 'SELECT name, price, description, category FROM `3mb_0giovana_gouvea`'
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao buscar produtos', error: err })
        } else {
            res.status(200).json(results)
        }
    })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
