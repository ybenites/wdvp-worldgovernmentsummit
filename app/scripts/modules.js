const artefacts = {
  poll: require('artefacts/poll.vue').default
}

export default artefacts

export const artefactMixin = {
  components: artefacts,
  props: ['attributes'],
  methods: {
    existComponent(type) {
      return (type in this.$options.components)
    }
  }
}