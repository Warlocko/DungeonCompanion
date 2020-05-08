let router = require('express').Router();
let dashboardController = require('../controllers/DashboardController');

router.get('/dashboard', dashboardController.index);
router.get('/campaign/:cmpid', dashboardController.map);
router.get('/campaign/:cmpid/event/:evid', dashboardController.event)
router.get('/campaign/:cmpid/event/:evid/create-form', dashboardController.ansevent);
router.get('/campaign/:cmpid/event-form', dashboardController.frmevent)
router.get('/dashboard/create-campaign', dashboardController.cmpmap);
router.get('/campaign/:cmpid/player-form',dashboardController.newplayer);
router.get('/campaign/:cmpid/answer-view',dashboardController.allevents);
router.post('/campaign/:cmpid/player-invite',dashboardController.addplayer);
router.post('/dashboard/:cmpid/crevent', dashboardController.newevent);
router.post('/dashboard/create-campaign', dashboardController.newcampaign);
router.post('/campaign/:cmpid/event/:evid/send', dashboardController.anseventsend);
router.get('/profile/:id', dashboardController.profile);
router.get('/profile/:id/addAdventurer', dashboardController.addplayerDM);
router.post('/profile/:id/addAdventurer', dashboardController.newAdventurer);
router.get('/bestiary', dashboardController.bestiary);
router.get('/bestiary/:index', dashboardController.beast);

module.exports = router;
