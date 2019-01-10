// var d3 = Object.assign({}, require("d3-selection"), require("d3-transition"), require("d3-geo"), require("d3-collection"), require("d3-dispatch"), require("d3-dsv"),require("d3-timer"), require("d3-request"),require("d3-array"));
var d3 = Object.assign({}, require("d3-selection"), require("d3-transition"),require("d3-collection"));

// import $ from "jquery";
import $ from "zepto";
require('./waypoint');

export default class Animate {
  constructor(options) {
    if (options) {
      this.options = options;
      var tag = options.tag;

      this.o_type_animations = {
        "animate-up": "slideUp",
        "animate-down": "slideDown",
        "animate-left": "slideLeft",
        "animate-right": "slideRight",
        "animate-fadeIn": "fadeIn",
        "animate-fadeOut": "fadeOut",
        "animate-line": "animatePath",
        "st-AnimateBackgound-virtual": "stAnimateBackgound_virtual",
        "st-AnimateBackgound-health": "stAnimateBackgound_health",
        "st-AnimateBackgound-transport": "stAnimateBackgound_transport",
        "st-AnimateBackgound-environment": "stAnimateBackgound_environment",
        "st-AnimateBackgound-digital": "stAnimateBackgound_digital",
        "st-AnimateBackgound-security": "stAnimateBackgound_security"
      };

      this.entries_animations = d3.entries(this.o_type_animations);

      this.checkIsAnimate(tag);

    }
  }
  checkIsAnimate(tag) {
    var animate = false;
    var newTag = (typeof tag === "object")
      ? d3.select(tag)
      : d3.selectAll(tag);

    if (newTag.size() === 0)
      return;
    this.entries_animations.forEach(d => {
      if (newTag.classed(d.key)) {
        animate = true;
        this.animateTag(newTag, d.value, "in");
      }
    });

    if (!animate) {

      this.entries_animations.forEach(d => {

        if (newTag.selectAll("." + d.key).size() > 0) {
          animate = true;
          this.animateTag(newTag.selectAll("." + d.key), d.value, "in");
        }
      });
    }
    if (!animate) {
      this.animateTag(newTag);
    }
    // return animate;
  }
  animateTag(tags, animateName, type) {
    var _this = this;
    tags.each(function() {
      if (animateName === "animatePath") {
        var elem;
        if($(this).get(0).tagName==="path")elem=$(this).get(0);
        else elem=$(this).find("path").get(0);
        var total_length = elem.getTotalLength();

        var d3_elem;
        if($(this).get(0).tagName==="path")d3_elem=d3.select(this);
        else d3_elem=d3.select(this).select("path")
        d3_elem.attr('stroke-dasharray', total_length).attr('stroke-dashoffset', total_length);
      }

      var waypoint_top = new Waypoint({
        element: this,
        handler: function(direction) {
          var element_animated = this.element;
          if (direction === "down") {

            if (typeof _this.options.todo === "function")
              _this.options.todo(element_animated);
            if (animateName !== "animatePath") {
              if (animateName !== undefined)
                $(element_animated).animateCss(animateName, type);
              }
            else {
              var d3_elem;
              if($(element_animated).get(0).tagName==="path")d3_elem=d3.select(element_animated);
              else d3_elem=d3.select(element_animated).select("path");

              d3_elem.transition().duration(3000).attr('stroke-dashoffset', 0);
            }
          } else if (direction === "up") {
            if (typeof _this.options.before === "function")
              _this.options.before(element_animated);

            if (animateName !== "animatePath") {} else {
              var d3_elem;
              if($(element_animated).get(0).tagName==="path")d3_elem=d3.select(element_animated);
              else d3_elem=d3.select(element_animated).select("path");
              var total_length = d3_elem.node().getTotalLength();
              d3_elem.transition().duration(0).attr('stroke-dasharray', total_length).attr('stroke-dashoffset', total_length);
            }
          }

        },
        offset: "100%"
      });
    });
  }

  animateCss() {}
  animateHand() {}
}
