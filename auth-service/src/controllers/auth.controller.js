const authService = require('../services/auth.service');

async function register(req, res) {
    try {
        const {name, email, password } = req.body;

        const user = await authService.registerUser(name, email, password);

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required'
            });
        }

        const result = await authService.loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
};