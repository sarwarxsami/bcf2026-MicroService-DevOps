const demandService = require('../services/demandService');

class DemandController {
  async createDemand(req, res, next) {
    try {
      const demand = await demandService.createDemand(req.body);
      res.status(201).json(demand);
    } catch (error) {
      next(error);
    }
  }

  async getDemands(req, res, next) {
    try {
      const demands = await demandService.getAllDemands();
      res.json(demands);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DemandController();