<template>
<!--    工单详情-->
    <div class="main">


        <my-header :title="title"  @back="back">
            <van-icon name="arrow-left" slot="left" color="white" ></van-icon>

            <div class="right" slot="right">
                <button >新建</button>
                <img src="./img/search.png" @click="search">
            </div>

        </my-header>
        <div class="content2">
            <div  class="block2" >
                <h2>工单信息</h2>
                <div><span>工单来源：</span><p>{{info.orderSource}}</p></div>
                <div><span>部门名称：</span><p>{{info.receivingNm}}</p></div>
                <div><span>派单时间：</span><p>{{info.crtTm}}</p></div>
                <div><span>处理时限：</span><p>{{info.processingDeadline}}</p></div>
                <div><span>反映人：</span><p>{{info.reflecting}}</p></div>
                <div><span>联系人电话：</span><p>{{info.reflectingPhone}}</p></div>
                <div><span>故障现象分类：</span><p>{{info.fault}}</p></div>

                <div><span>行政区域：</span><p>{{info.administrativeDivision}}</p></div>
                <div><span>泵房名称：</span><p>{{info.pump}}</p></div>
                <div><span>问题详情：</span><p>{{info.problem}}</p></div>
                <div><span>接单备注：</span><p>{{info.remarks}}</p></div>
            </div>
            <!--                执行单位-->
            <div  class="block2" >
                <h2>回执信息</h2>
                <div><span>初次确认时间：</span><p>{{info.initialConfirmationTm}}</p></div>
                <div><span>初次确认人员：</span><p>{{info.initialConfirmationNm}}</p></div>
                <div><span>最终确认时间：</span><p>{{info.finalConfirmationTm}}</p></div>
                <div><span>最终确认人员：</span><p>{{info.finalConfirmationNm}}</p></div>

            </div>
            <div  class="block2" >
                <h2>处理信息</h2>
                <div><span>接单时间：</span><p>{{info.orderTm}}</p></div>
                <div><span>工单完成时间：</span><p>{{info.orderCompletionTm}}</p></div>
                <div><span>接单人员：</span><p>{{info.orderClerk}}</p></div>
                <div><span>接单人电话：</span><p>{{info.orderClerkPhone}}</p></div>
                <div><span>故障类型：</span><p>{{info.faultType}}</p></div>
                <div><span>故障原因：</span><p>{{info.cause}}</p></div>
                <div><span>处理记录：</span><p>{{info.processingRecords}}</p></div>
                <div><span>处理前照片：</span><p>{{info.img1}}</p></div>
                <div><span>处理后照片：</span><p>{{info.img2}}</p></div>
            </div>
            <div  class="block2" >
                <h2>回访信息</h2>
                <div><span>回访时间：</span><p>{{info.revisitTm}}</p></div>
                <div><span>人员名称：</span><p>{{info.returnUser}}</p></div>
                <div><span>回访情况：</span><p>{{info.returnVisit}}</p></div>
<!--                <div><span>回访结果：</span><p>{{info.returnVisitResults}}</p></div>-->
                <div><span>客户满意度：</span><p>{{info.customerSatisfaction}}</p></div>
            </div>
        </div>


    </div>
</template>

<script>
    import myHeader from "../../../../components/myHeader/myHeader";
    export default {
        name: "detail",
        props:["id"],
        data(){
            return{
                title:'工单详情',
                info:{

                }

            }
        },
        components:{
            myHeader,
        },
        mounted(){
          this.getInfo(this.id);
        },
        methods:{
            search(){

            },
            getInfo(id){
                this.api.getTaskInfo(id).then(res=>{
                    window.console.log(res)
                    this.info=res.data

                })
            },
            back(){
                console.log(123)
                this.$emit('closeInfo');
            }
        },
    }
</script>

<style scoped lang="less">

    .main{
        height: 100%;
        width: 100%;

    }
    /*
        弹框，内容区域
         */
    .content2{
        /*每一个循环块*/
        background:  #F0F0F0;
        height: 100%;
        .block2{
            background: white;
            border-bottom: 0.25rem solid #F0F0F0;
            /*顺序为上右下左（顺时针）。*/
            padding-top: 0.3rem;
            padding-bottom: 0.2rem;
            position: relative;

            /*每一条数据
            不包括最后一条*/
            div{
                font-size: 14px;
                padding-bottom: 0.2rem;
                padding-left:0.4rem;
                padding-right:0.4rem;
                display: flex;
                /*左侧label*/
                span{
                    /*flex: 6;*/
                    color: #999999;


                }
                /*右侧内容*/
                p{
                    color: #333333;


                    /*flex: 14;*/


                }
            }
            h2{
                padding-top: 0.1rem;
                padding-left:0.4rem;
                padding-right:0.4rem;
                padding-bottom: 0.2rem;
                color:  #1B1B1B;
                font-size: 0.31rem;
                margin-bottom: 0.21rem;
                border-bottom: 1px solid #DADADA;

            }

        }

    }

    .right{
        button{
            /*占位隐藏，保证搜索框位置不变*/
            visibility:hidden;
            color: white;
            background: none;
            border: 1px solid white;
            font-size: 0.07rem;
            padding-left: 0.15rem;
            padding-right: 0.15rem;
            padding-top: 0.05rem;
            padding-bottom: 0.05rem;
            border-radius: 3px;
        }
        img{
            visibility: hidden;
            width: 0.4rem;
            height: 0.4rem;
            margin-left: 0.3rem;
        }

    }

</style>
