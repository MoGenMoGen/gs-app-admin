<style lang="less" scoped>
    @import "../../../assets/css/mobile.less";
    #echarts{
        width: 100%;
        height: 35vh;
    }
    .echarts{
        p{
            display: flex;
            align-items: center;
            justify-content: center;
            color: #909090;
            padding-bottom: 0.5rem;
            padding-top: 0.3rem;
            img{
                width: 0.28rem;
                margin-right: 0.16rem;
            }
        }
    }
</style>
<style>

</style>
<template>
    <div class="echarts">
        <div id="echarts">

        </div>
        <p><img :src="img"/>滑动查看更多数据</p>
    </div>

</template>

<script>
    import img from '../screenCurve/img/滑动.png'
    import * as echarts from 'echarts';
  export default {
    props:{

    },

    data() {
      return {
          img,
          unit:'',//曲线单位
      }
    },
    mounted() {
        // this.drawEcharts()
    },
    methods: {
        getUnit(title){
            let unitArr=[{
                label:'压力',
                value:'MPa',
            },{
                label:'电压',
                value:'V',
            },{
                label:'电流',
                value:'A',
            },{
                label:'频率',
                value:'Hz',
            },{
                label:'时间',
                value:'H',
            },{
                label:'液位',
                value:'m',
            },{
                label:'水位',
                value:'m',
            },{
                label:'积水',
                value:'m',
            },{
                label:'浊度',
                value:'NTU',
            },{
                label:'余氯',
                value:'CL',
            },{
                label:'温度',
                value:'°C',
            },{
                label:'湿度',
                value:'%',
            },{
                label:'噪音',
                value:'dB',
            }]
            let index = unitArr.findIndex(item=>title.indexOf(item.label)>=0)
            return index>=0 ? unitArr[index].value : ''
        },
        //列表的
        getData(info){
            let info2 = {
                pumpNo:info.pumpNo,
                valNm:info.valNm
            }
            this.unit = this.getUnit(info.title)
            this.api.mobCurveData(info2).then(res=>{
                console.log(res)
                if(res.code==200){
                    let x = res.data.xData
                    let y = res.data.yData
                    this.drawEcharts(x,y)
                }
            })
        },

        drawEcharts(x,y,unit){
            if(unit){
                this.unit = unit
            }
            var myChart = echarts.init(document.getElementById('echarts'));
            let timeList = x
            // let timeList = ['00:00','01:00', '02:00','03:00', '04:00','05:00', '06:00','07:00', '08:00','09:00', '10:00','11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',  '21:00','22:00', '23:00','24:00']
            let startValue = timeList.length<7 ? 0 : timeList.length - 7
            let endValue = timeList.length - 1
            // 绘制图表
            myChart.setOption({

                grid:{
                  bottom:'10%',
                   top:'20%'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:'当前：{c}'+this.unit,
                },
                legend: {
                    show:false,
                },
                toolbox: {
                    show: false,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel:{
                        interval: 0, //刻度
                        textStyle: {
                            fontSize : 10      //更改坐标轴文字大小
                        }
                    },
                    data: timeList
                },
                yAxis: {
                    type: 'value',
                    // axisLabel: {
                    //     formatter: '{value} °C'
                    // }
                },
                // 缩放平移组件
                dataZoom: [
                    {
                        type: 'inside',  //slider有滑块，inside内置
                        disabled: false,  //是否停止组件功能
                        xAxisIndex: 0,  //x轴,可以用数组表示多个轴
                        zoomLock: true,  //是否锁定区域大小（true,只能平移不能缩放）
                        preventDefaultMouseMove: false,
                        filterMode: "empty",

                        //这个和下面那个值一起决定了一次显示几个，end-start=一次显示几个，这两个值也决定了初始显示哪些数据，初始显示的数据是，start到end的数据
                        startValue: startValue,  //一行有几个（起始数组下标）
                        endValue: endValue,    //一行有几个（结束数组下标）

                        start: null,
                        end: null,
                    },
                ],
                series: [
                    {
                        name: '：',
                        type: 'line',
                        data: y,
                        label:{
                            show:false,
                        },
                        //显示最高和最低点
                        markPoint: {
                            data: [
                                { type: 'max', name: 'Max' },
                                { type: 'min', name: 'Min' }
                            ]
                        },
                        //平均线
                        markLine: {
                            data: [{ type: 'average', name: 'Avg' }]
                        },
                        //阴影部分样式
                        areaStyle: {
                            color:'#5470C6',
                            opacity:0.3
                        }
                    },
                ]
            });
        }
    }
  }
</script>
