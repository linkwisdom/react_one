const Koa = require("koa");
const Router = require("koa-router");
const db = require("./db");
const app = new Koa();
var router = new Router();

router.get("/", function async(ctx, next) {
  return db.queryList().then((list) => {
    console.table(list);
    ctx.body = JSON.stringify(list);
    next();
  });
});

// 响应
app.use(router.routes()); //作用：启动路由

app.listen(8080);
