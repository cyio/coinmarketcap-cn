import Vue from 'vue'
import { Storage, sleep } from './modules/utils'
Vue.config.productionTip = false
Vue.config.devtools = false

var app = new Vue({
  el: '#app',
  data: {
		favoriteColor: 'red',
		likesColor: true,
		statusText: ''
  },
  methods: {
    saveOptions() {
      chrome.storage.sync.set({
        favoriteColor: this.favoriteColor,
        likesColor: this.likesColor
      }, async () => {
        this.statusText = 'Options saved.';
        await sleep(700)
        this.statusText = ''
        // setTimeout(() => {
          // this.statusText = ''
        // }, 750)
      });
    },
    restoreOptions() {
      chrome.storage.sync.get({
        favoriteColor: this.favoriteColor, // 设置默认值，不需要也可用数组
        likesColor: this.likesColor
      }, (items) => {
        this.favoriteColor = items.favoriteColor;
        this.likesColor = items.likesColor;
      });
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
        Favorite color:
        <select domPropsValue={this.favoriteColor} onChange={this.onChange.bind(this, 'favoriteColor')}>
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
          <option value="yellow">yellow</option>
        </select>

        <label>
          <input type="checkbox" checked={this.likesColor} onChange={() => this.likesColor = !this.likesColor}/>
          I like colors.
        </label>

        <div>{this.statusText}</div>
        <button onClick={this.saveOptions.bind(this)}>Save</button>
      </div>
    )
  }
})
