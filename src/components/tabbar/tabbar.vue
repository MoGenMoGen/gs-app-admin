<template>
    <div class="tabberWarp" >


<!--        1、Tabbar.vue文件和Item.vue的关系为父子关系。
            2、Tabbar.vue组件通过v-for循环tabbarDes里面的数据。再通过props向下传递数据给子组件.
            3、Item.vue能接受到父组件传递的数据。
            4、然后在Item.vue组件绑定点击事件。-->
        <tab-item :txt='item.txt' :page='item.page' @change='getVal' v-for='item in tabbarDes' :key="item.page" :sel='selected'>

            <!--                <img :src="item.normalImg" slot='normalImg'>-->
            <!--                <img :src="item.activeImg" slot='activeImg'>-->
        </tab-item>
    </div>

</template>

<script>
    import tabItem from './tabItem.vue'
    export default {
        name: "tabbar",
        components:{
            tabItem
        },
        data:function(){
            return{
                selected:'assign',//默认选中第一个tab
                tabbarDes:[
                    {
                        txt:'工单指派',
                        page:'assign',
                        normalImg:require('./tab/img1.png'),
                        activeImg:require('./tab/img11.png')

                    },
                    {
                        txt:'工单确认',
                        page:'confirm',
                        normalImg:require('./tab/img2.png'),
                        activeImg:require('./tab/img22.png')
                    },
                    {
                        txt:'完成工单',
                        page:'complete',
                        normalImg:require('./tab/img3.png'),
                        activeImg:require('./tab/img33.png')
                    },
                    // {
                    //     txt:'消息中心',
                    //     page:'message',
                    //     normalImg:require('./tab/img4.png'),
                    //     activeImg:require('./tab/img44.png')
                    // },

                ]
            }
        },
        methods:{
            getVal:function(res){
                this.selected = res;
                this.$store.commit('setTabPage',this.selected)

            },


        }

    }
</script>

<style scoped lang="less">


    .tabberWarp{
        position: fixed;
        top:1.3rem;
        z-index: 600;
        height: 50px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #DAD7DB;
        width: 100%;

    }

</style>
