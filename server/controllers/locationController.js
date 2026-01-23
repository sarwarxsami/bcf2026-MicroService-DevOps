const locationService = require('../services/locationService');

class LocationController {
  async createLocation(req, res, next) {
    try {
      const location = await locationService.createLocation(req.body);
      res.status(201).json(location);
    } catch (error) {
      next(error);
    }
  }

  async getLocations(req, res, next) {
    try {
      const locations = await locationService.getAllLocations();
      res.json(locations);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LocationController();