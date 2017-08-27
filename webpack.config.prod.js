const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');


module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.join(__dirname, '/src/index')
    },
    output: {
        filename: '[name]-[hash].min.js',
        path: path.join(__dirname, 'docs'),
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV_TOOLS__: false,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            GA_TRACKING_CODE: JSON.stringify('UA-83365221-2')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.template.html'
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules', 'components')],
            query: {
                "presets": ["react", "es2015"],
                "plugins": [
                    ["transform-class-properties"],
                    ["transform-object-rest-spread"],
                    ["transform-object-assign"]

                ]
            }
        }, {
            test: /\.svg$/,
            use: [{
                loader: 'babel-loader',
                query: {
                    "presets": ["react", "es2015"]
                },
            }, 'svg-react-loader']
        }]
    }
};