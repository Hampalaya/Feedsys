import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT id, username, full_name, role, email, is_active FROM users WHERE username = ?',
      [username]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    if (!user.is_active) {
      return res.status(401).json({ error: 'User account is inactive' });
    }

    // TODO: Implement proper password verification with bcrypt
    // For now, returning basic auth response
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// Get current user endpoint (to be implemented with JWT tokens)
router.get('/me', async (req, res) => {
  try {
    // This would verify JWT token in headers
    res.json({ message: 'Implement JWT verification' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
