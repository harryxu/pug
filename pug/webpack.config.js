var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DashboardPlugin = require('webpack-dashboard/plugin');

var env = process.env.NODE_ENV || 'development';
var fileEnv = {production: 'production', development: 'local'}[env];
var isdev = env == 'development';


var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['uilib', 'vendor'],
        filename: 'js/[name].'+fileEnv+'.js'
    }),
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
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}

var loaders = [
    {
        test: /\.jsx?$/,
        loaders: ['babel'],
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
    debug: isdev,
    devtool: isdev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    entry: {
        app: isdev ?
            [
                'webpack-dev-server/client?http://localhost:8019',
                'webpack/hot/only-dev-server',
                './src/pug'
            ]
            : './src/pug.js',

        uilib: [
            'semantic-ui-react',
            'react-codemirror',
            'codemirror/mode/javascript/javascript',
            'codemirror/mode/xml/xml'
        ],

        vendor: [
            "lodash",
            "react",
            "react-dom",
            "react-redux",
            "react-router",
            "react-router-redux",
            "react-select",
            "react-split-pane",
            "redux",
            "redux-thunk",
            "whatwg-fetch"
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
