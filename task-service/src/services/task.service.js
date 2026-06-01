const pool = require('../config/db');

async function createTask(userId, title, description) {
    const [result] = await pool.query(
        'INSERT INTO tasks (user_id, title, description) VALUE (?, ?, ?)',
        [userId, title, description]
    );

    return {
        id: result.insertId,
        user_id: userId,
        title,
        description,
        status: 'pending'
    };
}

async function getMyTasks(userId) {
    const [tasks] = await pool.query(
        'SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE user_id = ? ORDER BY id DESC',
        [userId]
    );

    return tasks;
}

async function getTaskById(userId, taskId) {
    const [tasks] = await pool.query(
        'SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, userId]
    );

    return tasks[0];
}

async function updateTask(userId, taskId, title, description, status) {
    const [result] = await pool.query(
        `UPDATE tasks 
         SET title = ?, description = ?, status = ?
         WHERE id = ? AND user_id = ?`,
        [title, description, status, taskId, userId]
    );

    return result.affectedRows;
}

async function deleteTask(userId, taskId) {
    const [result] = await pool.query(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, userId]
    );

    return result.affectedRows;
}

module.exports = {
    createTask,
    getMyTasks,
    getTaskById,
    updateTask,
    deleteTask
};