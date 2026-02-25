import express from 'express'
import cors from 'cors'
import mysql2 from 'mysql2/promise'

const app = express()

app.use(express.json())
app.use(cors())

const pool = mysql2.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

app.post('/products', async (req, res) => {
    const { name, price, description, category } = req.body
    const sql = 'INSERT INTO `3mb_0giovana_gouvea` (name, price, description, category) VALUES (?, ?, ?, ?)'
    try {
        const [results] = await pool.query(sql, [name, price, description, category])
        res.status(201).json({ message: 'Produto salvo com sucesso', id: results.insertId })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao salvar produto', error: err.message })
    }
})

app.get('/products', async (req, res) => {
    const sql = 'SELECT id, name, price, description, category FROM `3mb_0giovana_gouvea`'
    try {
        const [results] = await pool.query(sql)
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message })
    }
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const sql = 'SELECT id, name, price, description, category FROM `3mb_0giovana_gouvea` WHERE id = ?'
    try {
        const [results] = await pool.query(sql, [id])
        if (results.length > 0) {
            res.status(200).json(results[0])
        } else {
            res.status(404).json({ message: 'Produto não encontrado' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produto', error: err.message })
    }
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const { name, price, description, category } = req.body
    const sql = 'UPDATE `3mb_0giovana_gouvea` SET name = ?, price = ?, description = ?, category = ? WHERE id = ?'
    try {
        const [results] = await pool.query(sql, [name, price, description, category, id])
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Produto atualizado com sucesso' })
        } else {
            res.status(404).json({ message: 'Produto não encontrado' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message })
    }
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM `3mb_0giovana_gouvea` WHERE id = ?'
    try {
        const [results] = await pool.query(sql, [id])
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Produto deletado com sucesso' })
        } else {
            res.status(404).json({ message: 'Produto não encontrado' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar produto', error: err.message })
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
