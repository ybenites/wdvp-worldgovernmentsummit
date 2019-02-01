// console.log(path.join(, 'mixins'));

initial_path = "/";
module.exports = {
  plugins: [
    require("postcss-strip-inline-comments"),
    require('postcss-smart-import'),
    require("postcss-sassy-mixins"),
    require('precss'),
    require('autoprefixer'),
    require("postcss-utilities"),
    require("lost"),
    require("postcss-media-minmax"),
    require("postcss-font-magician")({
      custom: {
        "Glyphicons Halflings": {
          variants: {
            normal: {
              100: {
                url: {
                  eot: initial_path + "fonts/bootstrap/glyphicons-halflings-regular.eot",
                  ttf: initial_path + "fonts/bootstrap/glyphicons-halflings-regular.ttf",
                  woff: initial_path + "fonts/bootstrap/glyphicons-halflings-regular.woff",
                  woff2: initial_path + "fonts/bootstrap/glyphicons-halflings-regular.woff2",
                  svg: initial_path + "fonts/bootstrap/glyphicons-halflings-regular.svg"
                }
              }
            }
          }
        }
      }
    })
  ]
}