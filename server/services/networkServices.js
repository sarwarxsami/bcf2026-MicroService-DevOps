const { Demand, Route, StorageUnit, Location } = require('../models');

class NetworkService {
  async getNetworkSummary() {
    const [locations, products, storageUnits, routes, demands] = await Promise.all([
      Location.findAll(),
      Product.findAll(),
      StorageUnit.findAll(),
      Route.findAll(),
      Demand.findAll()
    ]);

    return {
      locations,
      products,
      storageUnits,
      routes,
      demands
    };
  }

  async validateNetwork(date) {
    const issues = [];
    
    // Get all demands for the date
    const demands = await Demand.findByDate(date);
    
    if (!demands || demands.length === 0) {
      return { feasible: true };
    }

    // Group demands by location
    const locationDemands = {};
    for (const demand of demands) {
      if (!locationDemands[demand.location_id]) {
        locationDemands[demand.location_id] = {
          total_min: 0,
          total_max: 0,
          type: demand.location_type
        };
      }
      locationDemands[demand.location_id].total_min += demand.min_quantity;
      locationDemands[demand.location_id].total_max += demand.max_quantity;
    }

    // Check route capacity violations
    const routes = await Route.findAll();
    
    for (const route of routes) {
      if (locationDemands[route.to_location_id]) {
        const demandInfo = locationDemands[route.to_location_id];
        
        // Check min shipment violation
        if (demandInfo.total_min < route.min_shipment) {
          issues.push(
            `MIN_CAPACITY_VIOLATION: Route ${route.id} requires min shipment ` +
            `of ${route.min_shipment}, but total demand is ${demandInfo.total_min}`
          );
        }
        
        // Check max capacity violation
        if (demandInfo.total_max > route.capacity) {
          issues.push(
            `MAX_CAPACITY_VIOLATION: Route ${route.id} has capacity ` +
            `${route.capacity}, but total demand could be ${demandInfo.total_max}`
          );
        }
      }
    }

    // Check storage unit capacity violations
    const warehouses = await Location.findByType('WAREHOUSE');
    
    for (const warehouse of warehouses) {
      const storageUnits = await StorageUnit.findByWarehouseId(warehouse.id);
      
      for (const storageUnit of storageUnits) {
        const incomingRoutes = await Route.findIncomingRoutesToWarehouse(warehouse.id);
        const totalIncomingCapacity = incomingRoutes.reduce((sum, route) => sum + route.capacity, 0);
        
        if (totalIncomingCapacity > storageUnit.capacity) {
          issues.push(
            `MAX_CAPACITY_VIOLATION: Storage unit ${storageUnit.id} has capacity ` +
            `${storageUnit.capacity}, but total incoming route capacity is ${totalIncomingCapacity}`
          );
        }
      }
    }

    return {
      feasible: issues.length === 0,
      issues: issues.length > 0 ? issues : undefined
    };
  }
}

module.exports = new NetworkService();