const WIKI_URL = process.env.WIKI_URL
const BACKEND_URL = process.env.BACKEND_URL

const getRandomUrl = async () => {
  const response = await fetch(WIKI_URL, { redirect: 'manual' })
  return response.headers.get('Location')
}

const postNewTodo = async (content) => {
  const todo = {
    content: content,
  }

  await fetch(`${BACKEND_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
}

getRandomUrl().then((randomWikiUrl) => {
  postNewTodo(`Read ${randomWikiUrl}`)
})
