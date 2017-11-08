import Vue from 'vue'
import { Storage, sleep } from './modules/utils'
Vue.config.productionTip = false
Vue.config.devtools = false

var app = new Vue({
  el: '#app',
  data: {
		favorUnit: 'CNY',
		enableAutoRefresh: false,
  },
  methods: {
    saveOptions() {
      Storage.setValue('favorUnit', this.favorUnit)
      Storage.setValue('enableAutoRefresh', this.enableAutoRefresh)
    },
    restoreOptions() {
      this.favorUnit = Storage.getValue('favorUnit', 'CNY')
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
          价格显示：
          <input type="radio" checked={this.favorUnit === 'CNY'} value="CNY" name="unit" onChange={this.onChange.bind(this, 'favorUnit')} />
          <label for="unit">人民币</label>
          <input type="radio" checked={this.favorUnit === 'USD'} value="USD" name="unit" onChange={this.onChange.bind(this, 'favorUnit')} />
          <label for="unit">美元</label>
        </div>
        <div class="row">
          <input type="checkbox" name="enableAutoRefresh" checked={this.enableAutoRefresh}  onChange={this.toggleOption.bind(this, 'enableAutoRefresh')} />
          <label for="unit">启用自动刷新（15秒间隔，仅弹出窗口中有效）</label>
        </div>
        <div class="footer">
          <a href="https://github.com/cyio/coinmarketcap-cn">源代码</a>
        </div>
      </div>
    )
  }
})
