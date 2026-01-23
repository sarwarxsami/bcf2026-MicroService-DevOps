const db = require('../config/database');

class Location {
  static async create({ name, type, city }) {
    const query = `
      INSERT INTO locations (name, type, city)
      VALUES ($1, $2, $3)
      RETURNING id, name, type, city, created_at
    `;
    const values = [name, type, city];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT id, name, type, city, created_at FROM locations ORDER BY created_at';
    const result = await db.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT id, name, type, city FROM locations WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByType(type) {
    const query = 'SELECT id, name, type, city FROM locations WHERE type = $1';
    const result = await db.query(query, [type]);
    return result.rows;
  }
}

module.exports = Location;