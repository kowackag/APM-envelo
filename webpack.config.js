const path = require('path');
// importuję bibliotękę [path] z [node.js]
const HtmlWebpackPlugin = require('html-webpack-plugin');
// importuję odpowiedni plugin
module.exports = {
    entry: ['whatwg-fetch', './src/js/script.js'],
    // definiuje pliki wejściowe
    // posiadające swoje identyfikatory [chunks]
    output: {
        path: path.resolve(__dirname, 'build'),
        // definiuje ścieżką wyjściową
        filename: '[name].min.js',
        // definiuję nazwę pliku wyjściowego
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
                test: /\.js$/,
                // określam jakie pliki 
                // będą brane pod uwagę
                exclude: /node_modules/,
                // określam wykluczenia
                use: 'babel-loader',
                // określam jaki [loader]
                // ma być wykorzystany
            },
            {
                test: /\.css$/i,
                // określam jakie pliki 
                // będą brane pod uwagę
                exclude: /node_modules/,
                // określam wykluczenia
                use: ['style-loader', 'css-loader'],
                // określam jaki [loader]
                // ma być wykorzystany
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // wskazuje plik źródłowy
            filename: 'index.html',
            // określan nazwę dla pliku
        })
    ]
}
// eksportuję ustawienia dla webpack-a