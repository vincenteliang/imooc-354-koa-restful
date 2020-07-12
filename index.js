const koa = require('koa');
const app = new koa();

app.use(async (ctx) => {
    if (ctx.url === '/') {
        ctx.body = '这是主页'
    } else if (ctx.url === '/users') {
        if (ctx.method === 'GET') {
            ctx.body = '获取用户';
        } else if (ctx.method === 'POST') {
            ctx.body = '创建用户';
        } else {
            ctx.status = 405;
        }
    } else if (ctx.url.match(/\/users\/\w+/)) {
        // match方法返回一个数组，0号元素是url本身，1号为小括号里的内容
        const userId = ctx.url.match(/\/users\/(\w+)/)[1];
        ctx.body = `这是用户 ${userId}`
    } else {
        ctx.status = 404;
    }
});

app.listen(3000);