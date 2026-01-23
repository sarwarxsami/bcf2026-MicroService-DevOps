const { Location } = require('../models');
const { validateLocation } = require('../utils/validators');

class LocationService {
  async createLocation(data) {
    // Validate input
    const { error, value } = validateLocation(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Create location
    const location = await Location.create(value);
    return location;
  }

  async getAllLocations() {
    const locations = await Location.findAll();
    return locations;
  }

  async getLocationById(id) {
    const location = await Location.findById(id);
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
  }
}

module.exports = new LocationService();