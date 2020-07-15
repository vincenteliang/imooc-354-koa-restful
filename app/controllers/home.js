class HomeCtl {
    index(ctx) {
        ctx.body = '<h1>This is home page.</h1>'
    }
}

module.exports = new HomeCtl();