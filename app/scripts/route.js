/* eslint-disable camelcase */
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import browser from 'detect-browser'

export default class Routes {
  constructor (Vue, options) {
    Vue.use(VueRouter)
    Vue.use(VueMeta)
    if (options) {
      var Main = options.Main
      const default_route = [
        {
          path: '/',
          component: Main
        }
      ]

      this._path = options.path
      this._json_pages = options.json_pages
      var json_pages = this._json_pages
      this.getObjectPages = Object.keys(json_pages).map(d => {
        var page = ((json_pages[d].page)
          ? json_pages[d].page
          : d)

        return {
          page_html: `${page}.html`,
          page: page,
          key: json_pages[d].key,
          component: (json_pages[d].component === 'undefined' || json_pages[d].component === undefined || json_pages[d].component === '')
            ? Main
            : json_pages[d].component,
          identifier: d
        }
      })

      this.router = new VueRouter({
        base: this.getBasePath,
        mode: 'history',
        linkActiveClass: 'current',
        routes: default_route.concat(this.getRoutes),
        fallback: !(browser.name === 'ie' && browser.version === '9.0.0')
      })
    }
  }

  get getRoutes () {
    return this.getObjectPages.map(d => {
      return {path: `/${d.page_html}`, component: d.component}
    })
  }
  get getCurrentPage () {
    var _this = this
    var currentPage = {}
    this.getObjectPages.forEach(d => {
      if (d.page_html === _this.getFileRoute) {
        currentPage = d
      }
    })
    return currentPage
  }

  get path () {
    return this._path
  }
  set path (path) {
    this._path = path
  }

  get getFileRoute () {
    var a_path = this.path.split('/')
    var file_route = a_path[a_path.length - 1]
    file_route = file_route.split('?')[0].split('#')[0].trim()
    if (file_route === '') file_route = 'index.html'
    return file_route
  }

  get getBasePath () {
    var a_path = this.path.split('/')
    a_path[a_path.length - 1] = ''
    return a_path.join('/')
  }
}
