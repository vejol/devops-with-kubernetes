const todos = []

const getTodos = () => {
  fetch(`/todos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      todos.push(...data)
      redrawTodos()
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}

const redrawTodos = () => {
  const ul = document.createElement('ul')
  ul.setAttribute('class', 'todos')

  todos.forEach((todo) => {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(todo.content))
    ul.appendChild(li)
  })
  const todosElement = document.getElementById('todos')

  if (todosElement.hasChildNodes()) {
    todosElement.removeChild(todosElement.childNodes[0])
  }
  todosElement.appendChild(ul)
}

const addTodo = (todo) => {
  fetch(`/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      todos.push(data)
      redrawTodos()
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}

document.addEventListener('DOMContentLoaded', () => {
  getTodos()

  const form = document.getElementById('todos_form')
  form.onsubmit = (e) => {
    e.preventDefault()

    const input = document.getElementById('content')
    const todo = {
      content: input.value,
    }

    addTodo(todo)
    input.value = ''
  }
})
