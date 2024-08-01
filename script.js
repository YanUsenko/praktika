document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskClick);

    function addTask(e) {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName === '') return;

        const taskId = Date.now();
        const taskItem = document.createElement('li');
        taskItem.setAttribute('data-id', taskId);
        taskItem.innerHTML = `<input type='checkbox' class='toggle'> <span>${taskName}</span> <button class='delete'>Löschen</button>`;

        taskList.appendChild(taskItem);
        saveTask(taskId, taskName, false);
        taskInput.value = '';
    }

    function handleTaskClick(e) {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            const taskId = taskItem.getAttribute('data-id');
            taskItem.remove();
            deleteTask(taskId);
        } else if (e.target.classList.contains('toggle')) {
            const taskItem = e.target.parentElement;
            const taskId = taskItem.getAttribute('data-id');
            const completed = e.target.checked;
            toggleTask(taskId, completed);
            taskItem.classList.toggle('completed', completed);
        }
    }

    function saveTask(id, name, completed) {
        const tasks = getTasks();
        tasks.push({ id, name, completed });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id != id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleTask(id, completed) {
        const tasks = getTasks();
        const task = tasks.find(task => task.id == id);
        if (task) {
            task.completed = completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Initialize task list from localStorage
    function initializeTasks() {
        const tasks = getTasks();
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.setAttribute('data-id', task.id);
            taskItem.innerHTML = `<input type='checkbox' class='toggle' ${task.completed ? 'checked' : ''}> <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.name}</span> <button class='delete'>Löschen</button>`;
            taskList.appendChild(taskItem);
        });
    }

    initializeTasks();
});
