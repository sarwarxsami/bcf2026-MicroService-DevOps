const networkService = require('../services/networkService');

class NetworkController {
  async getNetworkSummary(req, res, next) {
    try {
      const summary = await networkService.getNetworkSummary();
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async validateNetwork(req, res, next) {
    try {
      const { date } = req.body;
      const result = await networkService.validateNetwork(date);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NetworkController();