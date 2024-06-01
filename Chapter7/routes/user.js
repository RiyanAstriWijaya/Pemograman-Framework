const router = require('express').Router();
const user = require('../controller/user');

router.post('/', user.create);
router.get('/', user.show);
router.get('/tampil/:id', user.showId);
router.put('/:id', user.update);
router.delete('/:id', user.delete);
router.post('/login', user.login);
router.get('/saya', user.token);

module.exports = router