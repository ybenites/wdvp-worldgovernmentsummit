// import $ from "jquery";
import $ from "zepto";

// var d3 = Object.assign({}, require("d3-selection"), require("d3-transition"), require("d3-geo"), require("d3-collection"), require("d3-dispatch"), require("d3-dsv"), require("d3-request"),require("d3-array"));
var d3 = Object.assign({}, require("d3-selection"), require("d3-transition"), require("d3-dispatch"), require("d3-request"));

import * as d3_queue from "d3-queue";
import fixSvgSize from './fix-svg-size';

export default class GetSvg {
  constructor(options) {
    this.tags;
    this.todo;
    this.a_tags=[];
    this.url_folder=[];

    if (options) {
      var _this=this;
      var q = d3_queue.queue();
      if (options.todo) {
        if (typeof options.todo === "function") {
          this.todo = options.todo;
        }
      }
      if (options.tags) {
        if ($.isArray(options.tags)) {
          this.tags = options.tags;
        }
      }else{
        return ;
      }

      if (options.folders) {
        if ($.isArray(options.folders)) {
          options.folders.forEach( (d,i)=>{
            let desktop_img=_this.path_images(d+"/desktop-image.svg");
            // q.defer(d3.xml, "images/"+d+"/desktop-image.svg");
            q.defer(d3.xml, desktop_img);
            var dv=d3.select(_this.tags[i]).append("div").attr("class","st-desktop-svg");
            _this.url_folder.push("images_doc/"+d);
            _this.a_tags.push(dv);

            let tablet_img=_this.path_images(d+"/tablet-image.svg");
            // q.defer(d3.xml, "images/"+d+"/tablet-image.svg");
            q.defer(d3.xml, tablet_img);
            var dt=d3.select(_this.tags[i]).append("div").attr("class","st-tablet-svg");
            _this.url_folder.push("images_doc/"+d);
            _this.a_tags.push(dt);

            let mobile_img=_this.path_images(d+"/mobile-image.svg");
            // q.defer(d3.xml, "images/"+d+"/mobile-image.svg");
            q.defer(d3.xml, mobile_img);
            var dm=d3.select(_this.tags[i]).append("div").attr("class","st-mobile-svg");
            _this.url_folder.push("images_doc/"+d);
            _this.a_tags.push(dm);

          });
          q.awaitAll((error, xmls)=>_this.get_xml(error, xmls));
        }
      }

    }
  }
  path_images(path){
    return require("images_doc/"+path);
  }
  get_xml(error, xmls) {
    var _this=this;
    if (error) throw error;
    xmls.forEach((xml, i) => {
      var svg;
      if (navigator.appName === 'Microsoft Internet Explorer') {
        svg = _this.cloneToDoc(xml.documentElement);
      }
      else{
        svg = document.importNode(xml.documentElement, true);
      }


      d3.select(svg).selectAll("image").each(function(){
        var url_image=d3.select(this).attr("xlink:href");
        d3.select(this).attr("xlink:href",_this.url_folder[i]+"/"+url_image);
      });


      if (_this.a_tags[i] !== undefined) {
        var node_svg=_this.a_tags[i].node();
        node_svg.appendChild(svg);
        new fixSvgSize({
          tag:node_svg
        });
      }
    });
    if(typeof this.todo==="function")this.todo(xmls);
  }
  cloneToDoc(node, doc){
    var _this=this;
    if (!doc) doc = document;
    var clone = doc.createElementNS(node.namespaceURI, node.nodeName);
    for (var i = 0, len = node.attributes.length; i < len; ++i) {
      var a = node.attributes[i];
      if (/^xmlns\b/.test(a.nodeName)) continue; // IE can't create these
      clone.setAttributeNS(a.namespaceURI, a.nodeName, a.nodeValue);
    }
    for (var ii = 0, len2 = node.childNodes.length; ii < len2; ++ii) {
      var c = node.childNodes[ii];
      clone.insertBefore(
        c.nodeType == 1 ? _this.cloneToDoc(c, doc) : doc.createTextNode(c.nodeValue),
        null
      );
    }
    return clone;
  }

}
