const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// @TODO: Fix sourcemaps on Firefox

module.exports = (argv) => {
    return ({
        stats: 'minimal', // Keep console output easy to read.
        entry: './src/index.ts', // Your program entry point

        output: {
            path: 'dist',
            filename: 'bundle.js'
        },

        // Config for your testing server
        devServer: {
            compress: true,
            allowedHosts: "all", // If you are using WebpackDevServer as your production server, please fix this line!
            static: false,
            client: {
                logging: "warn",
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            },
            port: 3000, host: '0.0.0.0'
        },

        performance: { hints: false },

        devtool: argv.mode === 'development' ? 'source-map' : undefined,

        optimization: {
            minimize: argv.mode === 'production',
            minimizer: [new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: { drop_console: true },
                    output: { comments: false, beautify: false },
                },
            })],
        },


        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js'
            ]
        },

        plugins: [
            new CopyPlugin({
                patterns: [{ from: 'assets', to: 'assets' }],
            }),

            new HtmlWebpackPlugin({
                template: 'src/index.ejs',
                hash: true,
                minify: false
            })
        ]
    });
}
