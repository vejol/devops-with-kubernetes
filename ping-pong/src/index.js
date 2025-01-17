import { createServer } from 'http'

const PORT = process.env.PORT || 3001
let counter = 0

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  if (req.url === '/pingpong') {
    counter++
    res.end(`pong ${counter}`)
  }

  if (req.url === '/pingpong/count') {
    res.end(`${counter}`)
  }
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
