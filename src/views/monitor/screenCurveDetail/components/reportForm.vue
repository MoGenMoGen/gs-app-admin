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
        .menuList{
            background: #ffffff;
            border-bottom: 1px solid #DAD7DB;
            border-top: 1px solid #DAD7DB;
            height: 0.83rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            p{
                height: 0.83rem;
                line-height: 0.83rem;
                padding: 0 0.2rem;
                color: #909090;
                font-size: 0.26rem;
            }
            p.active{
                border-bottom: 3px solid #106FB8;
                color: #333333;
            }
        }
        .listTitle,.list{
            display: flex;
            align-items: center;
            p{
                text-align: center;
                &:first-of-type{
                    width: 35vw;
                }
                &:last-of-type{
                    width: 65vw;
                }
            }
        }

        .listTitle{
            height: 0.63rem;
            background: #F5F2F5;
        }
        .reportFormMain{
            background: #ffffff;
            .list{
                border-bottom: 1px solid #DAD7DB;
                height: 0.77rem;
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
                    v-show="timeType!='year'"
                    @confirm="timeChoose"
                    @cancel="timeChoseShow = false"
                    v-model="time"
                    :type="timeType"
                    title="选择年月日"
                    :max-date="maxDate"
            />
            <van-picker
                    v-show="timeType=='year'"
                    title="选择年份"
                    show-toolbar
                    :columns="yearList"
                    @confirm="timeChoose"
                    @cancel="timeChoseShow = false"
            />
        </van-popup>
        <van-sticky :offset-top="82">
            <div class="searchTime">
                <div @click="toChooseTime">
                    <p>{{time?time : '请选择时间'}}</p><img :src="img"/>
                </div>

            </div>
            <div class="menuList">
                <p :class="{active:activeId==item.id}" v-for="item in menuList"  @click="activeId=item.id">{{item.nm}}</p>
            </div>
        </van-sticky>
        <div class="reportFormMain">
            <div class="listTitle">
                <p>时间</p>
                <p>出水压力</p>
            </div>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
                <div class="list" v-for="item in list">
                    <p>{{item.time}}</p>
                    <p>{{item.value}}</p>
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
                timeType:'date ',
                img,
                activeId:1,
                menuList:[{
                    nm:'实时',
                    id:1
                },{
                    nm:'日报',
                    id:2
                },{
                    nm:'月报',
                    id:3
                },{
                    nm:'年报',
                    id:4
                }],

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
                yearList:[]
            }
        },
        mounted() {
            this.getTime()
        },
        methods: {
            getTime(){
              let date = this.until.formatDate()
              this.time = date.year+'-'+date.month+'-'+date.day
              this.yearList = []
              let year = parseInt(date.year)
              for(let i = year-10;i<=year;i++)  {
                  this.yearList.push(i)
              }
            },
            onLoad() {
                this.getList()
            },
            getList(){
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
                if(this.activeId==1 || this.activeId==2){
                    this.timeType = 'date'
                }else if(this.activeId == 3){
                    this.timeType = 'year-month'
                }else if(this.activeId == 4){
                    this.timeType = 'year'
                }
              this.timeChoseShow = true
            },
            timeChoose(e){
                console.log(e)
                this.timeChoseShow = false
            }
        }
    }
</script>
