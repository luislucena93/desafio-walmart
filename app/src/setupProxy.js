const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const target = process.env.PROXY_API || 'http://node-api:3003';
  app.use('/api/**', createProxyMiddleware({ target, changeOrigin: true }));
};
