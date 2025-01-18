const axios = require('axios')
const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001

const directory = path.join(__dirname, 'files')
const filePath = path.join(directory, 'image.jpg')
const imageUrl = 'https://picsum.photos/1200'

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo App</title>
  </head>
  <body>
    <div class="container">
      <img
        src="/files/image.jpg"
        alt="Random image"
        style="max-height: 400px"
      />
      <form>
        <input type="text" />
        <button type="submit">create TODO</button>
      </form>
      <ul>
        <li>Write some Python</li>
        <li>Learn C++</li>
      </ul>
    </div>
  </body>
</html>`

const getNewImage = async () => {
  const response = await axios.get(imageUrl, { responseType: 'stream' })
  await response.data.pipe(fs.createWriteStream(filePath))
}

fs.mkdirSync(directory, { recursive: true })

if (!fs.existsSync(filePath)) {
  getNewImage()
}

setInterval(async () => {
  getNewImage()
}, 3600000) // 3600000ms=60min

const app = express()

app.use('/files', express.static(directory))

app.get('/', (req, res) => {
  res.send(html)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
