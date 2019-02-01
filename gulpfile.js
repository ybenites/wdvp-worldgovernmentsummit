/* eslint-disable camelcase, no-unused-vars */

var gulp = require('gulp')
var webpack = require('webpack')
var gulpWebpack = require('webpack-stream')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var open = require('gulp-open')
var gulpif = require('gulp-if')
var path = require('path')
var lint = require('gulp-eslint')
var plumber = require('gulp-plumber')

var {
  VueLoaderPlugin
} = require('vue-loader')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var StMetaHtmlWebpackPlugin = require('./StMetaHtmlWebpackPlugin')

var env,
  jsSources,
  htmlSources,
  outputDir,
  sassStyle,
  jsSourcesST,
  jsLibrary,
  objEntry


// values for ENV development,test,production
env = 'production'


var env2 = env
env = (env === 'test' || env === 'production') ?
  'production' : 'development'

/* Start define all html, scss and js files */
// jsSources = ['./scripts/global.js']
jsSourcesST = ['./scripts/functions.js', './scripts/app.js']


jsLibrary = [
  'jquery',
  'd3-selection',
  'd3-transition',
  'd3-dispatch',
  'd3-request',
  'd3-timer',
  'd3-queue',
  'd3-array',
  'd3-drag',
  'iscroll',
  'select2'
]


/* declare parameters for page */
var json_pages_html = {
  'project-name': {
    // 'key': '../data/poll.json',
    'page': 'index'
  }
}

/* end setup pages */

var optionsImg = ''
var optionsImgHtml = ''
var optionsHtml = ''

var optionsFonts;
optionsFonts = 'limit=1&name=[path][name].[ext]&publicPath=../'
// if (env2 === 'development' || env2 === 'test') {
//   optionsFonts = 'limit=1&name=[path][name].[ext]&publicPath=../../../fonts/&context=../fonts/'
// } else {
//   optionsFonts = 'limit=1&name=[path][name].[ext]&publicPath=https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/commons/fonts/&context=../fonts/'
// }

var extractCSS = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true
})
var extractSCSS = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true
})
var extractCSSVUE = new ExtractTextPlugin('css/components2.css')

var optionsPluginsJS = [new VueLoaderPlugin()]
var optionsPluginsCSS = [extractCSS, extractSCSS]

// jsSources = jsSources.concat(jsSourcesST)
jsSources = jsSourcesST
objEntry = {
  'js/app': jsSources,
  'js/components': jsLibrary,
  'js/vuecomponents': [
    'vue-touch', 'vue-router', 'vue-meta', 'vuex'
  ],
  'js/vue': ['vue'],
  'js/polyfill': ['babel-polyfill']
}

optionsPluginsJS.push(new webpack.optimize.CommonsChunkPlugin({
  names: ['js/components', 'js/vuecomponents', 'js/vue', 'js/polyfill']
}))

optionsPluginsJS.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify((env === 'development') ? 'development' : 'production'),
    NODE_ENV2: JSON.stringify(env2),
    PAGES: JSON.stringify(json_pages_html)
  }
}))

/* code generation pages */

Object.keys(json_pages_html).map(function(key) {
  var generate_html = new HtmlWebpackPlugin({
    key_page: key,
    filename: (json_pages_html[key].page || key) + '.html',
    template: 'index.ejs',
    hash: true,
    cache: false,
    minify: (env !== 'development') ? {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      html5: true,
      minifyCSS: true,
      removeComments: true,
      removeEmptyAttributes: true,
      collapseInlineTagWhitespace: true,
      removeTagWhitespace: true,
      minifyJS: true
    } : false
  })
  optionsPluginsJS.push(generate_html)
})
var exec_pages = new StMetaHtmlWebpackPlugin({
  st_pages: json_pages_html
});
optionsPluginsJS.push(exec_pages)
/* end generation pages */


if (env !== 'development') {
  outputDir = 'production/'
  sassStyle = 'compressed'

  optionsImg = 'limit=1000&name=[path][name].[ext]&publicPath=../&outputPath='
  optionsImgHtml = 'limit=10&name=[path][name].[ext]&publicPath=&outputPath='

  optionsPluginsJS.push(new webpack.optimize.UglifyJsPlugin())
} else {
  outputDir = 'dev/'
  sassStyle = 'expanded'

  optionsHtml = '&emitFile=false'
  // optionsImg = 'emitFile=false&limit=1&name=[path][name].[ext]&publicPath=../&outputPath='
  // optionsImgHtml = 'emitFile=false&limit=1&name=[path][name].[ext]&publicPath=&outputPath='

  optionsImg = 'limit=1000&name=[path][name].[ext]&publicPath=../&outputPath='
  optionsImgHtml = 'limit=10&name=[path][name].[ext]&publicPath=&outputPath='
}
optionsPluginsJS.push(extractCSSVUE)



