// import $ from "jquery";
import $ from "zepto";
import animateSvg from "./animateJs";

export default class FixSvgSize {
  constructor(options) {
    if (options) {
      if (options.tag !== undefined) {
        var _this=this;
        this.tag = options.tag;
        var svg = $(this.tag).find('svg');

        new animateSvg({tag:this.tag});
        this.original_height_svg = svg[0].viewBox.baseVal.height;
        this.original_width_svg = svg[0].viewBox.baseVal.width;
        this.get_size_svg(this.tag, this.original_width_svg, this.original_height_svg);


        $(window).on('resize', function() {
            var sttime = setTimeout(function() {
                if (!_this.is_mobile()) {
                    _this.get_size_svg(_this.tag, _this.original_width_svg, _this.original_height_svg);
                    clearTimeout(sttime);
                }
            }, 300);
        });
        // Listen for orientation changes
        $(window).on("orientationchange", function() {
            if (_this.is_mobile()) {
                var sttime = setTimeout(function() {
                    _this.get_size_svg(_this.tag, _this.original_width_svg, _this.original_height_svg);
                    clearTimeout(sttime);
                }, 300);
            }
        });

      }
    }
  }

  get_size_svg(tag, original_width_svg, original_height_svg) {
      var content_svg = $(tag).width();
      var new_height = (content_svg * original_height_svg) / original_width_svg;
      $(tag).find('svg').height(new_height);
      $(tag).find('svg').width(content_svg);
  };
  is_mobile(){
    return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
  }
}
