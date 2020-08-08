const jsonwebtoken = require('jsonwebtoken');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
    find, findById, create, update,
    delete: del, login, checkOwner
} = require('../controllers/users');

const { secret } = require('../config');

const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header; // 短路语法，默认为空字符串
    const token = authorization.replace('Bearer ', '');
    try {
        const user = jsonwebtoken.verify(token, secret);
        ctx.state.user = user; // ctx.state通常用来存放用户信息
    } catch (err) {
        ctx.throw(401, err.message);
    }
    await next();
}

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
router.patch('/:id', auth, checkOwner, update); // put 是整体替换， patch 是部分替换
router.delete('/:id', auth, checkOwner, del);
router.post('/login', login);

module.exports = router;