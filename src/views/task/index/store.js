import Vue from 'vue';//引入vue
import Vuex from 'vuex';
Vue.use(Vuex)


// State：vuex中的数据源，我们需要保存的数据就保存在这里，可以在页面通过 this.$store.state来获取我们定义的数据；
const state={
    scrollTop: 0,//列表滚动条位置
    tabPage:'work',//底部tab位置，0，1,2,3


};


const store = new Vuex.Store({
    state,


    // getters，通俗的理解可以认为是getter里的函数就是vuex里的计算属性
    getters: {
        getTop: function (state) {
            return state.scrollTop
        },

    },

    /*
    mutation的意识是突变,每一个mutation都有一个字符串类型的事件类型(type)和回调函数(handler)
    提交载荷（Payload）,你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
     */
    mutations: {
        setTop: (state,position) => state.scrollTop=position,
        setTabPage:(state,page) => state.tabPage=page,

    }


});

export default store;
