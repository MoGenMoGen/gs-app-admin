<template>
    <div id="container">
        <!--图表弹窗-->
        <van-popup v-model="show" :style="{ width: '96%',borderRadius:'5px' }">
            <div class="showTitle">
                <span></span><p>{{showTitle}}</p><span></span>
            </div>
            <echarts-show  ref="echarts"></echarts-show>
        </van-popup>
        <van-sticky>
            <my-header title="能耗管理" @back="back" @search="searchShow = true"> </my-header>
        </van-sticky>
        <!--<van-sticky :offset-top="82">-->
        <!--<div class="search">-->

        <!--<div @click="zoneShow=true">-->
        <!--<p>{{searchData.region?searchData.region : '行政区域'}}</p>-->
        <!--<img :src="arrowDown"/>-->
        <!--</div>-->
        <!--<div @click="searchShow=true">-->
        <!--<p>{{searchData.pumpNm?searchData.pumpNm : '泵房名称'}}</p>-->
        <!--<img :src="arrowDown"/>-->
        <!--</div>-->
        <!--<div>-->
        <!--<input placeholder="编号" v-model="searchData.cd"  @keyup.enter="search"/>-->
        <!--<img :src="searchImg"/>-->
        <!--</div>-->
        <!--</div>-->
        <!--</van-sticky>-->

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
            <div v-for="(item,index) in dataList" :key="item.id"class="listItem">
                <div class="itemTop" @click="toDetail(item)" >
                    <div>{{item.pumpNo}}<span></span>{{item.pumpNm}}<span></span>{{item.region}}
                        <!--<p v-if="item.status==1" class="green">在线</p>-->
                        <!--<p v-if="item.status==0" class="red">离线</p>-->
                    </div>

                    <img :src="arrowDownBlue" :class="{showMore:item.showMore}" @click.stop="switchVal(item,index)"/>
                </div>
                <div  style="margin-left: 10px;padding-bottom: 10px">
                    <van-tag type="success" v-if="item.status ==='1'">在线</van-tag>
                    <van-tag type="warning" v-if="item.status ==='0'">离线</van-tag>

                    <span style="font-size: 10px;margin-left: 10px">最后通讯:{{item.datetimes}}</span>
                </div>

                <div class="itemContent" v-show="!item.showMore">
                    <p @click="toShow(item.pumpNo,'instantaneousFlow','瞬间流量',item)"><span>瞬间流量：</span>{{item.instantaneousFlow}}</p>
                    <p @click="toShow(item.pumpNo,'cumulativeFlow','累计流量',item)"><span>累计流量：</span>{{item.cumulativeFlow}}</p>
                    <p @click="toShow(item.pumpNo,'kwh','总功耗',item)"><span>总功耗：</span>{{item.kwh}}</p>
                    <p @click="toShow(item.pumpNo,'efficacy','工作效能',item)"><span>工作效能：</span>{{item.efficacy}}</p>
                    <p @click="toShow(item.pumpNo,'maxWater','最大用水流量',item)" class="pHang"><span style="width: 1.6rem">最大用水流量：</span>{{item.maxWater}}</p>
                    <p @click="toShow(item.pumpNo,'maxWaterTm','最大用水时间',item)" class="pHang"><span style="width: 1.6rem">最大用水时间：</span>{{item.maxWaterTm}}</p>
                </div>
                <div v-show="item.showMore" class="itemMore">
                    <div class="itemContent">
                        <div class="title">
                            <span></span>基本数据
                        </div>
                        <p class="pHang"><span>站址：</span>{{item.tid}}</p>
                        <p @click="toShow(item.pumpNo,'outPressure','出水压力',item)"><span>出水压力：</span>{{item.outPressure}}</p>
                        <p @click="toShow(item.pumpNo,'inPressure','进水压力',item)"  v-if="item.configVal.val16=== '1'"><span>进水压力：</span>{{item.inPressure}}</p>
                        <p @click="toShow(item.pumpNo,'setPressure','设定压力',item)"><span>设定压力：</span>{{item.setPressure}}</p>
                        <p @click="toShow(item.pumpNo,'levelV','水箱液位',item)"  v-if="item.configVal.val5 === '1'"><span>水箱液位：</span>{{item.levelV}}</p>
                    </div>
                    <div class="itemContent"  v-if="item.configVal.val10 === '1' || item.configVal.val9 === '1'">
                        <p @click="toShow(item.pumpNo,'turbidity','浊度',item)"  v-if="item.configVal.val10 === '1'"><span>浊度：</span>{{item.turbidity}}</p>
                        <p @click="toShow(item.pumpNo,'residualChlorine','余氯',item)" v-if="item.configVal.val9 === '1'"><span>余氯：</span>{{item.residualChlorine}}</p>
                    </div>
                    <div class="itemContent">
                        <p @click="toShow(item.pumpNo,'voltage','电源电压',item)"><span>电源电压：</span>{{item.voltage}}</p>
                        <p @click="toShow(item.pumpNo,'operatingFrequency','运行频率',item)"><span>运行频率：</span>{{item.operatingFrequency}}</p>
                        <p @click="toShow(item.pumpNo,'voltage1','A相电压',item)" v-if="item.configVal.val7 === '1'"><span>A相电压：</span>{{item.voltage1}}</p>
                        <p @click="toShow(item.pumpNo,'current1','A相电流',item)" v-if="item.configVal.val7 === '1'"><span>A相电流：</span>{{item.current1}}</p>
                        <p @click="toShow(item.pumpNo,'voltage2','B相电压',item)" v-if="item.configVal.val7 === '1'"><span>B相电压：</span>{{item.voltage2}}</p>
                        <p @click="toShow(item.pumpNo,'current2','B相电流',item)" v-if="item.configVal.val7 === '1'"><span>B相电流：</span>{{item.current2}}</p>
                        <p @click="toShow(item.pumpNo,'voltage3','C相电压',item)" v-if="item.configVal.val7 === '1'"><span>C相电压：</span>{{item.voltage3}}</p>
                        <p @click="toShow(item.pumpNo,'current3','C相电流',item)" v-if="item.configVal.val7 === '1'"><span>C相电流：</span>{{item.current3}}</p>
                    </div>
                    <div class="itemContent">
                        <div class="pump">
                            <p>泵1</p>
                            <p @click="toShow(item.pumpNo,'operatingFrequency1','泵1运行频率',item)"><span>运行频率：</span>{{item.operatingFrequency1}}</p>
                            <p @click="toShow(item.pumpNo,'pumpCurrent1','泵1运行电流',item)"><span>运行电流：</span>{{item.pumpCurrent1}}</p>
                            <p @click="toShow(item.pumpNo,'operationHours1','泵1运行时间',item)"><span>运行时间：</span>{{item.operationHours1}}</p>
                            <p @click="toShow(item.pumpNo,'temperatureP1','泵1泵体温度',item)"  v-if="item.configVal.val3 === '1'"><span>泵体温度：</span>{{item.temperatureP1}}</p>
                            <p @click="toShow(item.pumpNo,'vibrate1','泵1泵体震动',item)"><span>泵体震动：</span>{{item.vibrate1}}</p>
                            <span>
                                变频 <img :src="item.pumpBian1?blue : gray"/>
                            </span>
                            <span>
                                工频 <img :src="item.pumpGong1?blue:gray"/>
                            </span>
                            <span>
                                故障 <img :src="item.pumpFault1 ? blue:gray"/>
                            </span>
                            <span>
                                检修 <img :src="item.pumpOverhaul1 ? blue : gray"/>
                            </span>
                        </div>
                        <div class="pump"  v-if="item.configVal.val14 === '1'">
                            <p>泵2</p>
                            <p @click="toShow(item.pumpNo,'operatingFrequency2','泵2运行频率',item)"  v-if="item.configVal.val14 === '1'"><span>运行频率：</span>{{item.operatingFrequency2}}</p>
                            <p @click="toShow(item.pumpNo,'pumpCurrent2','泵2运行电流',item)"  v-if="item.configVal.val14 === '1'"><span>运行电流：</span>{{item.pumpCurrent2}}</p>
                            <p @click="toShow(item.pumpNo,'operationHours2','泵2运行时间',item)"><span>运行时间：</span>{{item.operationHours2}}</p>
                            <p @click="toShow(item.pumpNo,'temperatureP2','泵2泵体温度',item)"  v-if="item.configVal.val3 === '1'"><span>泵体温度：</span>{{item.temperatureP2}}</p>
                            <p @click="toShow(item.pumpNo,'vibrate2','泵2泵体震动',item)"><span>泵体震动：</span>{{item.vibrate2}}</p>
                            <span>
                                变频 <img :src="item.pumpBian2?blue : gray"/>
                            </span>
                            <span>
                                工频 <img :src="item.pumpGong2?blue:gray"/>
                            </span>
                            <span>
                                故障 <img :src="item.pumpFault2 ? blue:gray"/>
                            </span>
                            <span>
                                检修 <img :src="item.pumpOverhaul2 ? blue : gray"/>
                            </span>
                        </div>
                        <!--泵房2没有 泵房3显示在这里-->
                        <div class="pump"  v-if="item.configVal.val14 !== '1' && item.configVal.val13 === '1'">
                            <p>泵3</p>
                            <p @click="toShow(item.pumpNo,'operatingFrequency3','泵3运行频率',item)"  v-if="item.configVal.val13 === '1'"><span>运行频率：</span>{{item.operatingFrequency3}}</p>
                            <p @click="toShow(item.pumpNo,'pumpCurrent3','泵3运行电流',item)"  v-if="item.configVal.val13 === '1'"><span>运行电流：</span>{{item.pumpCurrent3}}</p>
                            <p @click="toShow(item.pumpNo,'operationHours3','泵3运行时间',item)"><span>运行时间：</span>{{item.operationHours3}}</p>
                            <p @click="toShow(item.pumpNo,'temperatureP3','泵3泵体温度',item)"  v-if="item.configVal.val3 === '1'"> <span>泵体温度：</span>{{item.temperatureP3}}</p>
                            <p @click="toShow(item.pumpNo,'vibrate3','泵3泵体震动',item)"><span>泵体震动：</span>{{item.vibrate3}}</p>
                            <span>
                                变频 <img :src="item.pumpBian3?blue : gray"/>
                            </span>
                            <span>
                                工频 <img :src="item.pumpGong3?blue:gray"/>
                            </span>
                            <span>
                                故障 <img :src="item.pumpFault3 ? blue:gray"/>
                            </span>
                            <span>
                                检修 <img :src="item.pumpOverhaul3 ? blue : gray"/>
                            </span>
                        </div>
                        <!--泵房2 泵房3 都没有 泵房4显示在这里-->
                        <div class="pump" v-if="item.configVal.val14 !== '1' && item.configVal.val13 !== '1' && item.configVal.val12 === '1'">
                            <p>泵4</p>
                            <p @click="toShow(item.pumpNo,'operatingFrequency4','泵3运行频率',item)"  v-if="item.configVal.val12 === '1'"><span>运行频率：</span>{{item.operatingFrequency3}}</p>
                            <p @click="toShow(item.pumpNo,'pumpCurrent4','泵3运行电流',item)"   v-if="item.configVal.val12 === '1'"><span>运行电流：</span>{{item.pumpCurrent3}}</p>
                            <p @click="toShow(item.pumpNo,'operationHours4','泵3运行时间',item)"><span>运行时间：</span>{{item.operationHours3}}</p>
                            <p @click="toShow(item.pumpNo,'temperatureP4','泵3泵体温度',item)"  v-if="item.configVal.val3 === '1'"><span>泵体温度：</span>{{item.temperatureP3}}</p>
                            <p @click="toShow(item.pumpNo,'vibrate4','泵3泵体震动',item)"><span>泵体震动：</span>{{item.vibrate4}}</p>
                            <span>
                                变频 <img :src="item.pumpBian4?blue : gray"/>
                            </span>
                            <span>
                                工频 <img :src="item.pumpGong4?blue:gray"/>
                            </span>
                            <span>
                                故障 <img :src="item.pumpFault4 ? blue:gray"/>
                            </span>
                            <span>
                                检修 <img :src="item.pumpOverhaul4 ? blue : gray"/>
                            </span>
                        </div>

                    </div>
                    <!--有超过两个泵房就显示这一排-->
                    <div class="itemContent" v-if="item.configVal.num>2">
                        <div class="pump"  v-if="item.configVal.val13 === '1'">
                            <p>泵3</p>
                            <p @click="toShow(item.pumpNo,'operatingFrequency3','泵3运行频率',item)"  v-if="item.configVal.val13 === '1'"><span>运行频率：</span>{{item.operatingFrequency3}}</p>
                            <p @click="toShow(item.pumpNo,'pumpCurrent3','泵3运行电流',item)"  v-if="item.configVal.val13 === '1'"><span>运行电流：</span>{{item.pumpCurrent3}}</p>
                            <p @click="toShow(item.pumpNo,'operationHours3','泵3运行时间',item)"><span>运行时间：</span>{{item.operationHours3}}</p>
                            <p @click="toShow(item.pumpNo,'temperatureP3','泵3泵体温度',item)"  v-if="item.configVal.val3 === '1'"> <span>泵体温度：</span>{{item.temperatureP3}}</p>
                            <p @click="toShow(item.pumpNo,'vibrate3','泵3泵体震动',item)"><span>泵体震动：</span>{{item.vibrate3}}</p>
                            <span>
                                变频 <img :src="item.pumpBian3?blue : gray"/>
                            </span>
                            <span>
                                工频 <img :src="item.pumpGong3?blue:gray"/>
                            </span>
                            <span>
                                故障 <img :src="item.pumpFault3 ? blue:gray"/>
                            </span>
                            <span>
                                检修 <img :src="item.pumpOverhaul3 ? blue : gray"/>
                            </span>
                        </div>
                        <div class="pump" v-if="item.configVal.val12 === '1'">
                            <p>泵4</p>
                            <p @click="toShow(item.pumpNo,'operatingFrequency4','泵3运行频率',item)"  v-if="item.configVal.val12 === '1'"><span>运行频率：</span>{{item.operatingFrequency3}}</p>
                            <p @click="toShow(item.pumpNo,'pumpCurrent4','泵3运行电流',item)"   v-if="item.configVal.val12 === '1'"><span>运行电流：</span>{{item.pumpCurrent3}}</p>
                            <p @click="toShow(item.pumpNo,'operationHours4','泵3运行时间',item)"><span>运行时间：</span>{{item.operationHours3}}</p>
                            <p @click="toShow(item.pumpNo,'temperatureP4','泵3泵体温度',item)"  v-if="item.configVal.val3 === '1'"><span>泵体温度：</span>{{item.temperatureP3}}</p>
                            <p @click="toShow(item.pumpNo,'vibrate4','泵3泵体震动',item)"><span>泵体震动：</span>{{item.vibrate4}}</p>
                            <span>
                                变频 <img :src="item.pumpBian4?blue : gray"/>
                            </span>
                            <span>
                                工频 <img :src="item.pumpGong4?blue:gray"/>
                            </span>
                            <span>
                                故障 <img :src="item.pumpFault4 ? blue:gray"/>
                            </span>
                            <span>
                                检修 <img :src="item.pumpOverhaul4 ? blue : gray"/>
                            </span>
                        </div>
                    </div>
                    <div class="itemContent">
                        <p @click="toShow(item.pumpNo,'levelJ','泵房积水',item)"><span>泵房积水：</span>{{item.levelJ}}</p>
                        <p @click="toShow(item.pumpNo,'kwh','有功电能',item)"><span>有功电能：</span>{{item.kwh}}</p>
                        <p @click="toShow(item.pumpNo,'noise','泵房噪音',item)"><span>泵房噪音：</span>{{item.noise}}</p>
                        <p @click="toShow(item.pumpNo,'cumulativeFlow','累计流量',item)" v-if="item.configVal.val1 === '1'"><span>累计流量：</span>{{item.cumulativeFlow}}</p>
                        <p @click="toShow(item.pumpNo,'temperature','泵房温度',item)" ><span>泵房温度：</span>{{item.temperature}}</p>
                        <p @click="toShow(item.pumpNo,'instantaneousFlow','瞬间流量',item)" v-if="item.configVal.val1 === '1'"><span>瞬间流量：</span>{{item.instantaneousFlow}}</p>
                        <p @click="toShow(item.pumpNo,'humidity','泵房湿度',item)"><span>泵房湿度：</span>{{item.humidity}}</p>
                    </div>
                    <div class="itemContent">
                        <div class="title">
                            <span></span>当前状态
                        </div>
                        <p><span>远程控制：</span><img :src="item.remoteControl ? open : close"/></p>
                        <p><span>水位低：</span><img :src="item.waterLow ? open : close"/></p>
                        <p><span>远程急停：</span><img :src="item.remoteStop ? open : close"/></p>
                        <p><span>水位高：</span><img :src="item.waterHi ? open : close"/></p>
                        <p><span>压力超高：</span><img :src="item.outWaterHi ? open : close"/></p>
                        <p><span>水位过低：</span><img :src="item.waterTooLow ?open : close"/></p>
                        <p><span>欠压报警：</span><img :src="item.lowVol ?open : close"/></p>
                        <p><span>水位过高：</span><img :src="item.waterHi ?open : close"/></p>
                        <p class="pHang"><span>停机报警：</span><img :src="item.shutDown ?open : close"/></p>
                        <p><span>积水：</span><img :src="item.levelK ?open : close"/></p>
                        <p><span>进水阀开：</span><img :src="item.inOn ?open : close"/></p>
                        <p><span>烟感：</span><img :src="item.smokeStatus ?open : close"/></p>
                        <p><span>进水阀关：</span><img :src="item.inOff ?open : close"/></p>
                        <p><span>入侵：</span><img :src="item.infrared ?open : close"/></p>
                        <p><span>开到位：</span><img :src="item.onStatus ?open : close"/></p>
                        <p><span>门禁：</span><img :src="item.doorStatus ?open : close"/></p>
                        <p><span>关到位：</span><img :src="item.offStatus ?open : close"/></p>
                    </div>
                </div>

            </div>
        </van-list>

        <!--泵房搜索弹窗-->
        <van-popup v-model="searchShow" position="bottom" :style="{ height: '60%' }" closeable round close-icon="close">
            <div class="pumpSearch">
                <input placeholder="泵房名称" v-model="pumpNm" @keyup.enter="searchPump"/>
                <img :src="searchImg"/>
            </div>
            <van-picker
                    title="泵房名称"
                    value-key="nm"
                    show-toolbar
                    :columns="pumpList"
                    @confirm="onConfirm"
                    @cancel="searchShow = false"
            />
        </van-popup>
        <!--行政区域搜索弹窗-->
        <van-popup v-model="zoneShow" position="bottom" :style="{ height: '40%' }" round close-icon="close">
            <van-picker
                    title="行政区域"
                    show-toolbar
                    :columns="zoneList"
                    @confirm="zoneConfirm"
                    @cancel="zoneShow = false"
            />
        </van-popup>

    </div>
