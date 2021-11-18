<style lang="less" scoped>
    @import "../../../../assets/css/mobile.less";
    .reportForm{
        background: #F5F2F5;
        .searchTime{
            background: #F5F2F5;
            padding: 0.2rem 2%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            >div{
                flex: 1;
                border: 1px solid #D5D5D5;
                height: 0.5rem;
                border-radius: 0.25rem;
                display: flex;
                align-items: center;
                background: #ffffff;
                color: #999999;
                font-size: 0.22rem;
                p{
                    flex: 1;
                    padding-left: 0.3rem;
                }
                img{
                    width: 0.28rem;
                    margin-right: 0.3rem;
                }
            }
            .btn{
                width: 20vw;
                text-align: center;
                margin-left: 2vw;
                background: #106FB8;
                height: 0.5rem;
                border-radius: 0.25rem;
                line-height: 0.5rem;
                color: #ffffff;
            }
        }
        .menuAll{
            overflow-y: scroll;
            overflow-x: hidden;
            padding-left: 2.5%;
            padding-top: 1rem;
            p{
                float: left;
                border: 1px solid #DAD7DB;
                width: 30%;
                height: 0.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 3%;
                margin-bottom: 0.2rem;
                border-radius: 3px;
                &:nth-of-type(3n+1){
                    margin-left: 0;
                }
            }
            p.active{
                background: #106FB8;
                color: #ffffff;
                border: 1px solid #106FB8;
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
        .list{
            border-bottom: 1px solid #DAD7DB;
            height: 0.77rem;
        }
        .listTitle{
            height: 0.63rem;
            background: #F5F2F5;
        }
        .reportFormMain{
            background: #ffffff;

        }
    }
</style>
<style>

</style>
<template>
    <div class="reportForm">
        <!--更多弹出窗口-->
        <van-popup v-model="showMore" position="right"  :style="{ width: '80%',height:'100vh' }">
            <div class="menuAll" v-if="menuList.length>0">
                <p  v-for="(item,index) in menuList" :key="item.value" :class="{active:item.value==menuId}" @click="choose(index)">{{item.label}}</p>
            </div>
        </van-popup>
        <!--时间选择-->

        <van-popup v-model="timeChoseShow" round position="bottom" :style="{ height: '40%' }" >
            <van-datetime-picker
                    v-show="timeType!='year'"
                    @confirm="timeChoose"
                    @cancel="timeChoseShow = false"
                    v-model="currentDate"
                    :type="timeType"
                    :title="timeTitle"
                    :max-date="maxDate"
            />
            <van-picker
                    v-show="timeType=='year'"
                    title="选择年份"
                    show-toolbar
                    :columns="yearList"
                    @confirm="timeChoose2"
                    @cancel="timeChoseShow = false"
            />
        </van-popup>
        <van-sticky :offset-top="82">
            <div class="searchTime">
                <div @click="toChooseTime">
                    <p>{{time?time : '请选择时间'}}</p><img :src="img"/>
                </div>
                <p class="btn" @click="showMore=true">{{menuList.length>0 ? menuList[menuIndex].label: ''}}</p>
            </div>
            <div class="menuList">
                <p :class="{active:activeId==item.id}" v-for="item in tabList"  @click="typeChange(item)">{{item.nm}}</p>
            </div>
        </van-sticky>
        <div class="reportFormMain">
            <div class="listTitle">
                <p>时间</p>
                <p>出水压力</p>
            </div>
            <div>
                <div class="list" v-for="item in list">
                    <p>{{item.time}}</p>
                    <p>{{item.value}}</p>
                </div>
            </div>
            <!--<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">-->
                <!--<div class="list" v-for="item in list">-->
                    <!--<p>{{item.time}}</p>-->
                    <!--<p>{{item.value}}</p>-->
                <!--</div>-->
            <!--</van-list>-->

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
            menuList:{
                type:Array,
                default:()=>{
                    return []
                }
            }
        },
        data() {
            return {
                time:'',
                showMore:false,
                menuId:'',
                menuIndex:0,
                currentDate:new Date(),
                maxDate:new Date(),
                timeChoseShow:false,
                timeType:'date ',
                timeTitle:'选择年月日',
                img,
                activeId:3,
                tabList:[{
                    nm:'实时',
                    id:3
                },{
                    nm:'日报',
                    id:0
                },{
                    nm:'月报',
                    id:1
                },{
                    nm:'年报',
                    id:2
                }],

                loading: false,
                finished: true,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 10,
                total: 30,
                list:[],
                yearList:[]
            }
        },
        mounted() {
            this.menuId = this.menuList.length> 0 ? this.menuList[0].value : ''
            this.getTime()
            this.getData()
        },
        methods: {
            typeChange(item){
              this.activeId=item.id

              this.getData()
            },
            //选择数据类型  出水压力、进水压力
            choose(index){
                if(this.menuIndex!==index){
                    this.menuIndex = index
                    this.menuId = this.menuList[index].value
                    //这个数据变了要更新下数据

                    this.showMore = false
                    this.getData()
                }

            },
            //年份列表数据设置，取前十年
            getTime(){
              let date = this.until.formatDate()
              this.time = date.year+'-'+date.month+'-'+date.day
              this.yearList = []
              let year = parseInt(date.year)
              for(let i = year-10;i<=year;i++)  {
                  this.yearList.push(i)
              }
            },
            //加载更多
            onLoad() {
                this.pageNo++
                this.getList()
            },
            //筛选条件变化后重新获取数据
            getData(){
                this.list = []
                this.pageNo = 1
                this.getList()
            },
            //接口获取数据
            getList(){
                // this.loading = true
                let param = {
                    pumpNo:this.pumpNo,
                    valNm:this.menuId,
                    type:this.activeId,
                    st:this.time
                }
                this.api.dtlDayYearData(param).then(res=>{
                    if(res.code==200){
                        let x = res.data.time
                        let y = res.data.data
                        this.list = []
                        x.forEach((item,index)=>{
                            this.list.push({
                                time:item,
                                value:y[index]
                            })
                        })
                    }
                })

            },
            //时间选择弹窗显示
            toChooseTime(){
                if(this.activeId==3 || this.activeId==0){
                    this.timeType = 'date'
                    this.timeTitle = '请选择年月日'
                }else if(this.activeId == 1){
                    this.timeType = 'year-month'
                    this.timeTitle = '请选择年月'
                }else if(this.activeId == 2){
                    this.timeType = 'year'
                }
              this.timeChoseShow = true
            },
            //时间选择确定
            timeChoose(e){
                let date = this.until.formatDate(e)
                if(this.timeType = 'year-month'){ //年月
                    this.time = date.year+'-'+date.month
                }else { //年月日
                    this.time = date.year+'-'+date.month+'-'+date.day
                }
                this.timeChoseShow = false
                this.getData()
            },
            timeChoose2(e){
                this.time = e
                this.timeChoseShow = false
                this.getData()
            }
        }
    }
</script>
