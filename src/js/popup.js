import Vue from 'vue'
import { mainConnector, Storage } from './modules/utils'

var port  = new mainConnector();
port.name = "chrome-extension-skeleton";
port.init();
port.onMessage((msg) => {
  // console.log('frontend msg', msg)
})

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
    showPreloader: true
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    this.currentUrl = Urls.feixiaohao + '#' + Storage.getValue('favorUnit', 'CNY')
    console.log(this.currentUrl)
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
