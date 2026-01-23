const express = require('express');
const router = express.Router();
const storageUnitController = require('../controllers/storageUnitController');

router.post('/', storageUnitController.createStorageUnit);
router.get('/', storageUnitController.getStorageUnits);

module.exports = router;