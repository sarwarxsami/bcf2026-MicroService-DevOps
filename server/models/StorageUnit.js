const db = require('../config/database');

class StorageUnit {
  static async create({ location_id, min_temperature, max_temperature, capacity }) {
    const query = `
      INSERT INTO storage_units (location_id, min_temperature, max_temperature, capacity)
      VALUES ($1, $2, $3, $4)
      RETURNING id, location_id, min_temperature, max_temperature, capacity, created_at
    `;
    const values = [location_id, min_temperature, max_temperature, capacity];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT id, location_id, min_temperature, max_temperature, capacity, created_at
      FROM storage_units ORDER BY created_at
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async findByLocationId(locationId) {
    const query = `
      SELECT id, location_id, min_temperature, max_temperature, capacity
      FROM storage_units WHERE location_id = $1
    `;
    const result = await db.query(query, [locationId]);
    return result.rows;
  }

  static async findByWarehouseId(warehouseId) {
    const query = `
      SELECT su.*, l.id as warehouse_id
      FROM storage_units su
      JOIN locations l ON su.location_id = l.id
      WHERE l.type = 'WAREHOUSE' AND l.id = $1
    `;
    const result = await db.query(query, [warehouseId]);
    return result.rows;
  }
}

module.exports = StorageUnit;