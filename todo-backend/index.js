const cors = require('cors')
const express = require('express')

const PORT = process.env.PORT || 3002
const todos = []

const app = express()

app.use(express.json())
app.use(cors())

app.get('/todos', (req, res) => {
  res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
  const todo = { id: Date.now(), content: req.body.content }
  todos.push(todo)
  res.status(201).json(todo)
})

app.use((req, res) => {
  res.status(404).send('Not found')
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
