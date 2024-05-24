const router = require('express').Router();
const dashboard = require('../controllers/dashboard');

router.get('/', dashboard.dashboard);

module.exports = router