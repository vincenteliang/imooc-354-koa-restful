const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const { find, findById, create, update, delete: del, login } = require('../controllers/users');

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
router.patch('/:id', update); // put 是整体替换， patch 是部分替换
router.delete('/:id', del);
router.post('/login', login);

module.exports = router;