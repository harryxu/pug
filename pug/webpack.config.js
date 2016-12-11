var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DashboardPlugin = require('webpack-dashboard/plugin');

var env = process.env.NODE_ENV || 'development';
var fileEnv = {production: 'production', development: 'local'}[env];
var isdev = env == 'development';


var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.' + fileEnv + '.js'),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
    })
];

if (isdev) {
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ])
}
else {
    plugins = plugins.concat([
        new ExtractTextPlugin('css/designer.css', {
            allChunks: true
        })
    ]);
}

var loaders = [
    {
        test: /\.jsx?$/,
        loaders: isdev ? ['react-hot', 'babel'] : ['babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
    }
];

if (isdev) {
    loaders.push(
        {
            test: /\.scss$/,
            loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
        },

        {
            test: /[\.png|\.jpg|\.gif]$/,
            loader: 'file?name=[path][name].[ext]'
        }
    );
}
else {
    loaders.push(
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css?-url!sass')
        }

    );
}

var config = {
    devtool: 'eval',
    entry: {
        app: isdev ?
            [
                'webpack-dev-server/client?http://localhost:8019',
                'webpack/hot/only-dev-server',
                './src/pug'
            ]
            : './src/pug',

        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'redux',
            'redux-thunk',
            'react-redux'
        ]
    },

    output: {
        path: path.join(__dirname, '../public'),
        filename: 'js/[name].' + fileEnv + '.js',
        publicPath: 'http://localhost:8019/static/'
    },

    plugins: plugins,

    module: {
        loaders: loaders
    }
};

module.exports = config;
