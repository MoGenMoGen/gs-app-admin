import Vue from 'vue';//引入vue
import VueRouter from 'vue-router'      // 引入路由
Vue.use(VueRouter)      // 使用中间件使用路由
import home from "./home/home"
import complete from "./home/complete"
import confirm from "./home/confirm"
import assign from "./home/assign"
import receipt from "./home/receipt"
//定义并初始化路由
const router = new VueRouter({
    routes: [
        //首页
        {
            path: '/',
            component: home,

            children:[
                {
                    //完成工单
                    path:'complete',
                    component:complete
                },
                //确认工单
                {
                    path:'confirm',
                    component:confirm
                },
                //工单指派
                {
                    path:'assign',
                    component:assign
                },
                //接单
                {
                    path:'receipt',
                    component:receipt
                },

            ]
        },

        {
            path: '/home',
            component: home,

            children:[
                {
                    //完成工单
                    path:'complete',
                    component:complete
                },
                //确认工单
                {
                    path:'confirm',
                    component:confirm
                },
                //工单指派
                {
                    path:'assign',
                    component:assign
                },
                //接单
                {
                    path:'receipt',
                    component:receipt
                },

            ]
        },

    ]
})


export default router
