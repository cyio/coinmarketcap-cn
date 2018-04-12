import Vue from 'vue'
import { Storage, sleep } from './modules/utils'
Vue.config.productionTip = false
Vue.config.devtools = false

var app = new Vue({
  el: '#app',
  data: {
    site: 'coinmarketlite',
  },
  methods: {
    saveOptions() {
      Storage.setValue('site', this.site)
    },
    restoreOptions() {
      this.site = Storage.getValue('site', 'coinmarketlite')
    },
    onChange(name, e) {
      this[name] = e.target.value
      this.saveOptions()
    },
    toggleOption(name, e) {
      this[name] = !this[name]
      this.saveOptions()
    },
  },
  computed: {},
  mounted() {
    this.restoreOptions()
  },
  render(h) {
    // <-- h must be in scope
    return (
      <div class="container">
        <div class="row">
          Site：
          <input
            type="radio"
            checked={this.site === 'coinmarketlite'}
            value="coinmarketlite"
            name="site"
            onChange={this.onChange.bind(this, 'site')}
          />
          <label for="site">CoinMarket Lite</label>
          <input
            type="radio"
            checked={this.site === 'feixiaohao'}
            value="feixiaohao"
            name="site"
            onChange={this.onChange.bind(this, 'site')}
          />
          <label for="site">非小号</label>
        </div>
        <div class="footer">
          <a href="https://github.com/cyio/coinmarketcap-cn">source code</a>
          <a href="https://bch123.org">BCH123.org</a>
        </div>
      </div>
    )
  },
})
