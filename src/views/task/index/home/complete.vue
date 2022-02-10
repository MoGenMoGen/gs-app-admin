<template>
    <!--    完成工单-->
    <div>
        <div class="content">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad" :immediate-check="immediate" >
                <div  class="block" v-for="item in list" :key="item.id" @click="toDetail(item)">
                    <div class="item"><span>工单号：</span><p>{{item.id}}</p></div>
                    <div class="item"><span>工单来源：</span><p>{{item.orderSource}}</p></div>
                    <div class="item"><span>接单单位：</span><p>{{item.receivingNm}}</p></div>
                    <div class="item"><span>接单部门：</span><p>{{item.deptNm}}</p></div>
                    <div class="item"><span>泵房编号：</span><p>{{item.pumpNo}}</p></div>
                    <div class="item"><span>泵房名称：</span><p>{{item.pump}}</p></div>
                    <div class="item"><span>处理状态：</span><p>{{item.status | statusFilter}}</p></div>
                    <div class="item"><span>问题类别：</span><p>{{item.fault}}</p></div>
                    <div class="item"><span>派单部门：</span><p>{{item.dispatchDepartment}}</p></div>
                    <div class="item"><span>派单时间：</span><p>{{item.crtTm}}</p></div>
                    <img src="./img/arrow.png" >
                </div>
            </van-list>

        </div>

        <van-popup  v-model="show"  position="top" :styles="{height:'100%'}">
            <detail :id="detailId" :type="type"  @closeInfo="closeInfo" v-if="show"></detail>
        </van-popup>
    </div>
</template>

<script>
    import detail from "../detail/detail";
    export default {
        name: "complete",
        components:{
          detail,
        },
        mounted(){
            this.getList()
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
        methods:{
            closeInfo(){
                this.show=false
            },
            toDetail(item){
                this.show=true
                this.detailId=item.id
            },
            onLoad(){
                this.getList()
            },
            getList(){
                let qry = this.query.new();
                this.query.toO(qry, "crtTm",  "desc");
                this.query.toW(qry, "status", "4,5", "IN");
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.api.getTaskOrder(encodeURIComponent(this.query.toJsonStr(qry))).then(res=>{
                    this.list.push(...res.data.list)
                    // 加载状态结束
                    if (this.list.length >= res.page.total) {
                        this.finished = true;
                    }else{
                        //这里要将finished的值变回false，
                        this.finished=false
                    }
                    this.loading = false;

                    this.pageNo++
                    // 数据全部加载完成

                })
            }
        },
        data(){
            return{
                type:3,
                detailId:'',
                immediate:false,//初始化不加载必须用变量
                pageNo:1,
                pageSize:10,
                loading:false,
                finished:false,
                show:false,
                list:[

                ]
            }
        }
    }
</script>

<style scoped lang="less">

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


        }
    }

</style>
