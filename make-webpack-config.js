/* eslint global-require: 0 */
var path = require('path');
var webpack = require('webpack');

var pkg = require('./package.json');

var TargetprocessMashupPlugin = require('targetprocess-mashup-webpack-plugin');
var CombineAssetsPlugin = require('combine-assets-plugin');

var makeWebpackConfig = function(opts_) {

    const opts = opts_ || {};

    // mashup unique name
    opts.mashupName = opts.mashupName || __dirname.split(path.sep).pop();

    // minimize output and prevent dev tools
    opts.production = opts.hasOwnProperty('production') ? opts.production : false;

    // will mashup be used by paste to mashup manager or as bunch of files by library
    opts.mashupManager = opts.hasOwnProperty('mashupManager') ? opts.mashupManager : true;

    var mashupName = opts.mashupName;

    // you should use format <something>.config.js to allow Mashup Manager autodiscover
    // config file
    var outputConfigFileName = './mashup.config.js';

    var config = {};

    config.entry = {

        // process config js module from JSON file
        configData: [
            `targetprocess-mashup-config` +
            `?libraryTarget=${mashupName}&outputFile=${outputConfigFileName}!./src/config.json`
        ],
        // main entry point
        index: ['./src/index.js']

    };

    if (!opts.mashupManager) {

        // produce system configs from JSON file
        config.entry.manifestData = ['targetprocess-mashup-manifest!./src/manifest.json'];
        // prevent automatically load data from `chunks` folder, use for async load by demand
        config.entry.ignoreData = ['file?name=chunks/mashup.ignore!./src/mashup.ignore'];

    }

    config.output = {
        filename: '[name].js',
        path: 'dist',
        chunkFilename: 'chunks/[id].[name].js',
        pathinfo: !opts.production,
        // should be unique to prevent collision with main webpack instance
        jsonpFunction: `webpackJsonp_mashup_${mashupName}`
    };

    config.module = {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss?parser=postcss-scss'
        }, {
            test: /\.html$/,
            loader: 'underscore-template'
        }]
    };

    if (!opts.production) {

        config.debug = true;
        config.devtool = 'eval-source-map';

    }

    config.plugins = [
        new TargetprocessMashupPlugin(mashupName, {
            useConfig: true
        }),
        new webpack.DefinePlugin({
            __DEV__: !opts.production
        }),
        new webpack.BannerPlugin(`v${pkg.version} Build ${String(new Date())}`, {
            entryOnly: true
        })
    ];

    var toConcat = {};
    var toExclude = [
        'configData.js',
        'ignoreData.js',
        'manifestData.js'
    ];

    if (opts.mashupManager) {

        toConcat = {
            'index.js': [outputConfigFileName, 'index.js']
        };
        toExclude = toExclude.concat(outputConfigFileName);

    }

    config.plugins = config.plugins.concat(new CombineAssetsPlugin({
        toConcat: toConcat,
        toExclude: toExclude
    }));

    if (opts.mashupManager) {

        // produce single file index.js despite async chunks
        config.plugins = config.plugins.concat(new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }));

    }

    if (opts.production) {

        config.plugins = config.plugins.concat(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));

    }

    config.externals = [{
        jquery: 'jQuery',
        underscore: 'Underscore'
    }, 'jQuery', 'Underscore', /^tp3\//, /^tau\//, /^tp\//];

    config.postcss = [
        require('postcss-nested'),
        require('autoprefixer')({browsers: ['last 2 version']})
    ];

    return config;

};

module.exports = makeWebpackConfig;
