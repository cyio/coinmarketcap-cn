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
    this.isPopupWindow = location.href.includes('is_new_win=true')
    let enableAutoRefresh = Storage.getValue('enableAutoRefresh', false)
    if (this.isPopupWindow && enableAutoRefresh) {
      setInterval(() => location.reload(), 15000)
    }
  },
  render (h) { // <-- h must be in scope
    return (
      <div id='app'>
        { this.showPreloader && <div class="preloader"></div> }
        <iframe id="webpage" class={this.showPreloader && 'init'} src={this.currentUrl} width="100%" height="100%" frameborder="0"></iframe>
        {
          !this.isPopupWindow && <button id="btnNewWinPopup" title="popup to new window" onClick={() => openPopupInNewWin()}>popup</button>
        }
      </div>
    )
  }
})
