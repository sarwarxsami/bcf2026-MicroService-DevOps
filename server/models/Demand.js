const db = require('../config/database');

class Demand {
  static async create({ location_id, product_id, date, min_quantity, max_quantity }) {
    const query = `
      INSERT INTO demands (location_id, product_id, date, min_quantity, max_quantity)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, location_id, product_id, date, min_quantity, max_quantity, created_at
    `;
    const values = [location_id, product_id, date, min_quantity, max_quantity];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT id, location_id, product_id, date, min_quantity, max_quantity, created_at
      FROM demands ORDER BY created_at
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async findByDate(date) {
    const query = `
      SELECT d.*, p.min_temperature as product_min_temp, 
             p.max_temperature as product_max_temp,
             l.type as location_type
      FROM demands d
      JOIN products p ON d.product_id = p.id
      JOIN locations l ON d.location_id = l.id
      WHERE d.date = $1
    `;
    const result = await db.query(query, [date]);
    return result.rows;
  }

  static async findByLocationAndDate(locationId, date) {
    const query = 'SELECT * FROM demands WHERE location_id = $1 AND date = $2';
    const result = await db.query(query, [locationId, date]);
    return result.rows;
  }
}

module.exports = Demand;