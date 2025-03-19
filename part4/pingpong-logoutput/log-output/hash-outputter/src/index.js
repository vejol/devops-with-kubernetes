import path from 'path'
import { createServer } from 'http'
import { readFileSync } from 'fs'

const PORT = process.env.PORT || 3001
const PING_PONG_URL = `${process.env.PING_PONG_URL}/pingpong/count`
const directory = path.join('/', 'usr', 'src', 'app')
const hashFilePath = path.join(directory, 'files', 'hash.txt')
const infoFilePath = path.join(directory, 'info', 'information.txt')

const readHash = () => {
  try {
    return readFileSync(hashFilePath, 'utf8')
  } catch (err) {
    console.error('Error reading hash file', err)
  }
}

const readInformation = () => {
  try {
    return readFileSync(infoFilePath, 'utf8')
  } catch (err) {
    console.error('Error reading information.txt file', err)
  }
}

const getPingCount = async () => {
  const response = await fetch(PING_PONG_URL)
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText)
  }
  const count = await response.text()
  return count
}

const server = createServer((req, res) => {
  if (req.url === '/log-output') {
    getPingCount()
      .then((count) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(`
          <div>file content: ${readInformation()}</div>
          <div>env variable: MESSAGE=${process.env.MESSAGE}</div>
          <div>${readHash()}</div>
          <div>Ping / Pongs: ${count}</div>
  `)
      })
      .catch((err) => {
        console.error(
          'There was a problem with the fetch from ping-pong app:',
          err
        )
        res.statusCode = 503
        res.end("Ping-pong app didn't response with ping count")
      })
  }

  if (req.url === '/log-output/healthz') {
    getPingCount()
      .then(() => res.end('OK'))
      .catch(() => {
        res.statusCode = 503
        res.end("Ping-pong app didn't response with ping count")
      })
  }
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
