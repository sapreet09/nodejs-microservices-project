const app = require('./app');
const pool = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await pool.query('SELECT 1');
        console.log('Auth DB Connected');

        app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
}

startServer();