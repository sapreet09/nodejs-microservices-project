const taskService = require('../services/task.service');

async function createTask(req, res) {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        if(!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        const task = await taskService.createTask(userId, title, description);

        return res.status(200).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getMyTasks(req, res) {
    try {
        const userId = req.user.id;

        const tasks = await taskService.getMyTasks(userId);

        return res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getTaskById(req, res) {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;

        const task = await taskService.getTaskById(userId, taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Task fetched successfully',
            data: task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateTask(req, res) {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;
        const { title, description, status } = req.body;

        if (!title || !status) {
            return res.status(400).json({
                success: false,
                message: 'Title and status are required'
            });
        }

        const affectedRows = await taskService.updateTask(
            userId,
            taskId,
            title,
            description,
            status
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteTask(req, res) {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;

        const affectedRows = await taskService.deleteTask(userId, taskId);

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createTask,
    getMyTasks,
    getTaskById,
    updateTask,
    deleteTask
}