const db = require('./db'); // Assuming db is the database connection file

class UserController {
  // Create a new user
  async createUser(req, res) {
    const { name, surname } = req.body;
    try {
      const newPerson = await db.query(
        'INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *',
        [name, surname]
      );
      console.log(name, surname);
      res.json(newPerson.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    }
  }

  // Get all users
  async getUsers(req, res) {
    try {
      const users = await db.query('SELECT * FROM person');
      res.json(users.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
    }
  }

  // Get a single user by ID
  async getOneUser(req, res) {
    const { id } = req.params;
    try {
      const user = await db.query('SELECT * FROM person WHERE id = $1', [id]);
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching user');
    }
  }

  // Update a user
  async updateUser(req, res) {
    const { id, name, surname } = req.body;
    try {
      const user = await db.query(
        'UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *',
        [name, surname, id]
      );
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating user');
    }
  }

  // Delete a user
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await db.query('DELETE FROM person WHERE id = $1 RETURNING *', [id]);
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
    }
  }
}

module.exports = new UserController();
