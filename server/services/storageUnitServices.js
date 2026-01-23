const { StorageUnit, Location } = require('../models');
const { validateStorageUnit } = require('../utils/validators');

class StorageUnitService {
  async createStorageUnit(data) {
    const { error, value } = validateStorageUnit(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Validate temperature range
    if (value.max_temperature <= value.min_temperature) {
      throw new Error('maxTemperature must be greater than minTemperature');
    }

    // Check if location exists and is a warehouse
    const location = await Location.findById(value.location_id);
    if (!location) {
      throw new Error('Location not found');
    }

    if (location.type !== 'WAREHOUSE') {
      throw new Error('Storage units can only be created for WAREHOUSE locations');
    }

    const storageUnit = await StorageUnit.create(value);
    return storageUnit;
  }

  async getAllStorageUnits() {
    const storageUnits = await StorageUnit.findAll();
    return storageUnits;
  }
}

module.exports = new StorageUnitService();