const Koa = require('koa');
const KeyGrip = require('keygrip');
const app = new Koa();
const router = require('koa-router')();
const Application = require('../library/zyw/app');
// const session = require('koa-session');
const koaBody = require('koa-body');
const path = require('path');
const cors = require('koa-cors');
const config = require('../app/config/config');
// const views = require('koa-views');
// const render = require('koa-ejs');
const render = require('../library/zyw/render');
const convert = require('koa-convert');

let application = new Application();
app.use(convert(cors()));
app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.keys = ['abcdrfghigk', 'abcdrfghigk'];
app.keys = new KeyGrip(['abcdrfghigk', 'abcdrfghigk'], 'sha256');
// const CONFIG = {
//   key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
//   maxAge: 86400000,
//   overwrite: true, /** (boolean) can overwrite or not (default true) */
//   httpOnly: true, /** (boolean) httpOnly or not (default true) */
//   signed: true, /** (boolean) signed or not (default true) */
//   rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
// };
// app.use(session(CONFIG, app));
app.on('error', (err, ctx) =>{
        console.log(err);
    }
);

render(app, {
  root: path.join(__dirname, '/../app/'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});

app.use(koaBody());

app.use(require('koa-static')(path.join(__dirname, './static'), {
  maxAge: 365 * 24 * 60 * 60, extensions: true
}));

router.all('/*', async function(ctx, next) {
  await application.run(ctx, next);
});

// router.get('/*',async function(ctx, next){
//   await application.run(ctx, next);
// }).post('/*', async function(ctx, next){
//   await application.run(ctx, next);
// });

app.use(router.routes());
app.listen(config.server.port);
