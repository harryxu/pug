var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var proxyTarget = require('./proxy');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: path.join(__dirname, '../public'),
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/api/*': {
            target: require('./proxy'),
            secure: false
        }
    }
}).listen(8019, 'localhost', function (err, result) {
        if (err) {
            return console.log(err);
        }

        console.log('Listening at http://localhost:8019/');
    });
