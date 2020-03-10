//define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearButton = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //Add task event
    form.addEventListener('submit', addTask);
}
function addTask(e){
    if(taskInput.value === ''){
        alert('Please enter a task before submitting.');
    }
    //creat li element
    const li = document.createElement('li');
    //create class
    li.className = 'collection-item';
    //creat text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class name to link element
    link.className = 'delete-item secondary-content';
    //add html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    //clear input
    taskInput.value ="";

    e.preventDefault();
}


