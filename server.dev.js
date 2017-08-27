const path = require('path');
const express = require('express');

const port = process.env.PORT || 9000;
const app = express();

configureWebpack(app);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, error => {
    if (error) {
        console.error(error);
    } else {
        console.info('==>  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});


function configureWebpack(app) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config');

    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}
