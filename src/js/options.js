import Vue from 'vue'
import { Storage, sleep } from './modules/utils'
Vue.config.productionTip = false
Vue.config.devtools = false

var app = new Vue({
  el: '#app',
  data: {
		favorUnit: 'CNY',
		statusText: ''
  },
  methods: {
    async saveOptions() {
      Storage.setValue('favorUnit', this.favorUnit)
      this.statusText = '选项已保存'
      await sleep(700)
      this.statusText = ''
    },
    restoreOptions() {
      this.favorUnit = items.favorUnit
      Storage.setValue('favorUnit', this.favorUnit)
    },
    onChange(name, e) {
			this[name] = e.target.value
    },
  },
  computed: {
  },
  mounted () {
    this.restoreOptions()
  },
  render (h) { // <-- h must be in scope
    return (
      <div class='container'>
        价格显示：
        <select domPropsValue={this.favorUnit} onChange={this.onChange.bind(this, 'favorUnit')}>
          <option value="CNY">人民币</option>
          <option value="USD">美元</option>
        </select>

        <button onClick={this.saveOptions.bind(this)} class="saveBtn">保存</button>
        <span>{this.statusText}</span>
      </div>
    )
  }
})
