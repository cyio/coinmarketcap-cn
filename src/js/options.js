import Vue from 'vue'
import { Storage, sleep } from './modules/utils'
Vue.config.productionTip = false
Vue.config.devtools = false

var app = new Vue({
  el: '#app',
  data: {
		favorUnit: 'CNY',
  },
  methods: {
    saveOptions() {
      Storage.setValue('favorUnit', this.favorUnit)
    },
    restoreOptions() {
      this.favorUnit = Storage.getValue('favorUnit', 'CNY')
    },
    onChange(name, e) {
			this[name] = e.target.value
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
        价格显示：
        <input type="radio" checked={this.favorUnit === 'CNY'} value="CNY" name="unit" onChange={this.onChange.bind(this, 'favorUnit')} />
        <label for="unit">人民币</label>
        <input type="radio" checked={this.favorUnit === 'USD'} value="USD" name="unit" onChange={this.onChange.bind(this, 'favorUnit')} />
        <label for="unit">美元</label>
        <div class="footer">
          <a href="https://github.com/cyio/coinmarketcap-cn">源代码</a>
        </div>
      </div>
    )
  }
})
