import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (argv) => {
    return ({
        stats: 'minimal',
        entry: './src/index.ts',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },

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

        devtool: argv.mode === 'development' ? 'source-source-map' : undefined,

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
                    test: /\.[t]s(x)?$/,
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
