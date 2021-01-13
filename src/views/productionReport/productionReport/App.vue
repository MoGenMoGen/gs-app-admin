<template>
    <div id="container">
        <van-nav-bar fixed title="生产报表" @click-left="back" left-arrow @click-right="searchShow = true">
            <van-icon name="search" slot="right"></van-icon>
        </van-nav-bar>
        <div style="height: 75px"></div>
        <van-list  v-model="loading"  :finished="finished" finished-text="没有更多了"   @load="onLoad"  :immediate-check="immediate" >
            <div   v-for="(item,index) in dataList" :key="index" @click="toDetail(item)">
                <van-cell-group>
                    <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false" label-width="120"> </van-field>
                    <van-field label="分区:" v-model="item.nm" readonly :border="false" label-width="120"> </van-field>
                    <van-field label="时间:" v-model="item.datetimes" readonly :border="false" label-width="120"> </van-field>
                    <van-field label="进水压力:" v-model="item.inPressure" readonly :border="false" label-width="120" right-icon="arrow"> </van-field>
                    <van-field label="出水压力:" v-model="item.outPressure" readonly :border="false" label-width="120" > </van-field>
                    <van-field label="设定压力:" v-model="item.setPressure" readonly :border="false"  label-width="120"> </van-field>
                    <van-button block style="height: 5px" color="#F3F3F3"></van-button>
                </van-cell-group>
            </div>
        </van-list>

        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
            <van-cell-group style="margin-top: 50px">
                <van-field label="1#频率（HZ）:" v-model="info.operatingFrequency1" readonly :border="false"  label-width="120"> </van-field>
                <van-field label="2#频率（HZ）:" v-model="info.operatingFrequency2" readonly :border="false"  label-width="120" > </van-field>
                <van-field label="3#频率（HZ）:" v-model="info.operatingFrequency3" readonly :border="false"  label-width="120"> </van-field>
                <van-field label="4#频率（HZ）:" v-model="info.operatingFrequency4" readonly :border="false"  label-width="120"> </van-field>
                <van-field label="1#电流（A）:" v-model="info.pumpCurrent1" readonly :border="false"  label-width="120"> </van-field>
                <van-field label="2#电流（A）:" v-model="info.pumpCurrent2" readonly :border="false"  label-width="120"> </van-field>
                <van-field label="3#电流（A）:" v-model="info.pumpCurrent3" readonly :border="false"  label-width="120"> </van-field>
                <van-field label="4#电流（A）:" v-model="info.pumpCurrent4" readonly :border="false"  label-width="120"> </van-field>
                <van-field label="4#电流（A）:" v-model="info.pumpCurrent4" readonly :border="false"  label-width="120"> </van-field>

                <van-field v-if="info.pump1 === 0" label="1#泵状态:" value="停止" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump1 === 1" label="1#泵状态:" value="运行" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump1 === 2" label="1#泵状态:" value="故障" readonly label-width="120" :border="false"></van-field>

                <van-field v-if="info.pump2 === 0" label="2#泵状态:" value="停止" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump2 === 1" label="2#泵状态:" value="运行" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump2 === 2" label="2#泵状态:" value="故障" readonly label-width="120" :border="false"></van-field>

                <van-field v-if="info.pump3 === 0" label="3#泵状态:" value="停止" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump3 === 1" label="3#泵状态:" value="运行" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump3 === 2" label="3#泵状态:" value="故障" readonly label-width="120" :border="false"></van-field>

                <van-field v-if="info.pump4 === 0" label="4#泵状态:" value="停止" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump4 === 1" label="4#泵状态:" value="运行" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.pump4 === 2" label="4#泵状态:" value="故障" readonly label-width="120" :border="false"></van-field>


                <van-field v-if="info.valveStatus === 0" label="阀门状态:" value="开到位" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.valveStatus === 1" label="阀门状态:" value="关到位" readonly label-width="120" :border="false"></van-field>
                <van-field v-if="info.valveStatus === 2" label="阀门状态:" value="故障" readonly label-width="120" :border="false"></van-field>




            </van-cell-group>
        </van-popup>


        <!--时间弹窗-->
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker  v-model="currentDate" type="date"  @confirm="onConfirm"  @cancel="showPicker = false"></van-datetime-picker>
        </van-popup>
      <!--搜索弹窗-->
      <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
        <van-form @submit="search" style="margin-top: 50px">
            <el-select v-model="searchData.pumpNm" filterable placeholder="请输入选择" style="width: 100%" clearable>
                <el-option  v-for="item in pumpList"  :key="item.id" :label="item.nm"   :value="item.nm"></el-option>
            </el-select>
            <div style="height: 20px"></div>
            <van-field :value="searchData.time"  label="日期" readonly clickable name="date"   placeholder="点击选择日期" @click="showPicker = true" label-width="140"></van-field>
            <div style="height: 20px"></div>
            <van-radio-group v-model="searchData.nm" direction="horizontal" style="margin-left: 20px">
                <van-radio name="低区">低区</van-radio>
                <van-radio name="中区">中区</van-radio>
                <van-radio name="高区">高区</van-radio>
                <van-radio name="超高区">超高区</van-radio>
            </van-radio-group>


          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提 交
            </van-button>
          </div>
        </van-form>
      </van-popup>


    </div>
</template>

<script>
    import { Dialog ,Toast } from 'vant';
    export default {
        name: "productionReport",
        data() {
            return {
                fqList:['低区','中区','高区','超高区'],
                currentDate: new Date(),
                pumpList:[],
                info: {},
                searchData: {
                    pumpNm: '',
                    nm: '',
                    time: ''
                },
                show: false,
                dataList: [],
                showPicker:false,
                searchShow: false,
                loading: false,
                finished: false,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 10,
                total: 0,
                pumpNm: "",
            };
        },

        mounted() {
            this.getPump();
        },
        methods: {
            onConfirm(time){
                this.searchData.time = this.until.dateFormatDay(time);

                this.showPicker = false;
            },
            //获取泵房列表
            getPump(){
                let qry = this.query.new();
                this.api.getPumpList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.pumpList = res.data.list;
                    }
                })
            },


            search() {
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            back() {
                this.until.back()
            },
            onLoad() {
                this.getList()
            },
            toDetail(item) {
                this.show = true;
                this.info = item;
            },
            getList() {
                let qry = this.query.new();
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "EQ");
                }
                if (this.searchData.nm) {
                    this.query.toW(qry, "nm", this.searchData.nm, "EQ");
                }
                if (this.searchData.time) {
                    this.query.toW(qry, "datetimes", this.searchData.time, "LKR");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.api.getMonitorPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.dataList.push(...res.data.list);
                        // 加载状态结束
                        this.finished = this.dataList.length >= res.page.total;
                        this.loading = false;
                        this.pageNo++;
                    }
                })
            },
        },
        filters: {
            filter: function (value) {
                if (value === 0) {
                    return '开到位'
                } else if (value === 1) {
                    return '关到位'
                } else if (value === 2) {
                    return '故障'
                }
            },
            pumpStatus: function (value) {
                if (value === 0) {
                    return '停止'
                } else if (value === 1) {
                    return '运行'
                } else if (value === 2) {
                    return '故障'
                }
            },
        },
    };
</script>

<style>
    .van-cell {
        line-height: normal;
        padding: 5px 16px;
    }
    .van-nav-bar {
        z-index: 999;
        background-color: #1177B9;
        height: 75px;
    }

    .van-nav-bar__title {
        color: white;
        margin-top: 15px;
    }

    .van-nav-bar .van-icon {
        color: white;
    }

</style>

