// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

let todos;

// Functions
function saveLocalStorageTodos(todo) {
    checkLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalStorageTodos(todo) {
    checkLocalStorage();
    todos.forEach(function(todo) {
        updateDOM(todo);
    })
}

function removeLocalStorageTodos(todo) {
    checkLocalStorage();
    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf("4"));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkLocalStorage() {
    if (!localStorage.getItem('todos')) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
};

function updateDOM(todo) {
    const divEl = document.createElement('div');
    divEl.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.textContent = todo;
    newTodo.classList.add('todo-item');  
    divEl.appendChild(newTodo);
    
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('complete-btn');
    const itagBtn = document.createElement('i');
    itagBtn.classList.add('fas','fa-check');
    completedBtn.appendChild(itagBtn);
    divEl.appendChild(completedBtn);
    
    const completedBtn2 = document.createElement('button');
    completedBtn2.classList.add('trash-btn');
    const itagBtn2 = document.createElement('i');
    itagBtn2.classList.add('fas', 'fa-trash');
    completedBtn2.appendChild(itagBtn2);
    divEl.appendChild(completedBtn2);

    todoList.appendChild(divEl);    
}

function createTodoList() {
    // Div element whish wrapped li items
    const divEl = document.createElement('div');
    divEl.classList.add('todo');
    // Create li items
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    newTodo.classList.add('todo-item');  
    divEl.appendChild(newTodo);  
    // check mark button
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('complete-btn');
    const itagBtn = document.createElement('i');
    itagBtn.classList.add('fas','fa-check');
    completedBtn.appendChild(itagBtn);
    divEl.appendChild(completedBtn);
    // trash button
    const completedBtn2 = document.createElement('button');
    completedBtn2.classList.add('trash-btn');
    const itagBtn2 = document.createElement('i');
    itagBtn2.classList.add('fas', 'fa-trash');
    completedBtn2.appendChild(itagBtn2);
    divEl.appendChild(completedBtn2);
    // Merge all        
    todoList.appendChild(divEl);  
    saveLocalStorageTodos(todoInput.value);
    todoInput.value = "";    
}

function addTodo(e) {
    e.preventDefault();
    // console.log(e);
    createTodoList();
}

function deleteCheck(e) {
    // console.log(e.target);
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalStorageTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();            
        });        
    }
    // check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            default:
                break;
        }
    });
}

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// On load
getLocalStorageTodos();