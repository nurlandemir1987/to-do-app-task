const inputText = document.getElementById('input-text');
const addBtn = document.querySelector('.input-button-text');
const todoList = document.querySelector('ul');
const taskCount = document.querySelector('.footer p');
const clearBtn = document.querySelector('.footer button');

let tasks = [];
function renderTasks() {
todoList.innerHTML = '';
tasks.forEach((task, index) => {
const li = document.createElement('li');
li.textContent = task;
const deleteBtn = document.createElement('button');
deleteBtn.innerHTML = '<i class="fa fas fa-trash"></i>';
deleteBtn.addEventListener('click', () => {
tasks.splice(index, 1);
renderTasks();
updateTaskCount();
});
li.appendChild(deleteBtn);
todoList.appendChild(li);
});
}

function updateTaskCount() {
const taskCountText = tasks.length === 1 ? '1 task' : `${tasks.length} tasks`;
taskCount.textContent = `You have ${taskCountText} pending`;
}


function addTask() {
const taskText = inputText.value.trim();
if (taskText !== '') {
tasks.push(taskText);
inputText.value = '';
renderTasks();
updateTaskCount();
}
}

function clearAllTasks() {
tasks = [];
renderTasks();
updateTaskCount();
}

addBtn.addEventListener('click', addTask);
inputText.addEventListener('keyup', event => {
if (event.key === 'Enter') {
addTask();
}
});
clearBtn.addEventListener('click', clearAllTasks);

window.addEventListener('load', () => {
tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();
updateTaskCount();
});

window.addEventListener('beforeunload', () => {
localStorage.setItem('tasks', JSON.stringify(tasks));
});