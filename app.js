const Koa = require('koa');
const app = new Koa();

/* 代理配置 start */
const proxy = require('koa2-proxy-middleware'); //引入代理模块
const options = {
  targets: {
    // (.*) means anything
    '/wx/(.*)': {
      target: 'https://api.weixin.qq.com',
      changeOrigin: true,
    },
  }
}
app.use(
  proxy(options)
);

const bodyparser = require('koa-bodyparser')
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

/* 代理配置 end */
// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
app.listen(8000);
console.log('app started at port 8000...');