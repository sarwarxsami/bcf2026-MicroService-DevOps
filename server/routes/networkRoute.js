const express = require('express');
const router = express.Router();
const networkController = require('../controllers/NetworkController');

router.get('/summary', networkController.getNetworkSummary);
router.post('/validate', networkController.validateNetwork);

module.exports = router;