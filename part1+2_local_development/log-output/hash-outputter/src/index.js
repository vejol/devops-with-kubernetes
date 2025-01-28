import path from 'path'
import { createServer } from 'http'
import { readFileSync } from 'fs'

const PORT = process.env.PORT || 3001
const pingPongUrl = 'http://ping-pong-svc:2345/pingpong/count'
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
        <div>file content: ${readInformation()}</div>
        <div>env variable: MESSAGE=${process.env.MESSAGE}</div>
        <div>${readHash()}</div>
        <div>Ping / Pongs: ${count}</div>
`)
  })
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
