let webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.ts'),
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /example/],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'react-redux-api-generator.js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "#!/usr/bin/env node", raw: true
        })
    ],
    node: {
        fs: 'empty',
        __dirname: false,
    }
};