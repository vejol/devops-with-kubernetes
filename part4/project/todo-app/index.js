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

app.get('/healthz', (req, res) => {
  const baseUrl = process.env.TODO_BACKEND_SVC_URL
  axios
    .get(`${baseUrl}/todos`)
    .then((result) => {
      console.log('result:', result)
      res.send('OK')
    })
    .catch((err) => {
      console.log('error:', err)
      res.status(503).send('Failed to fetch todos')
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
