import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT id, username, full_name, role, email, is_active, created_at FROM users');
    connection.release();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT id, username, full_name, role, email, is_active, created_at FROM users WHERE id = ?', [id]);
    connection.release();
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { username, password, full_name, role, email } = req.body;

    if (!username || !password || !full_name || !role || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    
    // Check if username already exists
    const [existing] = await connection.query('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'Username already exists' });
    }

    // TODO: Hash password with bcrypt before storing
    const [result] = await connection.query(
      'INSERT INTO users (username, password, full_name, role, email, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())',
      [username, password, full_name, role, email]
    );
    connection.release();

    res.status(201).json({
      id: result.insertId,
      username,
      full_name,
      role,
      email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, role, email, is_active } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE users SET full_name = ?, role = ?, email = ?, is_active = ?, updated_at = NOW() WHERE id = ?',
      [full_name, role, email, is_active, id]
    );
    connection.release();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
