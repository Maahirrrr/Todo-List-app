const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterCompleted = document.getElementById('filter-completed');

// Load tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks based on the selected filter
function renderTasks(filter = 'all') {
  todoList.innerHTML = '';

  let filteredTasks = tasks;

  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add(task.priority);
    li.innerHTML = `
      <div>
        <strong>${task.description}</strong> <br>
        <small>${task.dueDate}</small>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    if (task.completed) {
      li.classList.add('completed');
    }
    todoList.appendChild(li);
  });
}

// Function to add a new task
function addTask(description, dueDate, priority) {
  tasks.push({ description, dueDate, priority, completed: false });
  saveTasks();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Function to toggle the completion status of a task
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  const description = taskInput.value.trim(); // Get trimmed task description
  const dueDate = dueDateInput.value; // Get due date
  const priority = priorityInput.value; // Get priority level

  if (description && dueDate) {
    addTask(description, dueDate, priority); // Add the task
    taskInput.value = ''; // Clear the input field
    dueDateInput.value = ''; // Clear the due date field
  } else {
    alert("Please enter a task and select a due date."); // Alert if fields are empty
  }
});

// Event listeners for task filtering
filterAll.addEventListener('click', () => renderTasks('all'));
filterActive.addEventListener('click', () => renderTasks('active'));
filterCompleted.addEventListener('click', () => renderTasks('completed'));

// Initial render of tasks
renderTasks();
