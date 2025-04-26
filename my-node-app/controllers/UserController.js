const db = require('../config/db');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { name, phone } = req.body;
  const query = 'INSERT INTO users (name, phone) VALUES (?, ?)';
  db.query(query, [name, phone], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ id: results.insertId, name, phone });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'User deleted successfully' });
  });
};
