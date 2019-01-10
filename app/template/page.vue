<template>
<div id="content-graphic" class="content-graphic scrollContent" itemscope itemtype="http://schema.org/NewsArticle">
  <meta itemprop="datePublished" v-if="date" :content="date" />
  <!-- <st-menu></st-menu> -->
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
  <!-- <st-footer></st-footer> -->
  <transition name="fade">
    <div class="loading-page" v-if="loading"></div>
  </transition>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
// import stMenu from './menu/st-menu-v1.vue'
// import stFooter from './footer/st-footer-v1.vue'

// module.exports = {
export default {
  // components: {
  //   'st-menu': stMenu,
  //   'st-footer': stFooter
  // },
  computed: mapState(['loading', 'date'])
}
</script>

<style lang="scss" scoped>
.fade-leave-active {
    transition: opacity 1s;
}
.fade-leave-to {
    opacity: 0;
}
</style>
