/* eslint-disable camelcase */
import $ from 'jquery'

var d3 = Object.assign({}, require('d3-selection'), require('d3-transition'), require('d3-timer'))

var fbAppId = 748050775275737
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
    appId: fbAppId, // App ID
    status: true, // check login status
    cookie: true, // enable cookies to allow the
    // server to access the session
    xfbml: true, // parse page for xfbml or html5
    // social plugins like login button below
    version: 'v2.0' // Specify an API version
  })
  // Put additional init code here
};

// Load the SDK Asynchronously
(function(d, s, id) {
  var js
  var fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s)
  js.id = id
  js.src = '//connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')

$(function() {
  if ($('.st-button-menu-mobile').length > 0) {
    $('.st-button-menu-mobile').on('click', function() {
      $('.modal-menu-mobile').toggleClass('st_dialogIsOpen')
      $('.st-content-menu-fixed').toggleClass('st_dialogIsOpen')
      eventCloseMenu($('.modal-menu-mobile').hasClass('st_dialogIsOpen'))
    })
  }

  var flag_mobile = 0
  if ($('.modal-menu-mobile').length > 0) {
    $(window).on('mousewheel DOMMouseScroll touchmove touchstart touchend touchcancel touchleave', function(e) {
      if (flag_mobile === 0) return
      e.preventDefault()
      e.stopPropagation()
    })
    $('.st-mb .st-content-shared-social,.st-content-menu-fixed').on('touchstart', function() {
      if ($(this).parents('.st_dialogIsOpen').length > 0 || $(this).hasClass('st_dialogIsOpen')) {
        flag_mobile = 1
      }
    })
    $('.st-mb .st-content-shared-social,.st-content-menu-fixed').on('touchmove', function() {
      if ($(this).parents('.st_dialogIsOpen').length > 0 || $(this).hasClass('st_dialogIsOpen')) {
        flag_mobile = 1
      }
    })
    $('.st-mb .st-content-shared-social,.st-content-menu-fixed').on('touchend', function() {
      if ($(this).parents('.st_dialogIsOpen').length > 0 || $(this).hasClass('st_dialogIsOpen')) {
        flag_mobile = 0
      }
    })
  }
})

function eventCloseMenu(event) {
  if (event) {
    // $('.st_menu_mobile').css('right', '10px')
    d3.select('.first_line').transition().duration(500).attr('x1', 12.8).attr('y1', 12.2).attr('x2', 23.5).attr('y2', 22.8)
    d3.select('.menu_mobile_line_center').transition().duration(500).attr('opacity', 0).attr('x2', 0)
    d3.select('.second_line').transition().duration(500).attr('x1', 12.9).attr('y1', 22.9).attr('x2', 23.4).attr('y2', 12.1)

    // $('body').css({'overflow': 'hidden', 'position': 'relative'})
    $('body').css({
      'overflow': 'hidden'
    })
  } else {
    $('.st-menu-mobile').css('right', '0')
    d3.select('.first_line').transition().duration(500).attr('x1', 10.5).attr('y1', 13.2).attr('x2', 26.1).attr('y2', 13.2)
    d3.select('.menu_mobile_line_center').transition().duration(500).attr('opacity', 1).attr('x2', 26.1)
    d3.select('.second_line').transition().duration(500).attr('x1', 10.5).attr('y1', 21.9).attr('x2', 26.1).attr('y2', 21.9)

    $('body').removeAttr('style')
  }
}



$.fn.extend({
  animateCss: function(animationName, type) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    var copy_this = this
    if (type !== undefined) {
      if (type === 'in') {
        d3.timeout(function() {
          copy_this.removeClass('none')
        }, 100)
      }
    }
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      copy_this.off()
      if (type === 'out') copy_this.addClass('none')
      copy_this.removeClass('animated ' + animationName)
    })
  }
})