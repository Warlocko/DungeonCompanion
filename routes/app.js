let router = require('express').Router();
let dashboardController = require('../controllers/DashboardController');

router.get('/dashboard', dashboardController.index);

module.exports = router;
