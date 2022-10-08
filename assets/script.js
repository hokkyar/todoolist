let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

window.onload = () => {
    if (checkStorage) {
        loadContent()
    }
}

$('#input-search').on('keyup', (e) => {
    if (e.key === "Enter" && e.target.value !== '') {
        addTodo({
            name: e.target.value,
            isDone: false
        })
        e.target.value = ''
    }
})

function done(e) {
    e.classList.toggle('done')
    const name = e.firstChild.textContent
    todos.map((todo) => {
        if (todo.name == name) {
            if (e.classList.contains('done')) {
                todo.isDone = true
            } else {
                todo.isDone = false
            }
        }
    })
    console.log(todos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function removeItem(e) {
    const li = e.parentElement.firstChild
    removeTodo(li.textContent)
    e.parentElement.remove()
}

function removeTodo(name) {
    const filteredTodo = todos.filter((todo) => todo.name !== name)
    todos = filteredTodo
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTodo))
}

function addContent(todo) {
    $('#todos').append(`
        <li class="todo-item ${todo.isDone ? 'done' : ''}" onclick="done(this)"><span>${todo.name}</span>
            <i class="trash" onclick="removeItem(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
            </i>
        </li>
    `)
}

function addTodo(todo) {
    todos.push(todo)
    // if (todos[0] == '') {
    //     todos = todos.filter((t) => t !== '')
    // }
    addContent(todo)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function loadContent() {
    if (todos.length === 0) {
        return;
    }
    todos.map((todo) => {
        addContent(todo)
    })
}

