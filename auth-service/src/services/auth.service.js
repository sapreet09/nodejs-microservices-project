const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(name, email, password) {
    const [existingUser] = await pool.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
    );

    if(existingUser.length > 0) {
        throw new error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );

    return {
        id: result.insertId,
        name,
        email
    };
}

async function loginUser(email, password) {
    const [users] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if(users.length == 0) {
        throw new Error('Invalid email or password');
    }

    const user = users[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
        throw new Error('Invalid email or Password');
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

module.exports = {
    registerUser,
    loginUser
};