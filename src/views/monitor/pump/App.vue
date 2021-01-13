<template>
    <div id="container">

        <van-sticky>
            <my-header title="泵房监控" @back="back" @search="searchShow = true"> </my-header>
        </van-sticky>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
            <div v-for="item in dataList" :key="item.id" @click="toDetail(item)">
                <van-cell-group>
                    <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false">
                        <span slot="button"> {{item.datetimes}}</span>
                    </van-field>
                    <van-field label="所在区域:" v-model="item.region" readonly :border="false"></van-field>
                    <van-field label="供水区域:" v-model="item.nm" readonly :border="false"></van-field>
                    <van-field v-if="item.status === '1'" label="通讯状态" value="在线" readonly :border="false" is-link></van-field>
                    <van-field v-if="item.status === '0'" label="通讯状态" value="离线" readonly :border="false" is-link></van-field>
                    <van-field label="进水压力:" v-model="item.inPressure" readonly :border="false"></van-field>
                    <van-field label="出水压力:" v-model="item.outPressure" readonly :border="false"></van-field>
                    <van-button block style="height: 10px" color="#F3F3F3"></van-button>
                </van-cell-group>
            </div>
        </van-list>


        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '90%' }" closeable round close-icon="close">
            <van-cell-group style="margin-top: 50px">
                <van-field v-model="info.setPressure" label="设定压力:" readonly label-width="120"></van-field>
                <van-field v-model="info.turbidity" label="浊度:" readonly label-width="120"></van-field>
                <van-field v-model="info.residualChlorine" label="余氯:" readonly label-width="120"></van-field>
                <van-field v-model="info.pumpCurrent1" label="1号泵电流:" readonly label-width="120"></van-field>
                <van-field v-model="info.pumpCurrent2" label="2号泵电流:" readonly label-width="120"></van-field>
                <van-field v-model="info.pumpCurrent3" label="3号泵电流:" readonly label-width="120"></van-field>
                <van-field v-model="info.pumpCurrent4" label="4号泵电流:" readonly label-width="120"></van-field>
                <van-field v-model="info.pump1" label="1号泵:" readonly label-width="120"></van-field>
                <van-field v-model="info.pump2" label="2号泵:" readonly label-width="120"></van-field>
                <van-field v-model="info.pump3" label="3号泵:" readonly label-width="120"></van-field>
                <van-field v-model="info.pump4" label="4号泵:" readonly label-width="120"></van-field>
                <van-field v-model="info.operatingFrequency" label="运行频率:" readonly label-width="120"></van-field>
                <van-field v-model="info.operatingFrequency1" label="1号泵运行频率:" readonly label-width="120"></van-field>
                <van-field v-model="info.operatingFrequency2" label="2号泵运行频率:" readonly label-width="120"></van-field>
                <van-field v-model="info.operatingFrequency3" label="3号泵运行频率:" readonly label-width="120"></van-field>
                <van-field v-model="info.operatingFrequency4" label="4号泵运行频率:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours1" label="1号泵运行时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours2" label="2号泵运行时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours3" label="3号泵运行时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours4" label="4号泵运行时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.instantaneousFlow" label="瞬间流量:" readonly label-width="120"></van-field>
                <van-field v-model="info.cumulativeFlow" label="累计流量:" readonly label-width="120"></van-field>
                <van-field v-model="info.voltage1" label="A相电压:" readonly label-width="120"></van-field>
                <van-field v-model="info.voltage2" label="B相电压:" readonly label-width="120"></van-field>
                <van-field v-model="info.voltage3" label="C相电压:" readonly label-width="120"></van-field>
                <van-field v-model="info.current1" label="A相电流:" readonly label-width="120"></van-field>
                <van-field v-model="info.current2" label="B相电流:" readonly label-width="120"></van-field>
                <van-field v-model="info.current3" label="C相电流:" readonly label-width="120"></van-field>
            </van-cell-group>
        </van-popup>


      <!--搜索弹窗-->
      <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
        <van-form @submit="search" style="margin-top: 50px">
          <van-field label="泵房名称:" v-model="searchData.pumpNm" clearable></van-field>
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

    import myHeader from "../../../components/myHeader/myHeader";
    export default {
        components: {myHeader},
        name: "monitor",
        data() {
            return {
                info: {},
                searchData: {
                    pumpNm: ''
                },
                show: false,
                activeNames: ['1'],
                dataList: [],
                searchShow: false,
                loading: false,
                finished: false,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 10,
                total: 0,
                title: "",
                pumpNm: "",
            };
        },
        mounted() {
            this.getList()
        },
        methods: {
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
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.query.toO(qry, "crtTm", "desc");
                this.api.getSysMonitorLatestPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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
    .van-cell {
        line-height: normal;
        padding: 8px 16px;
    }

</style>

