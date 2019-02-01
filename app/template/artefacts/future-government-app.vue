<template lang="html">
  <div class="future-government-app">
    <g-header></g-header>
    <div class="content-select2">
      How <new-select2></new-select2> looks like?
    </div>
    <circles></circles>
  </div>
</template>

<script>
import gHeader from './g-header.vue';
import NewSelect2 from './new-select2.vue';
import circles from './circles.vue';
export default {
  components: {
    'g-header': gHeader,
    'new-select2': NewSelect2,
    'circles': circles
  },
  methods: {

  },
  created() {
    this.$store.commit('loading', false);
  }
}
</script>

<style lang="scss" scoped>
.future-government-app {
    @include container;
    padding: 0 15px;
    color: #333;
}
.content-select2 {
    padding: 55px 0;
    font-size: 50px;
    line-height: 1.5;
}
</style>
