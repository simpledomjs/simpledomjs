var webpack = require('webpack');

var entries = {
    'simpleDom': ['./src/main.js']
};

var devOnlyPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

var plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    );
} else if (process.env.NODE_ENV === 'dev') {
    plugins = devOnlyPlugins.concat(plugins);
}

module.exports = {
    output: {
        path: './dist/',
        filename: '[name].js',
        library: 'SimpleDom',
        libraryTarget: 'umd'
    },
    entry: entries,
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?stage=0&optional=runtime&jsxPragma=SimpleDom.el'
            }
        ]
    },
    plugins: plugins
};
