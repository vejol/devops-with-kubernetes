import path from 'path'
import { createServer } from 'http'
import { readFileSync } from 'fs'

const PORT = process.env.PORT || 3001
const pingPongUrl = 'http://ping-pong-svc:2345/pingpong/count'
const hashFilePath = path.join('/', 'usr', 'src', 'app', 'files', 'hash.txt')

const readHash = () => {
  try {
    return readFileSync(hashFilePath, 'utf8')
  } catch (err) {
    console.error('Error reading hash file', err)
  }
}

const getPingCount = async () => {
  try {
    const response = await fetch(pingPongUrl)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    const count = await response.text()
    return count
  } catch (error) {
    console.error(
      'There was a problem with the fetch from ping-pong app:',
      error
    )
  }
}

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  getPingCount().then((count) => {
    res.end(`
        <p>${readHash()}</p>
        <p>Ping / Pongs: ${count}</p>
`)
  })
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
