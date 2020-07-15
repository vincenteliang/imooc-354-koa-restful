const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const app = new koa();
const router = new Router();
const usersRouter = new Router({ prefix: '/users' });

// 内存数据库
const db = [{ name: 'user1' }, { name: 'user2' }];

// 获取根目录
router.get('/', (ctx) => {
    ctx.body = '这是主页';
});

// 获取用户列表
usersRouter.get('/', (ctx) => {
    ctx.set('Allow', 'GET', 'POST'); // 设置header
    ctx.body = db;
});

// 新建用户
usersRouter.post('/', (ctx) => {
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
});

// 获取特定id用户
usersRouter.get('/:id', (ctx) => {
    ctx.body = db[ctx.params.id * 1]; // ID*1转换为数字
});

// 修改特定id用户
usersRouter.put('/:id', (ctx) => {
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
});

// 删除特定id用户
usersRouter.delete('/:id', (ctx) => {
    db.splice(ctx.params.id * 1, 1);
    ctx.status = 204;
});

app.use(bodyparser());
app.use(router.routes());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.listen(3000);