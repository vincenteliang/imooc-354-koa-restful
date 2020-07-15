const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
// delete是关键字，需要起个别名
const { find, findById, create, update, delete: del } = require('../controllers/users');

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;