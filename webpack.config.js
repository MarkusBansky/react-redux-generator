let webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'react-redux-api-generator.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "#!/usr/bin/env node", raw: true
        })
    ],
    node: {
        fs: 'empty'
    }
};