// StMetaHtmlWebpackPlugin.js
// name: Yime Benites Puelles
// email: benites_alf@hotmail.com
// url:  ......

/* eslint-disable camelcase */
var request = require('request')

function StMetaHtmlWebpackPlugin(options) {
  // Configure your plugin with options...
  this.options = options || {}
}

StMetaHtmlWebpackPlugin.prototype.apply = function(compiler) {
  var self = this
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...')

    compilation.plugin('html-webpack-plugin-before-html-generation', function(htmlPluginData, callback) {
      if (self.options.st_pages && htmlPluginData.plugin.options.key_page) {
        var hash_js = htmlPluginData.assets.js[0].split('?')[1]
        htmlPluginData.assets.css = [
          'css/components2.css?' + hash_js,
          'css/components.css?' + hash_js,
          'css/app2.css?' + hash_js,
          'css/app.css?' + hash_js
        ]
        // request(self.options.st_pages[htmlPluginData.plugin.options.key_page].key, function(error, response, json_doc) {
        //   console.log(error)
        //   if (!error) {
        //     // console.log(json_doc)
        //     json_doc = JSON.parse(json_doc)
        //     if (self.options.inject) {
        //       self.options.inject(htmlPluginData.plugin.options, json_doc)
        //     }
        callback(null, htmlPluginData)
        //   } else {
        //     // self.emit('error', new PluginError(StMetaHtmlWebpackPlugin, 'Request to url failed.'))
        //   }
        // })
      } else {
        htmlPluginData.assets.css = ['css/components.css', 'css/app2.css', 'css/app.css']
        callback(null, htmlPluginData)
      }
    })
  })
}

module.exports = StMetaHtmlWebpackPlugin