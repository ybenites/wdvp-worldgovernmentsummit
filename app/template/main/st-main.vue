<template>
<main :class="identifier">
  <!-- <smch-poll></smch-poll> -->
  <!-- <st-article></st-article> -->
  <future-government-app></future-government-app>
</main>
</template>

<script>
import {
  mapState
} from 'vuex'
// import smchPoll from 'artefacts/poll.vue'
import futureGovernmentApp from 'artefacts/future-government-app.vue'
// import stArticle from './article/st-article.vue'

export default {
  components: {
    // 'smch-poll': smchPoll,
    'future-government-app': futureGovernmentApp
    // 'st-article': stArticle
  },
  computed: mapState(['identifier'])
}
</script>
