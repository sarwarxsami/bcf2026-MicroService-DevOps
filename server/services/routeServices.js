const { Route, Location } = require('../models');
const { validateRoute } = require('../utils/validators');

class RouteService {
  async createRoute(data) {
    const { error, value } = validateRoute(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Validate min shipment doesn't exceed capacity
    if (value.min_shipment > value.capacity) {
      throw new Error('minShipment cannot exceed capacity');
    }

    // Check if locations exist
    const fromLocation = await Location.findById(value.from_location_id);
    const toLocation = await Location.findById(value.to_location_id);

    if (!fromLocation || !toLocation) {
      throw new Error('One or both locations not found');
    }

    // Validate route type combination
    const isValidCombination = this.validateRouteTypes(fromLocation.type, toLocation.type);
    if (!isValidCombination) {
      throw new Error('Invalid route type combination. Valid combinations: PRODUCER→WAREHOUSE, WAREHOUSE→RETAILER, WAREHOUSE→HOSPITAL');
    }

    const route = await Route.create(value);
    return route;
  }

  validateRouteTypes(fromType, toType) {
    const validCombinations = [
      ['PRODUCER', 'WAREHOUSE'],
      ['WAREHOUSE', 'RETAILER'],
      ['WAREHOUSE', 'HOSPITAL']
    ];

    return validCombinations.some(([validFrom, validTo]) => 
      validFrom === fromType && validTo === toType
    );
  }

  async getAllRoutes() {
    const routes = await Route.findAll();
    return routes;
  }
}

module.exports = new RouteService();