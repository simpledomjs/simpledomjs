var webpack = require('webpack');

var entries = {
    'simpleDom': ['./src/main.js']
};

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
                // preprocess all files with babel to turn ES6 code into ES5 code
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['stage-0', 'es2015'],
                    plugins: [
                        ["transform-react-jsx", { "pragma": "SimpleDom.el" }],
                        "babel-plugin-add-module-exports"
                    ]
                }
            }
        ]
    }
};
