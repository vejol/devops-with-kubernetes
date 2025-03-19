import { createServer } from 'http'
import pg from 'pg'

const PORT = process.env.PORT || 3001
const client = new pg.Client()

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL')
    return client.query(`
      CREATE TABLE IF NOT EXISTS pingpong (
        id SERIAL PRIMARY KEY,
        count INT NOT NULL
      )
    `)
  })
  .catch((err) => {
    console.error('Connection error', err.stack)
    throw err
  })

const getCounterValue = async () => {
  try {
    const result = await client.query('SELECT COUNT(*) FROM pingpong')
    return parseInt(result.rows[0].count)
  } catch (err) {
    console.error('Error fetching counter value', err.stack)
    throw err
  }
}

const updateCounterValue = async (newCounterValue) => {
  try {
    await client.query('INSERT INTO pingpong (count) VALUES ($1)', [
      newCounterValue,
    ])
  } catch (err) {
    console.error('Error executing query', err.stack)
    throw err
  }
}

const server = createServer(async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  if (req.url === '/') {
    res.end('Hello there!')
  }

  if (req.url === '/pingpong') {
    const newCounterValue = (await getCounterValue()) + 1
    await updateCounterValue(newCounterValue)
    res.end(`pong ${newCounterValue}`)
  }

  if (req.url === '/pingpong/count') {
    res.end(`${await getCounterValue()}`)
  }

  if (req.url === '/pingpong/healthz') {
    try {
      await client.query('SELECT 1')
      res.end('OK')
    } catch (err) {
      res.statusCode = 500
      res.end('Database connection failed')
    }
  }
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
