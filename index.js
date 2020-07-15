const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const app = new koa();
const router = new Router();
const usersRouter = new Router({ prefix: '/users' });

router.get('/', (ctx) => {
    ctx.body = '这是主页';
});

usersRouter.get('/', (ctx) => {
    ctx.body = [{ name: 'user1' }, { name: 'user2' }];
});

usersRouter.post('/', (ctx) => {
    ctx.body = { name: 'user' };
});

usersRouter.get('/:id', (ctx) => {
    ctx.body = { name: ctx.params.id };
});

usersRouter.put('/:id', (ctx) => {
    ctx.body = { name: ctx.params.id };
});

usersRouter.delete('/:id', (ctx) => {
    ctx.status = 204;
});

app.use(bodyparser());
app.use(router.routes());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.listen(3000);