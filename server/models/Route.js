const db = require('../config/database');

class Route {
  static async create({ from_location_id, to_location_id, capacity, min_shipment }) {
    const query = `
      INSERT INTO routes (from_location_id, to_location_id, capacity, min_shipment)
      VALUES ($1, $2, $3, $4)
      RETURNING id, from_location_id, to_location_id, capacity, min_shipment, created_at
    `;
    const values = [from_location_id, to_location_id, capacity, min_shipment];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT id, from_location_id, to_location_id, capacity, min_shipment, created_at
      FROM routes ORDER BY created_at
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async findByToLocationId(locationId) {
    const query = `
      SELECT r.*, l.type as from_location_type
      FROM routes r
      JOIN locations l ON r.from_location_id = l.id
      WHERE r.to_location_id = $1
    `;
    const result = await db.query(query, [locationId]);
    return result.rows;
  }

  static async findByFromLocationId(locationId) {
    const query = 'SELECT * FROM routes WHERE from_location_id = $1';
    const result = await db.query(query, [locationId]);
    return result.rows;
  }

  static async findIncomingRoutesToWarehouse(warehouseId) {
    const query = `
      SELECT r.id, r.capacity
      FROM routes r
      WHERE r.to_location_id = $1
      AND EXISTS (
        SELECT 1 FROM locations l 
        WHERE l.id = r.from_location_id AND l.type = 'PRODUCER'
      )
    `;
    const result = await db.query(query, [warehouseId]);
    return result.rows;
  }
}

module.exports = Route;