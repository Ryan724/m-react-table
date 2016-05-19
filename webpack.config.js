'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

require('babel/polyfill');

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = function(options){
	var entry = {
	  'demo0': './demos/demo0/index.jsx'
	};
	var ExtractTextPluginConfig = new ExtractTextPlugin("[name]/style.css",{disable: false,allChunks: true});
	 var plugins = [
        ExtractTextPluginConfig,
        new CaseSensitivePathsPlugin()
    ];
	//启动服务
	var devServer = {
		contentBase: "./demos"
		,host: "localhost"
		,port: "8080"
		,inline: true
		,colors: true
	}
    var loaders = [
        {
            test: /\.jsx?$/
            ,exclude: /(node_modules)/
            ,loader: 'babel'
            ,query: {optional: ['runtime'], stage: 0 }
        },
        {
            test: /\.css$/, loader: ExtractTextPlugin.extract(
            "css-loader",
            "css-loader?sourceMap",
            {
                publicPath: "../"
            }
        )}
    ];
	return {
			  devtool:options.devtool,
			  entry: entry,
			  output: {
			    filename: '[name]/all.js'
			  },
			  module: {
			    loaders:loaders,
			  },
			  resolve: {
			    extensions: ['', '.js', '.jsx']
			  },

		  	devServer: devServer,//开发服务器配置
	  		plugins: plugins
	};
}
