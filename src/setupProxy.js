const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware('/ticker/FTP/USDT',
        {
            target: 'https://api.latoken.com/v2',
            changeOrigin: true
        })
    )
}