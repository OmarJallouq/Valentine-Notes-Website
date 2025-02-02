const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    console.log("Proxy is being set up..."); // Debugging log

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://bai-valentines.onrender.com',
            changeOrigin: true,
        })
    );
};