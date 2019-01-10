<template>
  <section v-if="nextChapter">
    <div class="go-next-chapter">
      <div class="content-columns">
        <div class="label">NEXT CHAPTER </div>
        <div>
          <h3>
            {{nextChapter.name}}
          </h3>
          <a :href="nextChapter.url" :title="nextChapter.name">
            <img src="~images/go-next-arrow.svg"  :alt="nextChapter.name"  class="st-image-responsive">
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['nextChapter'])
}
</script>
