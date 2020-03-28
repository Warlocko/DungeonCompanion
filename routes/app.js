let router = require('express').Router();
let dashboardController = require('../controllers/DashboardController');

router.get('/dashboard', dashboardController.index);
router.get('/campaign/*', dashboardController.map);

module.exports = router;
