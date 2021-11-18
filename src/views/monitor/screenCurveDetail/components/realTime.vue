<style lang="less" scoped>
    @import "../../../../assets/css/mobile.less";
    .realTime{
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
            display: flex;
            align-items: center;
            background: #ffffff;
            border-bottom: 1px solid #DAD7DB;
            height: 0.84rem;
            padding: 0 4%;
            box-sizing: border-box;
            p{
                flex: 1;
                height: 0.84rem;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                text-align: center;
                color: #909090;
            }
            p.active{
                border-bottom: 3px solid #106FB8;
                color: #333333;
                font-weight: bold;
            }
        }
        .realTimeMain{
            h5{
                color: #106FB8;
                font-weight: bold;
                font-size: 0.3rem;
                padding-bottom: 0.25rem;
                width: 92%;
                margin: 0.4rem auto 0.1rem;
            }
            .dataShow{
                width: 92%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 0.18rem;
                p{
                    color: #909090;
                    span{
                        color: #106FB8;
                    }
                }
            }
            .realTimeEcharts{
                margin-top: 0.1rem;
                border-top: 1px solid #DAD7DB;
                background: #ffffff;
                padding-bottom: 0.3rem;
                .echartsMenu{
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding: 0.3rem 0.1rem 0.2rem;
                    p{
                        width: 20%;
                        height: 0.4rem;
                        background: #FFFFFF;
                        border: 1px solid #D7D7D7;
                        border-radius: 0.2rem;
                        color: #909090;
                        font-size: 0.22rem;
                        text-align: center;
                        line-height: 0.4rem;
                    }
                    p.active{
                        background: #106FB8;
                        border: 1px solid #106FB8;
                        color: #ffffff;
                    }
                }
                .dataTable{
                    border-right:1px solid #DDDDDD;
                    border-bottom: 1px solid #DDDDDD;
                    position: relative;
                    width: 96%;
                    margin: 0 auto;
                    display: flex;
                    .left{
                        /*position: absolute;*/
                        /*left: 0;*/
                        width: 1rem;
                        background: #ffffff;
                        border-right: 1px solid #DDDDDD;
                    }
                    p{
                        border-left: 1px solid #DDDDDD;
                        border-top: 1px solid #DDDDDD;
                        color: #909090;
                        text-align: center;
                        line-height: 0.6rem;
                    }
                    p.blue{
                        color: #106FB8;
                    }
                    .right{
                        overflow-x:scroll;
                        flex: 1;
                        flex-wrap: nowrap;
                        display: flex;
                        div{
                            display: inline-block;
                            width: 20vw;
                            flex-shrink: 0;
                        }
                    }
                }
            }
        }
    }
</style>
<style>

</style>
<template>
    <div class="realTime">
        <!--更多弹出窗口-->
        <van-popup v-model="showMore" position="right"  :style="{ width: '80%',height:'100vh' }">
            <div class="menuAll">
                <p  v-for="item in menuList" :key="item.value" :class="{active:item.value==activeId}" @click="choose(item)">{{item.label}}</p>
            </div>
        </van-popup>
        <van-sticky :offset-top="82">
            <div class="menuList" v-if="menuList.length<5">
                <p v-for="item in menuList" :key="item.value" :class="{active:item.value==activeId}" @click="choose(item)">{{item.label}}</p>
            </div>
            <div class="menuList" v-else>
                <p v-for="item in menuList.slice(0,4)" :key="item.value" :class="{active:item.value==activeId}"  @click="choose(item)">{{item.label}}</p>
                <p @click="showMore=true">更多</p>
            </div>
        </van-sticky>
        <div class="realTimeMain">
            <h5>{{newData}}{{unit}}</h5>
            <div class="dataShow">
                <p v-for="item in dataShow">{{item.nm}}：<span>{{item.value}}</span></p>
            </div>
            <div class="dataShow">
                <p v-for="item in dataShow2">{{item.nm}}：<span>{{item.value}}</span></p>
            </div>
            <div class="realTimeEcharts">
                <div class="echartsMenu">
                    <p :class="{active:item.id==echartsId}" v-for="item in echartsMenu" @click="timeChange(item)">{{item.nm}}</p>
                </div>
                <echarts-show :pumpNo="pumpNo" :valNm="activeId" :type="echartsId" ref="echarts"></echarts-show>
                <div class="dataTable">
                    <div class="left">
                        <p>时间</p>
                        <p>数值</p>
                    </div>
                    <div class="right" :style="{width:tableWidth+'%'}">
                        <div v-for="item in tableList">
                            <p>{{item.time}}</p>
                            <p class="blue">{{item.value}}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>

