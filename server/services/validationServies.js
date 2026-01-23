const { Demand, Route, StorageUnit } = require('../models');

class ValidationService {
  async validateTemperatures(date) {
    const issues = [];
    
    // Get all demands for the date
    const demands = await Demand.findByDate(date);
    
    if (!demands || demands.length === 0) {
      return { valid: true };
    }

    for (const demand of demands) {
      // Find routes to this demand location
      const warehouseRoutes = await Route.findByToLocationId(demand.location_id);
      const validWarehouseRoutes = warehouseRoutes.filter(route => 
        route.from_location_type === 'WAREHOUSE'
      );

      if (!validWarehouseRoutes || validWarehouseRoutes.length === 0) {
        issues.push(`No warehouse route found for demand ${demand.id} at location ${demand.location_id}`);
        continue;
      }

      // Check if any warehouse has compatible storage unit
      let compatible = false;
      
      for (const route of validWarehouseRoutes) {
        const warehouseId = route.from_location_id;
        const storageUnits = await StorageUnit.findByLocationId(warehouseId);

        for (const storageUnit of storageUnits) {
          // Check if product temperature range is fully within storage unit range
          if (demand.product_min_temp >= storageUnit.min_temperature &&
              demand.product_max_temp <= storageUnit.max_temperature) {
            compatible = true;
            break;
          }
        }

        if (compatible) break;
      }

      if (!compatible) {
        issues.push(
          `Product ${demand.product_id} temperature range ` +
          `(${demand.product_min_temp}°C to ${demand.product_max_temp}°C) ` +
          `not compatible with any storage unit for demand ${demand.id}`
        );
      }
    }

    return {
      valid: issues.length === 0,
      issues: issues.length > 0 ? issues : undefined
    };
  }
}

module.exports = new ValidationService();