<template>
  <div class="content-columns-unique">
    <div class="text-unique-paragraph">
      <component v-for="(item, key, index) in attributes" v-bind:is="item.type" :key="item.type+index" :attributes="item.value" v-if="existComponent(item.type)"></component>
    </div>
  </div>
</template>

<script>
import {artefactMixin} from 'modulesProject'

export default {
  mixins: [artefactMixin]
}
</script>
