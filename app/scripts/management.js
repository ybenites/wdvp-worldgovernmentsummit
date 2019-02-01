import Vuex from 'vuex'

export default class Management {
  constructor(Vue, options) {
    Vue.use(Vuex)

    this.store = new Vuex.Store({
      state: {
        loading: false,
        fullHeight: window.innerHeight,
        fullWidth: window.innerWidth,
        identifier: null,
        date: false,
        polls: false,
        lang: "en",
        initial: 1,
        bf: 1,
        cf: 0,
        fg: 0,
        ft: 0
      },
      getters: {},
      mutations: {
        loading(state, value) {
          state.loading = value
        },
        fullHeight(state, height) {
          state.fullHeight = height
        },
        fullWidth(state, width) {
          state.fullWidth = width
        },
        identifier(state, identifier) {
          state.identifier = identifier
        },
        pushResponse(state, response) {
          const responseKeys = {
            polls: 'polls',
            initial: 'initial',
            bf: 'bf',
            cf: 'cf',
            fg: 'fg',
            ft: 'ft'
          }
          Object.keys(responseKeys).forEach(key => {
            const value = response[responseKeys[key]];
            if (value != null) state[key] = value
          })

        }
      },
      strict: options.debug
    })
  }
}