const express = require('express');
const router = express.Router();
const demandController = require('../controllers/demandController');

router.post('/', demandController.createDemand);
router.get('/', demandController.getDemands);

module.exports = router;