gulp.task('js', function() {
  return gulp.src(['test.js'], {
    allowEmpty: true
  }).pipe(plumber()).pipe(gulpWebpack({
    context: path.join(__dirname, '/app'),
    entry: objEntry,
    output: {
      filename: '[name].js'
    },
    resolve: {
      extensions: [
        '.js', '.css', '.png', 'jpg'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'images': path.resolve(__dirname, 'app/images'),
        'images_doc': path.resolve(__dirname, 'app/images_doc'),
        'artefacts': path.resolve(__dirname, 'app/template/artefacts'),
        'GetSvg': path.resolve(__dirname, 'app/scripts/libraries/get-svg.js'),
        'fixSvgSize': path.resolve(__dirname, 'app/scripts/libraries/fix-svg-size.js'),
        'animateJs': path.resolve(__dirname, 'app/scripts/libraries/animateJs.js'),
        'iphone-inline-video': path.resolve(__dirname, 'app/scripts/libraries/iphone-inline-video'),
        'TweenLite': path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        'TimelineLite': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
        'modulesProject': path.resolve(__dirname, 'app/scripts/modules.js'),
        'iscroll': 'iscroll/build/iscroll-probe',
        'libraries': path.resolve(__dirname, 'app/scripts/libraries')
      }
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    bail: false,
    module: {
      rules: [{
          test: /\.(jpe?g|png|gif|svg)$/,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, 'app/images'),
            path.resolve(__dirname, 'app/images_doc')
          ],
          loader: [
            'url-loader?' + optionsImgHtml,
            'img-loader'
          ]
        }, {
          test: /\.mp4$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'app/videos')],
          use: ['url-loader?limit=10&name=[path][name].[ext]&publicPath=&outputPath=']
        }, {
          test: /\.vue$/,
          loader: 'vue-loader'
        }, {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, 'app/scripts'),
            path.resolve(__dirname, 'app/template')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['transform-object-assign', 'transform-runtime']
            }
          }
        }, {
          test: /\.s?css$/,
          loader: extractCSSVUE.extract({
            fallback: 'vue-style-loader',
            use: [{
                // loader: 'css-loader?url=false&minimize=true'
                loader: 'css-loader',
                options: {
                  minimize: env !== 'development',
                  root: path.join(__dirname, '/app/')
                }
              },
              'postcss-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [path.resolve(__dirname, 'app/styles/scss/_libs.scss')] // for example
                }
              }
            ]
          })
        },
        // {
        //   test: require.resolve('zepto'),
        //   loader: 'imports-loader?this=>window'
        // },
        {
          test: /\.html$/,
          exclude: [path.resolve(__dirname, 'app/template')],
          use: [{
            loader: 'file-loader?name=[name].html' + optionsHtml
          }, {
            loader: 'extract-loader'
          }, {
            loader: 'html-loader',
            options: {
              minimize: env !== 'development'
            }
          }]
        }, {
          test: /\.(eot|woff|ttf|woff2|svg)$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, 'app/fonts'),
          loader: ['url-loader?importLoaders=1&emitFile=false&' + optionsFonts]
        }
      ]
    },
    plugins: optionsPluginsJS
  }, webpack)).pipe(gulp.dest(outputDir))

})

gulp.task('css', function() {
  return gulp.src(['test.js'], {
    allowEmpty: true
  }).pipe(plumber()).pipe(gulpWebpack({
    context: path.join(__dirname, '/app'),
    entry: {
      'css/app2': './styles/precss/app.css',
      'css/app': './styles/scss/app.scss',
      'css/components': './styles/scss/components.scss'
    },
    output: {
      filename: '[name].css'
    },
    resolve: {
      extensions: [
        '.js', '.css'
      ],
      alias: {
        '../images': path.resolve(__dirname, 'app/images'),
        '../images_doc': path.resolve(__dirname, 'app/images_doc')
      }
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    bail: false,
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader?presets[]=env&presets[]=react&plugins[]=transform-object-assign'
      }, {
        test: /\.css$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'app/styles/precss'),
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            // loader: 'css-loader?url=false&minimize=true'
            loader: 'css-loader',
            options: {
              minimize: env !== 'development',
              root: path.join(__dirname, '/app/')
            }
          }, {
            loader: 'postcss-loader'
          }]
        })
      }, {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'app/styles/scss'),
        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: [{
            // loader: 'css-loader?url=false&minimize=true'
            loader: 'css-loader',
            options: {
              minimize: env !== 'development',
              root: path.join(__dirname, '/app/')
            }
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'sass-loader'
          }]
        })
      }, {
        test: /\.(eot|woff|ttf|woff2|svg)$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'app/fonts'),
        loader: ['url-loader?emitFile=false&' + optionsFonts]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /(node_modules)/,
        include: [
          path.resolve(__dirname, 'app/images'),
          path.resolve(__dirname, 'app/images_doc')
        ],
        loader: [
          'url-loader?' + optionsImg,
          'img-loader'
        ]
      }]
    },
    plugins: optionsPluginsCSS
  }, webpack)).pipe(gulp.dest(outputDir))
})


// Copy images to production
gulp.task('move', function() {
  // gulp.src('./../fonts/**/*.*')
  //     .pipe(gulpif(env === 'development',gulp.dest(outputDir + 'fonts')))

  // gulp.src('development/images/**/*.*').pipe(gulpif(env === 'production', imagemin())).pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
  gulp.src('app/csv/**/*.*').pipe(gulpif(env === 'production', gulp.dest(outputDir + 'csv')))
  // gulp.src('development/svg/**/*.*')
  //     .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'svg')))
  gulp.src('app/videos/**/*.*').pipe(gulpif(env === 'production', gulp.dest(outputDir + 'videos')))
  gulp.src('app/fonts/**/*.*').pipe(gulp.dest(outputDir + 'fonts'));

})


gulp.task('default', gulp.parallel('css', 'js', 'move'));