</template>

<script>
    import img from '../img/日期.png'
    import echartsShow from '../../components/echartsShow'
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
    components:{echartsShow},
    data() {
      return {
          unit:'',
          img,
          activeId:'',
          showMore:false,

          newData:'',
          dataShow:[{
              nm:'今日最高',
              value:'0.672'
          },{
              nm:'今日最低',
              value:'0.672'
          },{
              nm:'今日平均',
              value:'0.672'
          }],
          dataShow2:[{
              nm:'昨日最高',
              value:'0.672'
          },{
              nm:'昨日最低',
              value:'0.672'
          },{
              nm:'昨日平均',
              value:'0.672'
          }],
          echartsMenu:[{
              nm:'今日',
              id:0
          },{
              nm:'本月',
              id:1
          },{
              nm:'本年',
              id:2
          },{
              nm:'实时',
              id:3
          }],
          echartsId:3,
          tableList:[{
              time:'00:00',
              value:'0.140'
          },{
              time:'01:00',
              value:'0.140'
          },{
              time:'02:00',
              value:'0.140'
          },{
              time:'03:00',
              value:'0.140'
          },{
              time:'04:00',
              value:'0.140'
          },{
              time:'05:00',
              value:'0.140'
          },{
              time:'06:00',
              value:'0.140'
          }],
          tableWidth:100,
      }
    },
    mounted() {
        this.activeId = this.menuList[0].value
        this.getUnit(this.menuList[0].label)
        this.getData()
        this.getEcharts()
        // this.getTab()
    },
    methods: {
        getUnit(nm){
            //  压力MPa， 电压V，电流A，频率Hz，电能W，时间H ，液位m， 浊度NTU，余氯CL，温度°C，湿度%，分贝
            if(nm.indexOf('压力')!=-1){
                this.unit = 'MPa'
            }else if(nm.indexOf('电压')!=-1){
                this.unit = 'V'
            }else if(nm.indexOf('电流')!=-1){
                this.unit = 'A'
            }else if(nm.indexOf('频率')!=-1){
                this.unit = 'Hz'
            }else if(nm.indexOf('时间')!=-1){
                this.unit = 'H'
            }else if(nm.indexOf('液位')!=-1 || nm.indexOf('积水')!=-1){
                this.unit = 'm'
            }else if(nm.indexOf('浊度')!=-1){
                this.unit = 'NTU'
            }else if(nm.indexOf('余氯')!=-1){
                this.unit = 'CL'
            }else if(nm.indexOf('温度')!=-1){
                this.unit = '°C'
            }else if(nm.indexOf('湿度')!=-1){
                this.unit = '%'
            }else if(nm.indexOf('噪音')!=-1){
                this.unit = 'dB'
            }
        },
        getEcharts(){
            let param = {
                pumpNo:this.pumpNo,
                valNm:this.activeId,
                type:this.echartsId
            }
            this.api.dtlDayYearData(param).then(res=>{
                console.log(res)
                if(res.code==200){
                    let x = res.data.time
                    let y = res.data.data
                    this.tableList = []
                    x.forEach((item,index)=>{
                        this.tableList.push({
                            time:item,
                            value:y[index]
                        })
                    })
                    this.$refs.echarts.drawEcharts(x,y)
                }
            })

        },
        // getTab(){
        //     this.api.getTab().then(res=>{
        //         this.menuList = res
        //         this.activeId = this.menuList[0].value
        //         this.getData()
        //         this.getEcharts()
        //
        //     })
        // },
        getData(){
            let param = {
                pumpNo:this.pumpNo,
                valNm:this.activeId
            }
            this.api.mobDtl(param).then(res=>{
                console.log(res)
                if(res.code==200){
                    this.dataShow[0].value = res.data.todayMax
                    this.dataShow[1].value = res.data.todayMin
                    this.dataShow[2].value = res.data.todayAve

                    this.dataShow2[0].value = res.data.yesterdayMax
                    this.dataShow2[1].value = res.data.yesterdayMin
                    this.dataShow2[2].value = res.data.yesterdayAve

                    this.newData = res.data.newData

                }
            })

        },
        choose(item){
            this.activeId = item.value
             this.getUnit(item.label)
            //这个数据变了要更新下图表
            this.getEcharts()
            this.getData()
            this.showMore = false
        },
        timeChange(item){
            this.echartsId=item.id

            this.getEcharts()

        }
    }
  }
</script>
