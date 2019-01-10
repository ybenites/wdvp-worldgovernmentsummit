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
        lang: "en"
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
          }
          Object.keys(responseKeys).forEach(key => {
            const value = response[responseKeys[key]]
            if (value != null) state[key] = value
          })

        }
      },
      strict: options.debug
    })
  }
}