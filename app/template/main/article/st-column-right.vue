<template>
  <div class="column-paragraph-right">
    <component v-for="(item, key, index) in attributes" v-bind:is="item.type" :key="item.type+index" :attributes="item.value" v-if="existComponent(item.type)"></component>
  </div>
</template>

<script>
import {artefactMixin} from 'modulesProject'

export default {
  mixins: [artefactMixin]
}
</script>
