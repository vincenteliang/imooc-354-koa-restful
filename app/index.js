const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const app = new koa();
const routing = require('./routes');

app.use(error({
    postFormat: (e,  { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
app.use(bodyparser());
app.use(parameter(app)); // 传入app，可以在ctx中加入方法，全局使用
routing(app);

app.listen(3000, () => console.log('程序启动在3000端口'));