<style lang="less" scoped>
    @import "../../../../assets/css/mobile.less";
    .reportForm{
        background: #F5F2F5;
        .searchTime{
            background: #F5F2F5;
            padding: 0.2rem 0;
            >div{
                width: 94%;
                margin: 0 auto;
                border: 1px solid #D5D5D5;
                height: 0.5rem;
                border-radius: 0.25rem;
                display: flex;
                align-items: center;
                background: #ffffff;
                color: #999999;
                font-size: 0.22rem;
            }
            p{
                flex: 1;
                padding-left: 0.3rem;
            }
            img{
                width: 0.28rem;
                margin-right: 0.3rem;
            }
        }
        .listTitle,.list{
            display: flex;
            align-items: center;
            p{
                text-align: center;
                flex: 1;
                height: 0.8rem;
                line-height: 0.8rem;
                &:nth-of-type(5),&:nth-of-type(6),&:nth-of-type(7){
                    flex: 2;
                }
            }
        }

        .listTitle{
            color: #909090;
            p{
                background: #F5F2F5;
            }
        }
        .reportFormMain{
            background: #ffffff;
            -webkit-overflow-scrolling: touch;
            /*flex: 1;*/
            /*overflow-x: scroll;*/

            .touch{
                width: 100vw;
                overflow: scroll;
                >div{
                    width: 200vw;
                }
                /*overflow-x: scroll;*/
                /*-webkit-overflow-scrolling: touch;*/
            }
            .list{
                height: 0.77rem;
                p{
                    border-bottom: 1px solid #DAD7DB;

                }
            }
        }
    }
</style>
<style>

</style>
<template>
    <div class="reportForm">
        <!--时间选择-->
        <van-popup v-model="timeChoseShow" round position="bottom" :style="{ height: '40%' }" >
            <van-datetime-picker
                    @confirm="timeChoose"
                    @cancel="timeChoseShow = false"
                    v-model="time"
                    type="date"
                    title="选择年月日"
                    :max-date="maxDate"
            />

        </van-popup>
        <van-sticky :offset-top="82">
            <div class="searchTime">
                <div @click="toChooseTime">
                    <p>{{time?time : '默认实时报警'}}</p><img :src="img"/>
                </div>

            </div>

        </van-sticky>
        <div class="reportFormMain">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
                <div class="touch">
                    <div>
                        <div class="listTitle">
                            <p>泵房编号</p>
                            <p>泵房名称</p>
                            <p>分区</p>
                            <p>报警类型</p>
                            <p>报警内容</p>
                            <p>设备商</p>
                            <p>保养单位</p>
                            <p>警报时间</p>
                            <p>状态</p>
                        </div>
                        <div class="list" v-for="item in list">
                            <p>{{item.time}}</p>
                            <p>{{item.value}}</p>
                            <p>{{item.value}}</p>
                            <p>{{item.value}}</p>
                            <p>{{item.value}}</p>
                            <p>{{item.value}}</p>
                            <p>{{item.time}}</p>
                            <p>{{item.value}}</p>
                            <p>{{item.value}}</p>
                        </div>
                    </div>

                </div>

            </van-list>


        </div>
    </div>

</template>

<script>
    import img from '../img/日期.png'
    export default {
        props:{
            title:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                time:'',
                currentDate:new Date(),
                maxDate:new Date(),
                timeChoseShow:false,
                img,
                loading: false,
                finished: false,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 10,
                total: 30,
                list:[{
                    time:'11-05  17:59',
                    value:'0.510'
                },{
                    time:'11-05  17:59',
                    value:'0.510'
                },{
                    time:'11-05  17:59',
                    value:'0.510'
                },{
                    time:'11-05  17:59',
                    value:'0.510'
                },{
                    time:'11-05  17:59',
                    value:'0.510'
                },{
                    time:'11-05  17:59',
                    value:'0.510'
                },{
                    time:'11-05  17:59',
                    value:'0.510'
                },{
                    time:'11-05  17:59',
                    value:'0.510'
                }],
            }
        },
        mounted() {
        },
        methods: {

            onLoad() {
                console.log('onLoad')
                this.getList()
            },
            getList(){
                console.log('getList')
                this.loading = true
                if(this.list.length<this.total){
                    this.list.push(...this.list)
                    console.log(this.list.length)
                    this.loading = false
                }else {
                    console.log('finished')
                    this.finished = true
                }
            },
            toChooseTime(){
                this.timeChoseShow = true
            },
            timeChoose(e){
                console.log(e)
                this.timeChoseShow = false
            }
        }
    }
</script>
