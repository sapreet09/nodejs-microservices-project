const express = require('express');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Service Running');
});

app.use('/api/task', taskRoutes);

module.exports = app;