import Vue from 'vue'
import { Storage, openPopupInNewWin } from './modules/utils'

Vue.config.productionTip = false
Vue.config.devtools = false

const Urls = {
  feixiaohao: 'http://m.feixiaohao.com/',
  coinmarketcap: 'https://coinmarketcap.com/'
}

var app = new Vue({
  el: '#app',
  data: {
    currentUrl: '',
    showPreloader: true,
    isPopupWindow: false
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    this.currentUrl = Urls[Storage.getValue('site', 'coinmarketcap')] + '#' + Storage.getValue('favorUnit', 'CNY')
    setTimeout(() => this.showPreloader = false, 400) 
  },
  render (h) { // <-- h must be in scope
    return (
      <div id='app'>
        { this.showPreloader && <div class="preloader"></div> }
        <iframe id="webpage" class={this.showPreloader && 'init'} src={this.currentUrl} width="100%" height="100%" frameborder="0"></iframe>
      </div>
    )
  }
})
