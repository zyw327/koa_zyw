const Koa = require('koa'),
KeyGrip = require("keygrip");
const app = new Koa();
const router = require('koa-router')();
Application = require('../library/zyw/app');
const views = require('koa-views');
const koaBody = require('koa-body');
const path = require('path');

const render = require('koa-ejs');


var application = new Application();

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.keys = ['abcdrfghigk', 'abcdrfghigk'];
app.keys = new KeyGrip(['abcdrfghigk', 'abcdrfghigk'], 'sha256');

app.on('error', (err, ctx) =>{
        console.log(err);
    }
);

render(app, {
  root: path.join(__dirname, '/../app/'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});

// app.use(views(path.join(__dirname, '/../app/'), {
//   map: { html: 'ejs' }
// }));

app.use(koaBody());

app.use(require('koa-static')(path.join(__dirname, './static'), {
  maxAge: 365 * 24 * 60 * 60,extensions:true
}));

router.get('/*',async function(ctx, next){
  await application.run(ctx, next);
}).post("/*", async function(ctx, next){
  await application.run(ctx, next);
});

// router.get('/',async function(ctx, next){
//   await application.run(ctx, next);
// });

app.use(router.routes());

app.listen(3000);