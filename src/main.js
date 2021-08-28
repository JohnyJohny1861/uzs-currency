import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCurrencyFilter from 'vue-currency-filter';

Vue.config.productionTip = false;

Vue.use(VueCurrencyFilter, {
  symbol : '',
  symbolPosition: 'front',
  thousandsSeparator: ',',
  fractionSeparator: '.',
  fractionCount: 2,
  symbolSpacing: false,
  avoidEmptyDecimals: '',
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
