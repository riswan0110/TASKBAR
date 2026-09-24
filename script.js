const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");


// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}


// Update task count
function updateTaskCount() {
    const totalTasks = taskList.children.length;
    taskCount.textContent = totalTasks;
}


// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const listItem = document.createElement("li");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    // Complete task
    taskTextElement.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        saveTasks();
    });

    // Delete task
    deleteButton.addEventListener("click", function () {
        listItem.remove();
        updateTaskCount();
        saveTasks();
    });

    listItem.appendChild(taskTextElement);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = "";

    updateTaskCount();
    saveTasks();
}


// Add button
addButton.addEventListener("click", addTask);


// Press Enter to add task
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Clear all tasks
clearButton.addEventListener("click", function () {

    taskList.innerHTML = "";

    updateTaskCount();
    saveTasks();

});


// Load saved tasks when the page opens
window.addEventListener("load", function () {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        taskList.innerHTML = savedTasks;

        // Restore Complete and Delete buttons
        const tasks = taskList.querySelectorAll("li");

        tasks.forEach(function (listItem) {

            const taskTextElement = listItem.querySelector("span");
            const deleteButton = listItem.querySelector("button");

            taskTextElement.addEventListener("click", function () {
                listItem.classList.toggle("completed");
                saveTasks();
            });

            deleteButton.addEventListener("click", function () {
                listItem.remove();
                updateTaskCount();
                saveTasks();
            });

        });

        updateTaskCount();
    }

});