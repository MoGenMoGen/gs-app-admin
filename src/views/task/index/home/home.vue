<template>
<!--    主页
0.1rem=10px
-->
    <div>
        <van-sticky>
            <my-header title="任务派单管理" @back="back" @search="search" :add-status="true" @add="newTask" ></my-header>

        <task-tab class="my-tabbar" ref="myTabber"></task-tab>
        </van-sticky>
        <div style="height: 50px"></div>
        <router-view></router-view>

    </div>
</template>

<script>
    import taskTab from "../../../../components/taskTab/taskTab";
    import myHeader from "../../../../components/myHeader/myHeader";

    export default {
        mounted(){
            if(this.until.seGet('taskTab')){
                this.$refs.myTabber.setSelect(this.until.seGet('taskTab'));
            }else{
                this.$refs.myTabber.setSelect('assign');
            }

        },
        name: "home",
        methods:{
            //返回
            back(){
              this.until.back()
            },
            //新建工单
            newTask(){
                this.until.href('./newTask.html')
            },
            //搜索
            search(){
                this.until.href('./search.html')
            }

        },
        data(){
            return{
                title:'任务派单管理'
            }
        },
        components:{
            taskTab,
            myHeader,
        }
    }
</script>

<style scoped lang="less">

.right{
    /*button{*/
    /*    color: white;*/
    /*    background: none;*/
    /*    border: 1px solid white;*/
    /*    font-size: 0.07rem;*/
    /*    padding-left: 0.15rem;*/
    /*    padding-right: 0.15rem;*/
    /*    padding-top: 0.05rem;*/
    /*    padding-bottom: 0.05rem;*/
    /*    border-radius: 3px;*/
    /*}*/
    /*img{*/
    /*    width: 0.4rem;*/
    /*    height: 0.4rem;*/
    /*    margin-left: 0.3rem;*/
    /*}*/

}


/*.tabbar-place{*/
/*    width: 100%;*/
/*    height: 60px;*/
/*    background: red;*/
/*}*/
</style>

