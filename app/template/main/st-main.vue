<template>
<main :class="identifier">
  <smch-poll></smch-poll>
  <!-- <st-article></st-article> -->
</main>
</template>

<script>
import {
  mapState
} from 'vuex'
import smchPoll from 'artefacts/poll.vue'
// import stArticle from './article/st-article.vue'

export default {
  components: {
    'smch-poll': smchPoll,
    // 'st-article': stArticle
  },
  computed: mapState(['identifier'])
}
</script>
