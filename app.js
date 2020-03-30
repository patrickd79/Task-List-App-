//define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearButton = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  //remove task
  taskList.addEventListener("click", removeTask);
  //clear whole task list
  clearButton.addEventListener("click", clearList);
  //filter task events
  filter.addEventListener("keyup", filterTasks);
}
// Get tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    //creat li element
    const li = document.createElement("li");
    //create class
    li.className = "collection-item";
    //creat text node and append to the li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class name to link element
    link.className = "delete-item secondary-content";
    //add html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please enter a task before submitting.");
  } else {
    //creat li element
    const li = document.createElement("li");
    //create class
    li.className = "collection-item";
    //creat text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement("a");
    //add class name to link element
    link.className = "delete-item secondary-content";
    //add html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    //store task in local storage
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = "";
  }
  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to remove this item?")) {
      e.target.parentElement.parentElement.remove();

      //remove from Local Storage
      removeFromStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeFromStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

//clear whole list
function clearList(e) {
  //if (e.target.classList.contains('clear-task')) {
  //    taskList.remove();
  //}
  //faster than remove
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    filter.value = "";
  }
  clearFromLocalStorage();
}

function clearFromLocalStorage() {
  localStorage.clear();
}

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
