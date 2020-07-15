const db = [{ name: 'user1' }, { name: 'user2' }];

class UsersCtl {
    find(ctx) {
        ctx.body = db;
    }
    findById(ctx) {
        ctx.body = db[ctx.params.id * 1];
    }
    create(ctx) {
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    delete(ctx) {
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();