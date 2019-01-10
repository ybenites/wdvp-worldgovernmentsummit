<template>
<div class='content-columns'>
  <component v-for='(item, key, index) in attributes' v-bind:is='item.type' :key='item.type+index' :attributes='item.value' :division='division' v-if='existComponent(item.type)'></component>
</div>
</template>

<script>
import StContentLeft from './st-column-left.vue'
import StContentRight from './st-column-right.vue'
import StContentUnique from './st-column-unique.vue'

import {artefactMixin} from 'modulesProject'

export default {
  props: ['division'],
  components: {
    unique: StContentUnique,
    left: StContentLeft,
    right: StContentRight
  },
  mixins: [artefactMixin]
}
</script>
