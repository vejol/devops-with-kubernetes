const axios = require('axios')
const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001

const directory = path.join(__dirname, 'public', 'images')
const filePath = path.join(directory, 'image.jpg')
const imageUrl = 'https://picsum.photos/1200'

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

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Todo App</title>
        <script type="application/javascript" src="/public/main.js"></script>
      </head>
      <body>
          <div>New test main branch XDD</div>
          <img
            src="/public/images/image.jpg"
            alt="Random image"
            style="max-height: 400px"
          />
          <form id="todos_form">
            <input id="content" type="text" maxlength="140" required />
            <button type="submit">create TODO</button>
          </form>
          <div id="todos">
          </div>
      </body>
    </html>`
  res.send(html)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
