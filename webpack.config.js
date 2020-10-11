var path = require('path');
var entries = require('webpack-entries');
var autoprefixer = require('autoprefixer');

// vue
module.exports = {
    entry: entries('./src/*.js', true),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: [
                        'async-to-promises'
                    ]
                }
            }]
        }, {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                    postcss: [autoprefixer({
                        browsers: ['last 7 versions']
                    })],
                    loaders: {
                        'js': 'babel-loader?presets[]=es2015'
                    }
                }
            }]
        }]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'  //不加就會失敗幹你娘不知為啥
        }
    }
};

// react
// module.exports = {
//     entry: './components/all.jsx',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [{
//             test: /\.scss$/,
//             use: [{
//                 loader: 'style-loader'
//             }, {
//                 loader: 'css-loader',
//                 // options: {
//                 //     modules: true
//                 // }
//             }, {
//                 loader: 'autoprefixer-loader',
//                 options: {
//                     browsers: [
//                         'last 2 versions',
//                         'ie >= 9',
//                         'and_chr >= 2.3'
//                     ]
//                 }
//             }, {
//                 loader: 'sass-loader'
//             }]
//         }, {
//             test: /\.jsx$/,
//             use: [{
//                 loader: 'babel-loader',
//                 options: {
//                     presets: ['es2015', 'react']
//                 }
//             }],
//         }]
//     },
// };