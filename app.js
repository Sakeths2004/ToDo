document.addEventListener('DOMContentLoaded', function () {
    // Check if tasks exist in local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load tasks into the UI
    loadTasks();

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false,
            };

            tasks.push(newTask);
            saveTasks();
            loadTasks();
            taskInput.value = '';
        }
    };

    // Function to delete a task
    window.deleteTask = function (taskId) {
        tasks.splice(tasks.findIndex(task => task.id === taskId), 1);
        saveTasks();
        loadTasks();
    };

    // Function to toggle task completion status
    window.toggleTaskStatus = function (taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        loadTasks();
    };

    // Function to load tasks into the UI
    function loadTasks() {
        const taskContainer = document.getElementById('task-container');
        taskContainer.innerHTML = '';

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskStatus(${task.id})">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskContainer.appendChild(taskElement);
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
