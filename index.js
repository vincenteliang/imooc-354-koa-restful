const koa = require('koa');
const Router = require('koa-router')
const app = new koa();
const router = new Router();
const usersRouter = new Router({ prefix: '/users' })

const auth = async (ctx, next) => {
    // 错误前置
    if (ctx.url !== 'users') {
        ctx.throw(401);
    }
    await next();
}

router.get('/', auth, (ctx) => {
    ctx.body = '这是主页';
})

usersRouter.get('/', auth, (ctx) => {
    ctx.body = '这是用户列表';
})

usersRouter.post('/', auth, (ctx) => {
    ctx.body = '创建用户';
})

usersRouter.get('/:id', auth, (ctx) => {
    ctx.body = `这是用户 ${ctx.params.id}`;
})

app.use(router.routes());
app.use(usersRouter.routes());

app.listen(3000);