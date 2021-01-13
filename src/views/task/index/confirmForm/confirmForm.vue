<template>
<!--    工单确认详情-->
    <div class="main">
        <my-header :title="title"  @back="back">
            <van-icon name="arrow-left" slot="left" color="white" ></van-icon>

            <div class="right" slot="right">
                <button >新建</button>
<!--                <img src="./img/search.png" @click="search">-->
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
            <div  class="block3" >
                <h2>处理信息</h2>
                <div><span>接单时间：</span><p>{{info.orderTm}}</p></div>
                <div><span>工单完成时间：</span><p>{{info.orderCompletionTm}}</p></div>
                <div><span>接单人员：</span><p>{{info.orderClerk}}</p></div>
                <div><span>接单人电话：</span><p>{{info.orderClerkPhone}}</p></div>
                <div><span>故障类型：</span><p>{{info.faultType}}</p></div>
                <div><span>故障原因：</span><p>{{info.cause}}</p></div>
                <div><span>处理记录：</span><p>{{info.processingRecords}}</p></div>
            </div>
        </div>



<!--        <div class="div-button">-->
<!--            <button @click="submit">提交</button>-->
<!--            <button>重置</button>-->
<!--        </div>-->

    </div>
</template>

<script>

    import myHeader from "../../../../components/myHeader/myHeader";
    export default {
        name: "detail",
        props:["id","type"],
        data(){
            return{
                title:'工单指派编辑',
                info:{

                }

            }
        },
        components:{
            myHeader
        },
        mounted(){
          this.getInfo(this.id);
        },
        methods:{
            //工单确认提交
            submit(){



            },
            search(){

            },
            getInfo(id){
                this.api.getTaskInfo(id).then(res=>{
                    this.info=res.data

                })
            },
            back(){
                this.$emit('closeConfirm');
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
        background:  white;
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
        .block3{
            /*border-bottom: 0.25rem solid white;*/
            background: white;
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
    .div-button{

        padding-top: 25px;
        padding-bottom: 45px;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        button:nth-of-type(1){
            background: #106FB8;
            color: white;
            border: none;
            flex: 1;
            border-radius: 5px;
            margin-left: 20px;
            margin-right: 10px;
            height: 40px;
        }
        button:nth-of-type(2){
            background: white;
            color: #999999;
            border: 1px solid #DEDEDE;
            border-radius: 5px;
            flex: 1;
            margin-right: 20px;
            margin-left: 10px;
            height: 40px;
        }
    }

</style>
