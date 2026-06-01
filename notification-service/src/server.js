const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Notification Service Running');
});

app.get('/api/notifications', (req, res) => {
    res.json({
        success: true,
        message: 'Notifications fetched successfully',
        data: [
            {
                id: 1,
                message: 'Welcome to Task Manager'
            }
        ]
    });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});