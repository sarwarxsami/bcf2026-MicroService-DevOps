const { Demand, Location, Product } = require('../models');
const { validateDemand } = require('../utils/validators');

class DemandService {
  async createDemand(data) {
    const { error, value } = validateDemand(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Validate quantity range
    if (value.max_quantity < value.min_quantity) {
      throw new Error('maxQuantity must be greater than or equal to minQuantity');
    }

    // Check if location exists
    const location = await Location.findById(value.location_id);
    if (!location) {
      throw new Error('Location not found');
    }

    // Check if product exists
    const product = await Product.findById(value.product_id);
    if (!product) {
      throw new Error('Product not found');
    }

    const demand = await Demand.create(value);
    return demand;
  }

  async getAllDemands() {
    const demands = await Demand.findAll();
    return demands;
  }

  async getDemandsByDate(date) {
    const demands = await Demand.findByDate(date);
    return demands;
  }
}

module.exports = new DemandService();