const storageUnitService = require('../services/storageUnitService');

class StorageUnitController {
  async createStorageUnit(req, res, next) {
    try {
      const storageUnit = await storageUnitService.createStorageUnit(req.body);
      res.status(201).json(storageUnit);
    } catch (error) {
      next(error);
    }
  }

  async getStorageUnits(req, res, next) {
    try {
      const storageUnits = await storageUnitService.getAllStorageUnits();
      res.json(storageUnits);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StorageUnitController();