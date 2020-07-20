const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new koa();
const routing = require('./routes');

// 这种方法并不能捕获404报错
app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        ctx.status = err.status || err.statusCode || 500;
        ctx.body = {
            message: err.message
        }
    }
});

app.use(bodyparser());
routing(app);

app.listen(3000, () => console.log('程序启动在3000端口'));