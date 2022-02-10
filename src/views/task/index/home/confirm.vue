<template>
    <!--    确认工单-->
    <div class="main">
        <div class="content">
            <van-list v-model="loading"  :finished="finished"  finished-text="没有更多了" @load="onLoad"  :immediate-check="immediate">
                <div v-for="item in list" :key="item.id" @click="toDetail(item)" class="listItem">
                    <div class="itemTop" @click="toDetail(item)" >
                        <div>{{item.pumpNo}}<span></span>{{item.pump}}<span></span>{{item.administrativeDivision}}</div>
                    </div>
                    <div  style="margin-left: 10px;padding-bottom: 10px">
                        <span>工单号：{{item.id}}</span>
                    </div>

                    <div class="itemContent">
                        <p><span>派单时间</span>{{item.crtTm}}</p>
                        <p><span>工单来源：</span>{{item.orderSource}}</p>
                        <p><span>接单单位：</span>{{item.receivingNm}}</p>
                        <p><span>接单部门：</span>{{item.deptNm}}</p>
                        <p class="item" v-if="item.type === 0"><span>外协状态：</span>{{item.status | statusFilter}}</p>
                        <p><span>设施状态：</span>{{item.status2 | statusFilter}}</p>
                        <p><span>问题类别：</span>{{item.fault}}</p>
                        <p><span>派单部门：</span>{{item.dispatchDepartment}}</p>
                    </div>
                    <!--<div class="item"><span>派单时间：</span><p>{{item.crtTm}}</p></div>-->
                    <!--<div class="item"><span>工单来源：</span><p>{{item.orderSource}}</p></div>-->
                    <!--<div class="item"><span>接单单位：</span><p>{{item.receivingNm}}</p></div>-->
                    <!--<div class="item"><span>接单部门：</span><p>{{item.deptNm}}</p></div>-->
                    <!--<div class="item"><span>泵房编号：</span><p>{{item.pumpNo}}</p></div>-->
                    <!--<div class="item"><span>泵房名称：</span><p>{{item.pump}}</p></div>-->
                    <!--<div class="item" v-if="item.type === 0"><span>外协状态：</span><p>{{item.status | statusFilter}}</p></div>-->
                    <!--<div class="item"><span>设施状态：</span><p>{{item.status2 | statusFilter}}</p></div>-->
                    <!--<div class="item"><span>问题类别：</span><p>{{item.fault}}</p></div>-->
                    <!--<div class="item"><span>派单部门：</span><p>{{item.dispatchDepartment}}</p></div>-->
                    <!--<img src="./img/arrow.png" >-->
                </div>
            </van-list>

        </div>

        <van-popup  v-model="showConfirm"  position="top" :styles="{height:'100%'}">
            <confirm-form :id="comfirmId"  @closeConfirm="closeConfirm" v-if="showConfirm"> </confirm-form>
        </van-popup>
        <van-popup   v-model="show"  position="top"   :style="{ height: '100%' }">
            <detail :id="detailId" :type="type"  @closeInfo="closeInfo" v-if="show" @reList="onRefresh"></detail>
        </van-popup>
    </div>
</template>

<script>
    import detail from "../detail/detail";
    import confirmForm from "../confirmForm/confirmForm";
    export default {
        name: "confirm",
        components:{
            confirmForm,
            detail,
        },
        filters:{
            statusFilter(val){
                switch(val) {
                    case 0:
                        return '等待初次确认';
                    case 1:
                        return '等待接单';
                    case 2:
                        return '已接单';
                    case 3:
                        return '已处理，等待确认';
                    case 4:
                        return '完成';
                    case 5:
                        return '已回访';
                    default:
                }
            }
        },
        data(){
            return{
                show:false,
                showConfirm:false,
                comfirmId:'',
                type:2,
                detailId:'',
                immediate:false,//初始化不加载必须用变量
                pageNo:1,
                pageSize:10,
                loading:false,
                finished:false,
                list:[],
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            closeInfo(){
                this.show=false
            },
            toDetail(item){
                this.show=true;
                this.detailId=item.id
            },
            closeConfirm(){
                this.showConfirm=false
            },
            onLoad(){
                this.getList()
            },
            getList(){
                let qry = this.query.new();
                this.query.toO(qry, "crtTm",  "desc");
                // this.query.toW(qry, "status", "3,0", "IN");
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.api.getTaskOrder2(encodeURIComponent(this.query.toJsonStr(qry))).then(res=>{
                    this.list.push(...res.data.list);
                    // 加载状态结束
                    this.finished = this.list.length >= res.page.total;
                    this.loading = false;
                    this.pageNo++
                    // 数据全部加载完成
                })
            },
            onRefresh(id) {
               //删除列表中的数据
                this.list = this.list.filter(item => item.id !== id)

            }
        }
    }
</script>

<style scoped lang="less">
    .main{
        min-height: 100vh;
        background: #F5F2F5;
    }
    .listItem{
        background: #ffffff;
        border-radius: 0.1rem;
        margin: 0 auto 0.15rem;
        width: 96%;
        .itemTop{
            display: flex;
            align-items: center;
            height: 1rem;
            width: 95%;
            margin: 0 auto;
            div:first-of-type{
                flex: 1;
                display: flex;
                align-items: center;
                span{
                    display: inline-block;
                    width: 1px;
                    height: 0.1rem;
                    background: #000000;
                    opacity: 0.2;
                    margin: 0 0.2rem;
                }
                p{
                    height: 0.45rem;
                    line-height: 0.45rem;
                    padding: 0 0.1rem;
                    border-radius: 3px;
                    color: #ffffff;
                    margin-left: 0.2rem;
                }
            }
        }


        .itemContent{
            width: 95%;
            margin: 0 auto;
            border-top:1px solid #E9E9E9;
            padding: 0.2rem 0;
            p{
                display: flex;
                align-items: center;
                padding: 0.1rem 0;
                >span{
                    color: #909090;
                    width: 1.3rem;
                    display: inline-block;
                    flex-shrink: 0;
                }
            }

        }
    }
    /*
        内容区域
         */
    .content{

        /*每一个循环块*/
        .block{
            font-size: 14px;
            background: white;
            border-bottom: 1px solid #F5F2F5;
            /*顺序为上右下左（顺时针）。*/
            padding: 0.3rem 0.4rem 0.3rem 0.4rem;
            position: relative;
            /*每一条数据
           */
            .item{
                padding-top: 0.13rem;
                padding-bottom: 0.13em;
                display: flex;
                /*左侧label*/
                span{
                    flex: 4;
                    color: #999999;
                }
                /*右侧内容*/
                p{
                    flex: 14;
                    color: #333333;

                }
            }
            /*箭头符号*/
            img{
                position: absolute;
                width: 20px;
                height: 20px;
                top:50%;
                transform: translateY(-50%);
                right: 15px;
            }
        /*    确认按钮*/
        /*    button{*/
        /*        position: absolute;*/
        /*        bottom: 20px;*/
        /*        right: 15px;*/
        /*        color: #106FB8;*/
        /*        background: none;*/
        /*        border: 1px solid #106FB8;*/
        /*        font-size: 0.07rem;*/
        /*        padding-left: 0.15rem;*/
        /*        padding-right: 0.15rem;*/
        /*        padding-top: 0.05rem;*/
        /*        padding-bottom: 0.05rem;*/
        /*        border-radius: 3px;*/
        /*    }*/

        }
    }




</style>
