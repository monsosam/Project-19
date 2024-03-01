const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Set mode to development for better readability

    // Define entry points for various JS files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },

    // Configure output options
    output: {
      filename: '[name].bundle.js', // Output file naming convention
      path: path.resolve(__dirname, 'dist'), // Output directory path
    },

    // Include plugins for HTML, PWA Manifest, and Service Worker
    plugins: [
      new HtmlWebpackPlugin({ // Generates HTML file from template
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest({ // Service worker configuration
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({ // PWA Manifest configuration
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        }]
      })
    ],

    // Define rules for handling different file types
    module: {
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
        },
        {
          test: /\.m?js$/, // Match JS files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Use babel-loader for JS files
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