</template>

<script>

    import myHeader from "../../../components/myHeader/myHeader";
    import echartsShow from "../../monitor/components/echartsShow";
    import arrowRight from '../../monitor/screenCurve/img/arrowRight.png'
    import arrowDown from '../../monitor/screenCurve/img/arrowDown.png'
    import arrowDownBlue from '../../monitor/screenCurve/img/向下.png'
    import searchImg from '../../monitor/screenCurve/img/搜索.png'
    import gray from '../../monitor/screenCurve/img/灰.png'
    import blue from '../../monitor/screenCurve/img/蓝.png'
    import close from '../../monitor/screenCurve/img/关.png'
    import open from '../../monitor/screenCurve/img/开.png'
    export default {
        components: {myHeader,echartsShow},
        name: "monitor",
        data() {
            return {
                arrowRight,
                arrowDown,
                arrowDownBlue,
                searchImg,
                gray,
                blue,
                close,
                open,
                pumpNo:"",
                valNm:"",
                info: {},
                searchData: {
                    pumpNm: '',
                    region:'',
                    cd:''
                },
                show: false,
                showTitle:'标题',
                activeNames: ['1'],
                dataList: [],
                searchShow: false,
                zoneShow:false,
                pumpList:[],
                zoneList:['鄞州区','海曙区','江北区','镇海区','北仑区'],
                loading: false,
                finished: false,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 10,
                total: 0,
                title: "",
                pumpNm: "",
                menuList:[],
            };
        },
        mounted() {
            this.getList()
            this.getPump()
        },
        methods: {
            //显示图表曲线
            async toShow(pumpNo,valNm,title,info){
                this.pumpNo = pumpNo
                this.valNm = valNm
                this.showTitle = title
                if(!info.menuList){
                    info.menuList = await this.getTab(info.config)
                    //   console.log(info.menuList)
                }
                let index = info.menuList.findIndex(item=>{
                    return item.value==valNm
                })
                if(index!=-1){
                    this.show = true
                    this.$nextTick(()=>{
                        this.$refs.echarts.getData({pumpNo:pumpNo,valNm:valNm,title:title})
                    })
                }

            },
            search() {
                console.log('search')
                //     this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            searchPump(){
                this.getPump()
            },
            back() {
                this.until.back()
            },
            onLoad() {
                this.getList()
            },
            toDetail(item) {
                this.until.href('/views/monitor/screenCurveDetail.html?pumpNo='+item.pumpNo+'&config='+item.config)
                // this.info = item;
            },
            //有图表的数据
            getTab(config){
                return new Promise(resolve => {
                    this.api.getTab({config:config}).then(res=>{
                        //this.menuList = res
                        resolve(res)
                    })
                })
            },
            //获取泵房列表
            getPump() {
                let qry = this.query.new();
                if (this.pumpNm) {
                    this.query.toW(qry, "nm", this.pumpNm, "LK");
                }
                this.query.toP(qry, 1, 50);
                this.query.toO(qry, "no", "asc");
                this.api.getPumpPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.pumpList = res.data.list
                        console.log(this.pumpList)
                    }
                })
            },
            //泵房确定选择
            onConfirm(e){
                console.log(e)
                this.searchData.pumpNm = e.nm
                this.searchShow = false
                this.finished = false
                this.pageNo = 1
                this.dataList = []
                this.getList()
            },
            //行政区域确定
            zoneConfirm(e){
                console.log(e)
                this.searchData.region = e
                console.log(this.searchData)
                this.zoneShow = false
                this.finished = false
                this.pageNo = 1
                this.dataList = []
                this.getList()
            },
            //二进制转十进制
            async switchVal (info,index) {
                info.showMore = !info.showMore
                if(info.showMore && !info.menuList){
                    info.menuList = await this.getTab(info.config)
                }
                if(info.configVal.vShow){ //已经转换过了
                    return
                }
                info.configVal.vShow = true
                let configVal = info.configVal
                let val = info.config
                let item = val.toString(2)
                let num = 16 - item.length
                let z = ''
                if (num !== 0) {
                    for (let i = 0; i < num; i++) {
                        z = z + '0'
                    }
                    item = z + item
                }
                configVal.val16 = item.slice(15, 16)//无负压系统



                configVal.val1 = item.slice(0, 1)//出水流量
                configVal.val2 = item.slice(1, 2)//工作能效分析
                configVal.val3 = item.slice(2, 3)//环境变量

                configVal.val4 = item.slice(3, 4)//各种变频器的相关数据
                configVal.val5 = item.slice(4, 5)//水箱水位
                configVal.val6 = item.slice(5, 6)//空位
                configVal.val7 = item.slice(6, 7)//线电压
                configVal.val8 = item.slice(7, 8)//进水电动阀
                configVal.val9 = item.slice(8, 9)//余氯

                configVal.val10 = item.slice(9, 10)//浊度

                configVal.val11 = item.slice(10, 11)//新协议
                configVal.val14 = item.slice(13, 14)//第二台泵
                configVal.val13 = item.slice(12, 13)//第三台泵

                configVal.val12 = item.slice(11, 12)//第四台泵

                configVal.val15 = item.slice(14, 15)//二次供水分公司所管属

                if(configVal.val12==='1'){
                    configVal.num++
                }
                if(configVal.val13==='1'){
                    configVal.num++
                }
                if(configVal.val14==='1'){
                    configVal.num++
                }

                info.configVal = configVal
                this.$set(this.dataList,index,info)


            },
            getList() {
                this.loading = true
                let qry = this.query.new();
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
                }
                this.query.toW(qry, "energyFlag", 1, "EQ");
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.api.getSysMonitorLatestPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        res.data.list.forEach(item=>{
                            item.showMore = false
                            item.configVal = {
                                val1: '0',
                                val2: '0',
                                val3: '0',
                                val4: '0',
                                val5: '0',
                                val6: '0',
                                val7: '0',
                                val8: '0',
                                val9: '0',
                                val10: '0',
                                val11: '0',
                                val12: '0',
                                val13: '0',
                                val14: '0',
                                val15: '0',
                                val16: '0',
                                vShow:false, //是否打开过
                                num:1, //有几个泵房 肯定至少有1个
                            }
                            this.dataList.push(item)
                        })
                        // this.dataList.push(...res.data.list);
                        // 加载状态结束
                        this.finished = this.dataList.length >= res.page.total;
                        this.loading = false;
                        this.pageNo++;
                    }
                })
            },
        },
        filters: {
            filter: function (val) {
                if (val === 0) {
                    return '离线'
                } else if (val === 1) {
                    return '在线'
                }
                return val
            }
        },
    };
