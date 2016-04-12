var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var plugins = [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'//development
    })
];
var config = {
    entry: {
        app: [
            'babel-polyfill',//为了能支持async,await等es7语法
            './client/app'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'client/public/dist'),
        publicPath: './client/public/',
        filename: '[name].min.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.scss/,
            exclude: /node_modules/,
            loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss"
        }, {
            test: /\.(png|jpg|svg|gif|jpeg)$/,
            loader: 'url?limit=10000'
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url?limit=100000'
        }]
    },
    postcss: [
        require('precss')(),
        //require('cssnext')(),
        require('cssnano')(),
        //require('postcss-alias')(),
        require('autoprefixer')({browsers: ['last 2 versions']})
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.css', '.jsx']
    },
    //externals:{
    //    'jquery':'jQuery'//CDN
    //},
    plugins: plugins
};
module.exports = config;