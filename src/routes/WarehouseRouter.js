const express = require("express");
const router = express.Router()
const WarehouseController = require('../controllers/WarehouseController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create-element', WarehouseController.createElement)
router.put('/update-element/:id',  WarehouseController.updateElement)
router.get('/get-details-element/:id', WarehouseController.getDetailsElement)
router.delete('/delete-element/:id',  WarehouseController.deleteElement)
router.get('/get-all-element', WarehouseController.getAllElement)

module.exports = router