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
        .listTitle{
            color: #909090;
            td{
                line-height: 0.8rem;
                text-align: center;
                background: #F5F2F5;
                width: 10%;
                &:nth-of-type(1),&:nth-of-type(9),&:nth-of-type(8){
                    width: 8%;
                }
                &:nth-of-type(3){
                    width: 6%;
                }
                &:nth-of-type(5),&:nth-of-type(6),&:nth-of-type(7){
                    width: 16%;
                }
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
                    width: 250vw;
                }
                /*overflow-x: scroll;*/
                /*-webkit-overflow-scrolling: touch;*/
            }
            table{
                margin: 0;
                padding: 0;
                width: 100%;
            }
            .list{
                td{
                    padding: 0.1rem;
                    border-bottom: 1px solid #DAD7DB;
                    text-align: center;
                    line-height: 0.3rem;

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
                    v-model="currentDate"
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
                        <table>
                            <thead>
                            <tr  class="listTitle">
                                <td>泵房编号</td>
                                <td>泵房名称</td>
                                <td>分区</td>
                                <td>报警类型</td>
                                <td>报警内容</td>
                                <td>设备商</td>
                                <td>保养单位</td>
                                <td>警报时间</td>
                                <td>状态</td>
                            </tr>

                            </thead>
                            <tr class="list" v-for="item in list">
                                <td>{{item.pumpNo}}</td>
                                <td>{{item.pumpNm}}</td>
                                <td>{{item.nm}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.reason}}</td>
                                <td>{{item.equipmentNm}}</td>
                                <td>{{item.maintenanceNm}}</td>
                                <td>{{item.startTm}}</td>
                                <td>{{item.status}}</td>
                            </tr>
                        </table>
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
            pumpNo:{
                type:String,
                default:''
            },
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
                list:[],
            }
        },
        mounted() {
            this.$nextTick(()=>{
                console.log('mounted:'+this.pumpNo)

                this.getList()

            })
        },
        methods: {

            onLoad() {
                console.log('onLoad:'+this.pumpNo)
                this.pageNo++
                this.getList()
            },
            getList(){
                this.loading = true
                let qry = this.query.new();
                if(this.time){
                    this.query.toW(qry,'startTm',this.time,'LK')
                }
                this.query.toW(qry,'pumpNo',this.pumpNo,'EQ')
                this.query.toP(qry,this.pageNo,this.pageSize)
                this.api.getAlarmList(encodeURIComponent(this.query.toJsonStr(qry))).then(res=>{
                    console.log(res)
                    if(res.code==200){
                        this.list.push(...res.data.list)
                        this.total = res.page.total
                        console.log(this.list.length)
                        console.log(this.total)
                        if(this.total<=this.list.length){
                            this.finished = true
                        }else {
                            this.finished = false
                        }
                        this.loading = false
                    }
                })
            },
            toChooseTime(){
                this.timeChoseShow = true
            },
            timeChoose(e){
                console.log(e)
                let date = this.until.formatDate(e)
                this.time = date.year+'-'+date.month+'-'+date.day
                this.timeChoseShow = false
                this.list = []
                this.pageNo = 1
                this.getList()
            }
        }
    }
</script>
