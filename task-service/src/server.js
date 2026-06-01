const app = require('./app');
const pool = require('./config/db');
require('dotenv').config();

const PORT = process.env.port || 3002;

async function startServer() {
    try {
        const [rows] = await pool.query('SELECT 1');

        console.log('Database Connected');
        console.log(rows);

        app.listen(PORT, () => {
            console.log(`Server is running on the address http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Database Connection error');
        console.log(error);
    }
}

startServer();