let router = require('express').Router();
let dashboardController = require('../controllers/DashboardController');

router.get('/', dashboardController.userList);

module.exports = router;