</script>

<style lang="less" scoped>
    #container{
        min-height: 100vh;
        background: #F5F2F5;
        .pumpSearch{
            display: flex;
            align-items: center;
            border: 1px solid #D5D5D5;
            height: 0.48rem;
            border-radius: 0.24rem;
            background: #ffffff;
            width: 96%;
            margin: 1rem auto 0.4rem;
            input{
                flex: 1;
                border: 0;
                text-indent: 0.2rem;
                background: transparent;
            }
            img{
                width: 0.28rem;
                margin-right: 0.2rem;
            }
        }
        /*弹窗样式*/
        .showTitle{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 0.45rem;
            padding-bottom: 0.3rem;
            span{
                display: inline-block;
                width: 1.1rem;
                height: 1px;
                background: #000000;
                opacity: 0.2;
            }
            p{
                font-size: 0.3rem;
                font-weight: bold;
                padding: 0 0.3rem;
            }
        }
        .search{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            background: #F5F2F5;
            padding: 0.25rem 2%;
            box-sizing: border-box;
            >div{
                display: flex;
                align-items: center;
                border: 1px solid #D5D5D5;
                height: 0.48rem;
                border-radius: 0.24rem;
                background: #ffffff;
                p,input{
                    flex: 1;
                    border: 0;
                    text-indent: 0.2rem;
                }
                img{
                    margin-right: 0.18rem;
                }
                &:not(:last-of-type){
                    width: 30%;
                    img{
                        width: 0.2rem;
                    }
                }
                &:last-of-type{
                    width: 33%;
                    input{
                        background: transparent;
                        width: 90%;
                    }
                    img{
                        width: 0.28rem;
                    }
                }
            }
        }
        .listItem{
            background: #ffffff;
            border-radius: 0.1rem;
            margin: 0 auto 0.15rem;
            width: 96%;
            .itemTop{
                display: flex;
                align-items: center;
                height: 1rem;
                width: 95%;
                margin: 0 auto;
                div:first-of-type{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    span{
                        display: inline-block;
                        width: 1px;
                        height: 0.1rem;
                        background: #000000;
                        opacity: 0.2;
                        margin: 0 0.2rem;
                    }
                    p{
                        height: 0.45rem;
                        line-height: 0.45rem;
                        padding: 0 0.1rem;
                        border-radius: 3px;
                        color: #ffffff;
                        margin-left: 0.2rem;
                    }
                    .red{
                        background: red;
                    }
                    .green{
                        background: green;
                    }
                }

                img{
                    width: 0.35rem;
                }
                .showMore{
                    transform:rotate(180deg);
                    -ms-transform:rotate(180deg); 	/* IE 9 */
                    -moz-transform:rotate(180deg); 	/* Firefox */
                    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                    -o-transform:rotate(180deg); 	/* Opera */
                }
            }
            .itemMore{

            }

            .itemContent{
                width: 95%;
                margin: 0 auto;
                border-top:1px solid #E9E9E9;
                display: flex;
                flex-wrap: wrap;
                padding: 0.2rem 0;
                .title{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    height: 0.6rem;
                    padding-bottom: 0.1rem;
                    font-size: 0.28rem;
                    font-weight: bold;

                    span{
                        width: 0.07rem;
                        height: 0.28rem;
                        background: #0B62B1;
                        display: inline-block;
                        margin-right: 0.2rem;
                    }
                }
                p{
                    width: 50%;
                    display: flex;
                    align-items: center;
                    height: 0.5rem;
                    span{
                        color: #909090;
                        width: 1.3rem;
                        display: inline-block;
                        flex-shrink: 0;
                    }
                    img{
                        width: 0.45rem;
                    }
                }
                .pHang{
                    width: 100%;
                }
                .pump{
                    width: 50%;
                    overflow: hidden;
                    p:first-child{
                        padding-top: 0.1rem;
                        width: 100%;
                        display: block;
                        padding-left: 1rem;
                        color: #909090;
                    }
                    >span{
                        display: inline-flex;
                        align-items: center;
                        float: left;
                        color: #909090;
                        height: 0.5rem;
                        &:nth-of-type(2n+1){
                            width: 38%;
                        }
                        &:nth-of-type(2n){
                            width: 60%;
                        }
                        img{
                            width: 0.26rem;
                            margin-left: 0.1rem;
                        }
                    }
                }
            }
        }
    }
    .van-cell {
        line-height: normal;
        padding: 8px 16px;
    }

</style>

