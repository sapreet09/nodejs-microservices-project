const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log('Gateway received:', req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    res.send('API Gateway Running');
});

app.use(
    '/api/auth',
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE_URL,
        changeOrigin: true
    })
);

app.use(
    '/api/task',
    createProxyMiddleware({
        target: process.env.TASK_SERVICE_URL,
        changeOrigin: true
    })
);

app.use(
    '/api/notifications',
    createProxyMiddleware({
        target: process.env.NOTIFICATION_SERVICE_URL,
        changeOrigin: true
    })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});