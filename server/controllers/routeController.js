const routeService = require('../services/routeService');

class RouteController {
  async createRoute(req, res, next) {
    try {
      const route = await routeService.createRoute(req.body);
      res.status(201).json(route);
    } catch (error) {
      next(error);
    }
  }

  async getRoutes(req, res, next) {
    try {
      const routes = await routeService.getAllRoutes();
      res.json(routes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RouteController();