import Vue from 'vue'
import { Storage, sleep } from './modules/utils'
Vue.config.productionTip = false
Vue.config.devtools = false

var app = new Vue({
  el: '#app',
  data: {
		favorUnit: 'USD',
		site:'coinmarketcap',
		enableAutoRefresh: false,
  },
  methods: {
    saveOptions() {
      Storage.setValue('favorUnit', this.favorUnit)
      Storage.setValue('site', this.site)
      Storage.setValue('enableAutoRefresh', this.enableAutoRefresh)
    },
    restoreOptions() {
      this.favorUnit = Storage.getValue('favorUnit', 'USD')
      this.site = Storage.getValue('site', 'coinmarketcap')
      this.enableAutoRefresh = Storage.getValue('enableAutoRefresh', false)
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
  computed: {
  },
  mounted () {
    this.restoreOptions()
  },
  render (h) { // <-- h must be in scope
    return (
      <div class="container">
        <div class="row">
          Site：
          <input type="radio" checked={this.site === 'coinmarketcap'} value="coinmarketcap" name="site" onChange={this.onChange.bind(this, 'site')} />
          <label for="site">coinmarketcap</label>
          <input type="radio" checked={this.site === 'feixiaohao'} value="feixiaohao" name="site" onChange={this.onChange.bind(this, 'site')} />
          <label for="site">非小号</label>
        </div>
        <div class="row">
          Price Unit：
          <input type="radio" checked={this.favorUnit === 'USD'} value="USD" name="unit" onChange={this.onChange.bind(this, 'favorUnit')} />
          <label for="unit">$</label>
          <input type="radio" checked={this.favorUnit === 'CNY'} value="CNY" name="unit" onChange={this.onChange.bind(this, 'favorUnit')} />
          <label for="unit">￥</label>
        </div>
        <div class="row">
          <input type="checkbox" name="enableAutoRefresh" checked={this.enableAutoRefresh}  onChange={this.toggleOption.bind(this, 'enableAutoRefresh')} />
          <label for="unit">Auto Refresh（15 seconds duration, only work in the popup window）</label>
        </div>
        <div class="footer">
          <a href="https://github.com/cyio/coinmarketcap-cn">source code</a>
        </div>
      </div>
    )
  }
})
