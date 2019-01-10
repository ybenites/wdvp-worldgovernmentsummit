<template>
<header class="st-header-page" :style="{backgroundColor: (!header.bg_image && !header.video) ? header.backgroundColor : '#fff'}">
  <div v-if="header.bg_image || header.video" class="st-header-hero" :style="{width: '100%', backgroundColor: header.backgroundColor, height:((header.height && fullWidth>=768)?header.height:450)+'px'}">
    <div class="content-fake-bg">
      <div class="fake-bg-l">
      </div>
      <div class="fake-bg-r">
      </div>
    </div>
    <div class="st-content-banner" v-if="header.bg_image">
      <img :src="path_image(header.bg_image)" alt="" class="st-image-responsive" />
    </div>
    <div v-if="header.video && !header.bg_image" class="st-content-banner-video">
      <video loop muted playsinline :src="header.video">
      </video>
    </div>
  </div>
  <div class="main-headline-container" :style="position_header(header.position_headline)">
    <div class="main-headline">
      <div class="st-title">
        <h1 itemprop="headline" v-html="header.headline"></h1>
      </div>
      <div itemprop="description" class="st-deck">
        <p v-for="pitem in header.deck" v-html="pitem"></p>
      </div>
      <div class="st-byline">
        <time itemprop="datePublished" :datetime="header.datetime" :data-timestamp="header.timestamp">
            {{header.byline}}
        </time>
      </div>
    </div>
  </div>

</header>
</template>

<script>
/* global enableInlineVideo */
import {mapState} from 'vuex'

import 'iphone-inline-video'

// import fixSvgSize from 'fixSvgSize'
// import $ from 'jquery'
// var d3 = Object.assign({},require("d3-timer"))

export default {
  computed: mapState(['fullWidth', 'header']),
  watch: {
    header (val) {
      if (val && val.video && !val.logo) {
        this.$nextTick(() => {
          var video = document.querySelector('.st-content-banner-video video')
          enableInlineVideo(video, {
            iPad: true
          })
          setTimeout(() => {
            video.play()
          }, 1000)
        })
      }
    }
  },
  methods: {
    path_image (value) {
      if (!value) return false
      var path = value
      if (this.fullWidth < 550 && value) {
        var [name, ext] = value.split('.')
        path = name + '-mobile.' + ext
      }
      return require('images_doc/' + path)
    },
    position_header (pos) {
      var position = pos
      if (position === 'left') {
        $('.main-headline-container').addClass('container1200')
      } else if (position === 'middle') {
        $('.main-headline-container').addClass('container800')
      }
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.st-content-banner-video {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    video {
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        right: 50%;
        bottom: 50%;
        -webkit-transform: translate(50%, 50%);
        transform: translate(50%, 50%);
        max-width: inherit;
    }
}
.st-content-banner {
    position: relative;
    height: 100%;
    overflow: hidden;
    lost-center: $d_large;

    img {
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        right: 50%;
        bottom: 50%;
        -webkit-transform: translate(50%, 50%);
        transform: translate(50%, 50%);
        max-width: inherit;
    }
}
</style>
