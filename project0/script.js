const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let taskInProgress = false;

function newTodo() {
  addTask();
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addTask() {
  if (taskInProgress) {
    return;
  } else {
    taskInProgress = true;
  }
  // Create task within div and append it to document, disappears after submission
  const formArea = document.querySelector('.button');
  
  const taskDiv = document.createElement('div');
  const textBox = document.createElement('input');
  const submitTask = document.createElement('input');
  // Set box attributes
  textBox.setAttribute('id', 'task');
  textBox.setAttribute('placeholder', 'New Task');
  textBox.setAttribute('type', 'text');
  // Set submit attributes
  submitTask.setAttribute('id', 'submit');
  submitTask.setAttribute('type', 'submit');
  // Append to div
  taskDiv.appendChild(textBox);
  taskDiv.appendChild(submitTask);
  
  insertAfter(formArea , taskDiv); 

  // Select the submit button and input to be used later
  const submit = document.querySelector('#submit');
  const newTask = document.querySelector('#task');
  // Disable submit button by default:
  submit.disabled = true;
  // Listen for input to be typed into the input field
  newTask.onkeyup = () => {
    if (newTask.value.length > 0) {
      submit.disabled = false;
    }
    else {
      submit.disabled = true;
    }
  }
  // Listen for submission of form
  document.querySelector('#submit').onclick = () => {
    // Add new element to our unordered list:
    list.append(formattedTask(newTask.value));
    // Clear out input field:
    newTask.value = '';
    // Disable the submit button again:
    submit.disabled = true;
    // Remove the text box
    taskDiv.remove();
    // Set formInprogress to false
    taskInProgress = false;
    count();
    // Stop form from submitting
    return false;
  }
  count();
}

function formattedTask(task) {
  const li = document.createElement('li');
  const checkBox = document.createElement('input');
  // Set checkbox attributes
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', 'task-box');
  checkBox.setAttribute('class', classNames.TODO_CHECKBOX);
  checkBox.setAttribute('onclick', 'count()');
  // Append checkbox to the li
  li.appendChild(checkBox);
  li.innerHTML = li.innerHTML + ' ' + task;
  return li;
}

function count() {
  let toDos = document.querySelectorAll('.' + classNames.TODO_CHECKBOX);
  itemCountSpan.innerHTML = toDos.length;
  let numChecked = 0;
  toDos.forEach(toDos => {
    if (toDos.checked) {
      numChecked++;
    } 
  });
  uncheckedCountSpan.innerHTML = toDos.length - numChecked;
}