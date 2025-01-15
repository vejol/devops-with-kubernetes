import { createServer } from 'http'
import axios from 'axios'
import path from 'path'
import fs from 'fs'

const PORT = process.env.PORT || 3001

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'image.jpg')
const imageUrl = 'https://picsum.photos/1200'

const getNewImage = async () => {
  const response = await axios.get(imageUrl, { responseType: 'stream' })
  response.data.pipe(fs.createWriteStream(filePath))
}

fs.mkdirSync(directory, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating directory', err)
  }
})

if (!fs.existsSync(filePath)) {
  getNewImage()
}

setInterval(async () => {
  getNewImage()
}, 3600000) // 3600000ms=60min

const server = createServer((req, res) => {
  if (req.url === '/files/image.jpg') {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'text/plain')
          res.end('Error reading image file')
          console.error('Error reading image file', err)
        } else {
          res.statusCode = 200
          res.setHeader('Content-Type', 'image/jpeg')
          res.end(data)
        }
      })
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end('Image not found')
    }
  } else {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(
      `<img src="/files/image.jpg" alt="Random image" style="max-height: 400px;"/>`
    )
  }
})

server.listen(PORT)
console.log(`Server started in port ${PORT}`)
