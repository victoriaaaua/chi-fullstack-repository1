const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            publicPath: '/'
        },
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        
        
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude:/node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                
                {   
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                
                    {
                        test: /\.(gif|svg|jpg|png)$/,  
                        use: ["file-loader"]
                      }
                
            ],
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({ template: './public/index.html' }),
            new CleanWebpackPlugin(),
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'] 
        },
        devServer: {
            historyApiFallback: true,
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            open: true,
            hot: true,
            port: 8080,
        },
        optimization: {
            splitChunks: {
                chunks: 'all', 
            },
            minimize: true,
        }
    };
};
