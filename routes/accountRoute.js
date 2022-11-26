const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController')

router.post('/addRecipients', accountController.addRecipients);
router.get('/getRecipients', accountController.getRecipients);
router.get('/getRecipient', accountController.getRecipient);


module.exports = router;