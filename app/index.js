const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new koa();
const routing = require('./routes');

app.use(bodyparser());
routing(app);

app.listen(3000, () => console.log('程序启动在3000端口'));