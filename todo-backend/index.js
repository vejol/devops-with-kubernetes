const cors = require('cors')
const express = require('express')
const pg = require('pg')

const PORT = process.env.PORT || 3002
const client = new pg.Client()

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL')
    client.query(`
      CREATE TABLE IF NOT EXISTS Todos (
        id SERIAL PRIMARY KEY,
        content VARCHAR(140) NOT NULL
      )
    `)
  })
  .catch((err) => {
    console.error('Connection error', err.stack)
    throw err
  })

getTodos = async () => {
  try {
    const result = await client.query('SELECT * FROM Todos')
    return result.rows
  } catch (err) {
    console.error('Error fetching todos', err.stack)
    throw err
  }
}

addTodo = async (content) => {
  try {
    const result = await client.query(
      'INSERT INTO Todos (content) VALUES ($1) RETURNING *',
      [content]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error executing query', err.stack)
    throw err
  }
}

const app = express()

app.use(express.json())
app.use(cors())

app.get('/todos', async (req, res) => {
  const todos = await getTodos()
  res.status(200).json(todos)
})

app.post('/todos', async (req, res) => {
  const content = req.body.content
  console.log(`Received todo: ${content}`)
  if (content.length > 140) {
    const errorMessage =
      'Error: The todo content exceeds the maximum allowed length of 140 characters. Please shorten your todo and try again.'
    console.error(errorMessage)
    return res.status(400).send(errorMessage)
  }
  const todo = await addTodo(content)
  res.status(201).json(todo)
})

app.use((req, res) => {
  res.status(404).send('Not found')
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
