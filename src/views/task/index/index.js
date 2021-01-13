import Vue from "vue";
import init from "assets/js/init.js";
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(init);
Vue.use(Vant);
import App from "./App";
import router from './router'
import store from "./store";
new Vue({
  router,//路由
  store,//vuex
  render: h => h(App)
}).$mount("#container");
