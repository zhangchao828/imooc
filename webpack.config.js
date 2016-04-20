var webpack = require('webpack');
var path = require('path');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var getPxToRemoptions=function(){
    var propWhiteList=[
        'width',
        'margin','margin-right','margin-left','margin-top','margin-bottom',
        'padding','padding-right','padding-left','padding-top','padding-bottom',
        'top','left','right','bottom'
    ];
    return {
        /*
         rootValue,取决于设计稿是按照什么设备的尺寸来设计的，
         那这就是对应于为该尺寸媒体查询@media的那个html font-size值
         */
        rootValue: 23.5,
        unitPrecision: 5,//保留几位小数点
        propWhiteList: propWhiteList,
        selectorBlackList: [],
        replace: true,
        /*
         在media中的px是否也进行转换:
         @media only screen and (min-width: 1080px)
         */
        mediaQuery: false,
        minPixelValue: 0
    };
}
//var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var plugins = [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"])
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    //单独打包css文件，然后以link形式引入,可以加第二个参数{allChunks: true}表示合并多个css文件
    //new ExtractTextPlugin("index.css"),
    new webpack.optimize.DedupePlugin(),//去除重复引入的js代码
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    })
];
var config = {
    entry: {
        app: [
            //'webpack-dev-server/client?http://localhost:3000',
            //'webpack/hot/only-dev-server',
            'babel-polyfill',//为了能支持async,await,Generator
            './client/app/app'
        ],
        gl: ['babel-polyfill', './client/app/gl']
    },
    output: {
        path: path.join(__dirname, 'client/public/dist'),
        publicPath: 'http://localhost:3000/client/public/',
        filename: '[name].min.js'
    },
    watch:true,
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
            //exclude: /node_modules/,
            loader: "style!css!postcss"
        }, {
            test: /\.(png|jpg|svg|gif|jpeg)$/,
            loader: 'url?limit=10000'
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url?limit=100000'
        }]
    },
    //postCss插件
    postcss: [
        //可以像sass那样写postcss
        require('precss')(),
        //require('cssnext')(),//试用未来的css语法
        require('cssnano')(),//优化和压缩css代码
        //require('postcss-alias')(),//设置css属性别名如：@alias {w:width;h:height;}
        require('autoprefixer')({browsers: ['last 2 versions']}),
        //移动端web一般才会需要这个
        //require('postcss-pxtorem')(getPxToRemoptions())
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.css', '.jsx']
        //alias: {
        //    'react':path.resolve(nodeModulesPath,'react/dist/react.js'),
        //    'react-dom':path.resolve(nodeModulesPath,'react-dom/dist/react-dom.js'),
        //    'immutable':path.resolve(nodeModulesPath,'immutable/dist/immutable.js')
        //}
    },
    //devServer: {
    //    historyApiFallback: true,
    //    contentBase: '',  //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
    //    noInfo: true, //  --no-info option
    //    hot: true,        //自动刷新
    //    inline: true,
    //    port: 3000,
    //    progress: true
    //},
    //externals:{
    //    'jquery':'jQuery'//CDN
    //},
    //devtool: 'eval-source-map',
    devtool: 'source-map',
    plugins: plugins
};
module.exports = config;