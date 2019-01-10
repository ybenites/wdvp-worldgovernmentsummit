<template>
<article class="st-article">
  <section v-for="(el, count) in article" :class="'chapter-'+(count+1)">
    <component :class="'row'+'-'+(count+1)+'-'+(key+1)" v-for="(item, key) in el.chapter" v-bind:is="item.type" :key="item.type+'-'+count+'-'+key" :attributes="item.value" :division="count"></component>
  </section>

  <st-credits></st-credits>
  <st-next-chapter></st-next-chapter>

  <!-- <component v-for="(module,key,index) in registerComponents()" v-bind:is="key" :key="key+index"></component> -->

  <st-related></st-related>

  <!-- <section v-if="!isMobile()" class="content-fb-comments">
    <div class="fb-comments" :data-href="url()" data-width="100%" data-numposts="5" data-colorscheme="light"></div>
  </section> -->
</article>
</template>

<script>
import {
  mapState
} from 'vuex'

import StContentFullwidth from './st-column-content-fullwidth.vue'
import StContent from './st-column-content.vue'
import StCredits from './st-credits.vue'
import StNextChapter from './next-chapter.vue'
import stRelated from '../related.vue'

export default {
  computed: mapState(['article']),
  methods: {
    url() {
      return window.location.href
    },
    isMobile() {
      return window.isMobile
    }
  },
  components: {
    'container-fullwidth': StContentFullwidth,
    'container': StContent,
    'st-credits': StCredits,
    'st-next-chapter': StNextChapter,
    'st-related': stRelated
  }
}
</script>
