<template>
<div :class="defineClassFromPath(attributes)">
</div>
</template>

<script>
import GetSvg from 'GetSvg'
// import animateJs from 'animateJs'
// var d3 = Object.assign({}, require('d3-selection'), require('d3-transition'), require('d3-dispatch'), require('d3-request'))

export default {
  props: ['attributes'],
  methods: {
    getSvg (folder) {
      if (folder) {
        if (this.$el) {
          return new GetSvg({
            tags: [this.$el],
            folders: [folder],
            todo: (d) => {
              /*
              animateJs({
                tag: `.time - animated, .readmore`,
                todo (el) {
                  d3.select(el).attr('opacity', 0).transition().duration(1000).delay(1000).attr('opacity', 1)
                }
              })
              */
            }
          })
        }
      }
    },
    defineClassFromPath (path) {
      return path.split('/').join('-')
    }
  },
  mounted () {
    this.getSvg(this.attributes)
  }
}
</script>

<style lang="scss">
.st-mobile-svg {
    display: block;
    @include breakpoint(449px) {
        display: none;
    }
}

.st-tablet-svg {
    display: none;
    @include breakpoint(450px) {
        display: block;
    }
    @include breakpoint(649px) {
        display: none;
    }
}

.st-desktop-svg {
    @include container(900px);
    display: none;
    @include breakpoint(650px) {
        display: block;
    }
}
</style>
