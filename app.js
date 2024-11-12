const express = require('express');
const { LocalStorage } = require('node-localstorage');

// Initialize LocalStorage
const localStorage = new LocalStorage('./scratch');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to serve static files (if you have any)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // For form handling

// Helper function to load todos from local storage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
}

// Helper function to save todos to local storage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Home route to display the todos
app.get('/', (req, res) => {
    const todos = loadTodos(); // Load todos from local storage
    res.render('index', { todos });
});

// Route to add a new todo
app.post('/add', (req, res) => {
    const { taskName, taskDescription } = req.body;
    const todos = loadTodos();

    if (taskName && taskDescription) {
        todos.push({ name: taskName, description: taskDescription, completed: false });
        saveTodos(todos); // Save updated todos to local storage
    }
    res.redirect('/');
});

// Route to mark a task as complete
app.post('/complete/:index', (req, res) => {
    const index = req.params.index;
    const todos = loadTodos();

    if (todos[index]) {
        todos[index].completed = true;
        saveTodos(todos); // Save updated todos to local storage
    }
    res.redirect('/');
});

// Route to delete a task
app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    let todos = loadTodos();

    if (todos[index]) {
        todos.splice(index, 1);
        saveTodos(todos); // Save updated todos to local storage
    }
    res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});