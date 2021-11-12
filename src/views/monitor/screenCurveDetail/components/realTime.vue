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
                <p  v-for="item in menuList" :key="item.id" :class="{active:item.id==activeId}" @click="choose(item)">{{item.nm}}</p>
            </div>
        </van-popup>
        <van-sticky :offset-top="82">
            <div class="menuList" v-if="menuList.length<5">
                <p v-for="item in menuList" :key="item.id" :class="{active:item.id==activeId}" @click="activeId=item.id">{{item.nm}}</p>
            </div>
            <div class="menuList" v-else>
                <p v-for="item in menuList.slice(0,4)" :key="item.id" :class="{active:item.id==activeId}"  @click="activeId=item.id">{{item.nm}}</p>
                <p @click="showMore=true">更多</p>
            </div>
        </van-sticky>
        <div class="realTimeMain">
            <h5>0.540Mpa</h5>
            <div class="dataShow">
                <p v-for="item in dataShow">{{item.nm}}：<span>{{item.value}}</span></p>
            </div>
            <div class="dataShow">
                <p v-for="item in dataShow2">{{item.nm}}：<span>{{item.value}}</span></p>
            </div>
            <div class="realTimeEcharts">
                <div class="echartsMenu">
                    <p :class="{active:item.id==echartsId}" v-for="item in echartsMenu" @click="echartsId=item.id">{{item.nm}}</p>
                </div>
                <echarts-show></echarts-show>
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
        title:{
            type:String,
            default:''
        }
    },
    components:{echartsShow},
    data() {
      return {
          img,
          activeId:1,
          showMore:false,
          menuList:[
              {
                  nm:'出水压力',
                  id:1
              } ,
              {
                  nm:'进水压力',
                  id:2
              },
              {
                  nm:'设定压力',
                  id:3
              },{
                  nm:'电源电压',
                  id:4
              },{
                  nm:'运行频率',
                  id:5
              }
          ],
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
              id:1
          },{
              nm:'本月',
              id:2
          },{
              nm:'本年',
              id:3
          },{
              nm:'实时',
              id:4
          }],
          echartsId:4,
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
        this.tableWidth = this.tableList.length>4 ? (this.tableList.length-4)*15+100 : 100
    },
    methods: {
        choose(item){
            this.activeId = item.id
            this.showMore = false
        }
    }
  }
</script>
