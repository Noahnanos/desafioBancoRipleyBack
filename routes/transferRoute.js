const express = require('express');
const router = express.Router();

const transferController = require('../controllers/transferController')

router.post('/makeTransfer', transferController.makeTransfer);
router.get('/getTransfers', transferController.getTransfer);

module.exports = router;