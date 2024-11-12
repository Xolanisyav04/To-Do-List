// const express = require('express');
// const morgan = require('morgan');

// // Express app
// const app = express();

// // Register view engine
// app.set('view engine', 'ejs');

// // Listen for requests
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

// // Middleware & static files
// app.use(express.static('public'));

// // Route for the home page
// app.get('/', (req, res) => {
//     res.render('index'); // This will render 'views/index.ejs'
// });

// // Fallback route for handling 404 errors (optional)
// app.use((req, res) => {
//     res.status(404).render('404'); // Make sure you have a 'views/404.ejs' file
// });


const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to serve static files (if you have any)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // For form handling

// In-memory store for todos
let todos = [];

// Home route to display the todos
app.get('/', (req, res) => {
    res.render('index', { todos }); // Pass the list of todos to the EJS view
});

// Route to add a new todo
app.post('/add', (req, res) => {
    const { taskName, taskDescription } = req.body;

    if (taskName && taskDescription) {
        todos.push({ name: taskName, description: taskDescription, completed: false });
    }
    res.redirect('/');
});

// Route to mark a task as complete
app.post('/complete/:index', (req, res) => {
    const index = req.params.index;
    if (todos[index]) {
        todos[index].completed = true;
    }
    res.redirect('/');
});

// Route to delete a task
app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (todos[index]) {
        todos.splice(index, 1);
    }
    res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


