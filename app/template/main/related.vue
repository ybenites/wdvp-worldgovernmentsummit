<template>
<div class="related_articles" v-if="relatedarticles">
  <div class="related-section-header">{{relatedarticles.header || 'Like to see more graphics?'}}</div>
  <div class="related-section-blurb" v-if="relatedarticles.blurb">{{relatedarticles.blurb}}</div>
  <div class="related-section-blurb" v-if="!relatedarticles.blurb">Here are some other original graphics you might enjoy. Or visit our <a href="http://graphics.straitstimes.com">graphics homepage</a></div>
  <div v-if="articlelist && articlelist.length > 0">
    <div v-if="loading === true">
      <img src="https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2017/08/ndp-instagram-2017/images/st-loading.gif" width="100" class="st-image-responsive" alt="">
    </div>
    <div class="related-articles" v-if="loading !== true">
      <div class="grid">
        <div class="grid-row">

          <div class="grid-item" v-for="article in articlelist">
            <div class="related-article-content">
              <div class="related-article-image" v-if="article.image" :style="'background-image:url(' + article.image +');'">
                <!--img :src="article.image" /-->
              </div>
              <div class="related-article-title" v-if="article.title">
                {{article.title}}
              </div>
              <a class="related-article-link" :href="article.link" :title="article.title">&nbsp;</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss">
  $screen-xs: 420px !default; // extra small */
  $screen-above-xs: $screen-xs + 1;
  $screen-mobile: 768px !default; // small */
  $screen-sm: $screen-mobile;
  $screen-above-mobile: $screen-mobile + 1;
  $screen-tablet: 992px !default; // medium */
  $screen-md: $screen-tablet;
  $screen-above-tablet: $screen-tablet + 1;
  $screen-desktop: 1200px !default; // large */
  $screen-lg: $screen-desktop;
  $screen-above-desktop: $screen-desktop + 1;

  $screen-xs-max: ($screen-sm - 1) !default;
  $screen-sm-max: ($screen-md - 1) !default;
  $screen-md-max: ($screen-lg - 1) !default;

  .related_articles {
    max-width: 1200px;
    margin: 150px auto 0;

    @media only screen and (max-width : $screen-mobile) {
      margin-top: 50px;
    }

    .related-section-header {
      font-family: $font-SelaneTen;
      font-size: 28px;
      line-height: 120%;
      margin-bottom: 10px;
      color: $black;
      padding: 0 15px;

      @media only screen and (max-width : $screen-mobile) {
        font-size: 26px;
      }
    }

    .related-section-blurb {
      font-family: $font-SelaneMinTen;
      font-size: 19px;
      line-height: 120%;
      color: $black;
      padding: 0 15px;

      @media only screen and (max-width : $screen-mobile) {
        font-size: 16px;
      }
    }
  }

  .related-articles {
    margin-top: 20px;

    .related-article-content {
      position: relative;

      .related-article-image {
        margin-bottom: 15px;
        position: relative;
        background-color: #ccc;
        overflow: hidden;
        background-position: center;
        background-size: cover;

        &:before {
          content: '';
          display: block;
          margin-top: 56.25%;
        }

        img {
          min-width: 100%;
          min-height: 100%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }

      .related-article-title {
        font-family: $font-SelaneTen;
        font-size: 18px;
        line-height: 120%;
        color: $black;
      }

      .related-article-link {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin-bottom: -5px;
        width: 100%;
      }
    }
  }

  .grid {
    padding: 0 15px;

    .grid-row {
      margin-left: -15px;
      margin-right: -15px;
      @include clearfix();
      // background-color: rgba(0,0,0,0.3);

      @media only screen and (max-width : $screen-mobile) {
        margin-left: -7.5px;
        margin-right: -7.5px;
      }
    }

    .grid-item {
      float: left;
      padding: 0 15px;
      box-sizing: border-box;
    // background-color: rgba(0,0,0,0.3);
    margin-bottom: 30px;

    @media only screen and (max-width : $screen-mobile) {
        padding: 0 7.5px;
    }

      @media only screen and (min-width : $screen-above-desktop) {
        width: 25%;
        &:nth-child(4n+1) {
          clear:left;
        }
      }
      @media only screen and (max-width : $screen-desktop) {
        width: 25%;
        @media only screen and (min-width : $screen-above-tablet) {
          &:nth-child(4n+1) {
            clear:left;
          }
        }
      }
      @media only screen and (max-width : $screen-tablet) {
        width: 33.333333%;
        @media only screen and (min-width : $screen-above-mobile) {
          &:nth-child(3n+1) {
            clear:left;
          }
        }
      }
      @media only screen and (max-width : $screen-mobile) {
        // float: none;
        // width: auto;
        width: 50%;
        &:nth-child(2n+1) {
          clear:left;
        }
      }
    }

    @media only screen and (min-width : $screen-desktop) {
      &.full_above_desktop {
        .grid-item {
            float: none;
            width: auto;
        }
      }
    }

    @media only screen and (min-width : $screen-tablet) {
      &.full_above_tablet {
        .grid-item {
            float: none;
            width: auto;
        }
      }
    }
  }
</style>

<script>
// import $ from "jquery";
import {
  mapState
} from 'vuex';

export default {
  computed: mapState(['relatedarticles']),
  data: function () {
    return {
      loading: false,
      articlelist: []
    }
  },
  methods: {
    shuffleArray(array) {
      /* Randomize array element order in-place.
       * Using Durstenfeld shuffle algorithm.*/
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    return array;
  },
  getDirPath (url) {
    var dir = url.substring(0, url.lastIndexOf('/')) + "/";
    return dir;
  }
  },
  created: function () {
    // console.log("check:"+this.relatedarticles);
    var _vm = this;
    _vm.loading = true;
    var feed_url = "";
    var spreadsheetId = "1ZZMd-bFrxeMuRZ13rLMgVwNEeecX9K_HWtSXnUsYp_s";

    if ( location.host != "graphics.straitstimes.com" ) {
      feed_url = location.protocol + "//st-visuals.com/graphics/st-get-file-json/" + spreadsheetId;
    } else {
      feed_url = location.protocol + "//graphics.straitstimes.com/st-get-file-json/" + spreadsheetId;
    }

    $.ajax({
      url: feed_url,
      dataType: "json",
      success: function(data) {
        var newData = [];
        if (data) {
          let articles = _vm.shuffleArray(data);
          // console.log(_vm.articlelist);
          let counter = 0;
          for ( let i in articles ) {
            if ( counter > 3 ) break;
            if ( _vm.getDirPath(window.location.href) == _vm.getDirPath(articles[i]['link']) ) continue;
            counter++;
            _vm.articlelist.push(articles[i]);

          }
        }
        _vm.loading = false;
      }
    });
  }
}
</script>
