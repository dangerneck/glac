var path = require("path");

module.exports = {
    output: {
        path: path.join(__dirname, "dist"),
        library: "[name]",
        libraryTarget: "commonjs2",
        filename: "[name].js"
    },
    target: "node",
    entry: './app.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['stage-2'],
                    plugins: ['syntax-flow', 'transform-flow-strip-types']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};