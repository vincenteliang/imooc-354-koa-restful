const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const app = new koa();
const routing = require('./routes');

app.use(error({
    postFormat: (e,  { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
app.use(bodyparser());
routing(app);

app.listen(3000, () => console.log('程序启动在3000端口'));