const router = require('express').Router();
const product = require('./product');
const customer = require('./customer');
const transaksi = require('./transaksi');
const dashboard = require('./dashboard')

router.use('/product', product);
router.use('/customer', customer);
router.use('/transaksi', transaksi);
router.use('/dashboard', dashboard);

module.exports = router