const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV_TOOLS__: true,
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.template.html'
        }),
        new CaseSensitivePathsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
                "presets": ["react", "es2015"],
                "plugins": [
                    ["react-transform", {
                        "transforms": [{
                            "transform": "react-transform-hmr",
                            "imports": ["react"],
                            "locals": ["module"]
                        }]
                    }],
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