<template>
    <div class="tabberWarp" >

        <div :page='item.page' v-for='item in tabbarDes'
             :key="item.page"
             :class="{active:selected==item.page}" @click="selected=item.page">
            {{item.txt}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "taskTab",
        data(){
            return{
                selected:'',//默认选中第一个tab
                tabbarDes:[
                    {
                        txt:'工单指派',
                        page:'assign',


                    },
                    {
                        txt:'工单确认',
                        page:'confirm',

                    },
                    {
                        txt:'完成工单',
                        page:'complete',

                    },
                    {
                        txt:'工单接单',
                        page:'receipt',

                    },

                ]
            }
        },
        watch:{
            selected(newVal){
                this.$router.replace({
                    path:'/'+newVal,
                });
            }
        },
        methods:{
            setSelect(s){
                this.selected=s
            }

        }
    }
</script>

<style scoped lang="less">
    .tabberWarp{
        position: fixed;
        z-index: 600;
        height: 50px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #DAD7DB;
        color: #999999;
        width: 100%;
        div{
            height: 100%;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            font-size: 0.32rem;
        }

    }
    .active{
        color: #106FB8;
        border-bottom: 2px solid #106FB8;
    }
</style>
