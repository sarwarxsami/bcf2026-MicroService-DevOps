const validationService = require('../services/validationService');

class ValidationController {
  async validateTemperatures(req, res, next) {
    try {
      const { date } = req.body;
      const result = await validationService.validateTemperatures(date);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ValidationController();