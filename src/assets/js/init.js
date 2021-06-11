
require("assets/css/common.css");
import "assets/js/ScreenAdaptive.js";
import "babel-polyfill"; // 解决 IE11 Promise对象未定义
import axios from "axios";
import { until, reg, app } from "assets/js/until";
import "assets/js/wconfig.js";
import "./iconfont"; //字体库
import "./wconfig.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myPopup from "../../components/myPopup/myPopup";
import query from "assets/js/query2";
import { api } from "./api";
import tab from "components/tab";
import myHeader from "components/myHeader2";
import mainHeader from "components/mainHeader";
import { LoadingPlugin } from "vux";
// import MintUI from "mint-ui";
// import "mint-ui/lib/style.css";
import Vant from 'vant';
import 'vant/lib/index.css';
import infiniteScroll from "vue-infinite-scroll";
require("video.js/dist/video-js.css");
import Bridge from './jsBridge.js'
require("vue-video-player/src/custom-theme.css");

// import Vconsole from 'vconsole';
// let vConsole = new Vconsole()


export default {
  install(Vue) {
    Vue.component("myPopup",myPopup);
    Vue.component("tab", tab);
    Vue.component("myHeader", myHeader);
    Vue.component("mainHeader", mainHeader);
    Vue.use(Vant);
    Vue.use(ElementUI);
    // Vue.use(MintUI);
    Vue.use(infiniteScroll);
    Vue.prototype.axios = axios;
    Vue.prototype.until = new until();
    Vue.prototype.reg = new reg();
    Vue.prototype.app = new app();
    Vue.prototype.query = query;
    Vue.prototype.api = new api();
    Vue.prototype.$bridge = Bridge;
    Vue.use(LoadingPlugin);


  }
};
