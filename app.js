//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  document.addEventListener('DOMContentLoaded', getTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    let lis = document.createElement('li');
    lis.className = 'collection-item';
    lis.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    lis.appendChild(link);
    taskList.appendChild(lis);
  });
}

//Add Task
function addTask(e) {
  if (!taskInput.value) {
    alert('Add a task');
  }
  //console.log(taskInput.value)
  let lis = document.createElement('li');
  lis.className = 'collection-item';
  lis.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  lis.appendChild(link);
  taskList.appendChild(lis);
  storeTaskInLocalStorage(taskInput.value);
  //console.log(tasks);
  taskInput.value = '';
  //console.log(lis);
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    // const itemToRemoveByClass = e.target.className;
    // const itemToRemoveByElement = Array.from(
    //   document.getElementsByClassName(itemToRemoveByClass)
    // );
    // itemToRemoveByElement[0].parentElement.parentElement.remove();
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  e.preventDefault();
}

function removeTaskFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(taskItem, index) {
    if (taskItem.textContent === task) {
      tasks.splice(taskItem, index);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
  if (confirm('Are you sure?')) {
    //e.target.previousSibling.remove();
    //taskList.innerHTML = '';
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
  }
  e.preventDefault();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  e.preventDefault();
}
