<template>
    <div id="container">
        <van-sticky>
            <my-header title="环境监控" @back="back" @search="searchShow = true"> </my-header>
        </van-sticky>


        <van-list  v-model="loading"  :finished="finished" finished-text="没有更多了"   @load="onLoad"  :immediate-check="immediate" >
            <div   v-for="(item,index) in dataList" :key="index" @click="toDetail(item)">
                <van-cell-group>
                    <van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"> </van-field>
                    <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"> </van-field>
                    <van-field label="分区名称:" v-model="item.nm" readonly :border="false"></van-field>
                    <van-field v-if="item.status === '1'" label="通讯状态" value="在线" readonly :border="false" is-link></van-field>
                    <van-field v-if="item.status === '0'" label="通讯状态" value="离线" readonly :border="false" is-link></van-field>
                    <van-field label="最后通讯时间:" v-model="item.datetimes" readonly :border="false"></van-field>
                    <van-field label="噪声:" v-model="item.noise" readonly :border="false"></van-field>
                    <van-field label="温度:" v-model="item.temperature" readonly :border="false"></van-field>
                    <van-field label="湿度:" v-model="item.humidity" readonly :border="false"></van-field>
                    <van-field label="泵房积水:" v-model="item.levelJ" readonly :border="false"></van-field>
                    <van-button block style="height: 5px" color="#F3F3F3"></van-button>
                </van-cell-group>
            </div>
        </van-list>


        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '90%' }" closeable round close-icon="close">
            <van-cell-group style="margin-top: 50px">
                <van-field v-model="info.pumpNo" label="泵房编号:" readonly label-width="120"></van-field>
                <van-field v-model="info.pumpNm" label="泵房名称:" readonly label-width="120"></van-field>
                <van-field v-model="info.nm" label="分区名称:" readonly label-width="120"></van-field>
                <van-field v-model="info.datetimes" label="最后通讯时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.noise" label="噪声:" readonly label-width="120"></van-field>
                <van-field v-model="info.temperature" label="温度:" readonly label-width="120"></van-field>
                <van-field v-model="info.humidity" label="湿度:" readonly label-width="120"></van-field>
                <van-field v-model="info.vibrate1" label="1#水泵振动幅度:" readonly label-width="120"></van-field>
                <van-field v-model="info.vibrate2" label="2#水泵振动幅度:" readonly label-width="120"></van-field>
                <van-field v-model="info.vibrate3" label="3#水泵振动幅度:" readonly label-width="120"></van-field>
                <van-field v-model="info.vibrate4" label="4#水泵振动幅度:" readonly label-width="120"></van-field>
                <van-field v-model="info.temperatureP1" label="1#水泵泵体温度:" readonly label-width="120"></van-field>
                <van-field v-model="info.temperatureP2" label="2#水泵泵体温度:" readonly label-width="120"></van-field>
                <van-field v-model="info.temperatureP3" label="3#水泵泵体温度:" readonly label-width="120"></van-field>
                <van-field v-model="info.temperatureP4" label="4#水泵泵体温度:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours1" label="1#泵运行时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours2" label="2#泵运行时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours3" label="3#泵运行时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.operationHours4" label="4#泵运行时间:" readonly label-width="120"></van-field>
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
    import { ImagePreview } from 'vant';
    export default {
        components: {myHeader},
        name: "ambient",
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
            showImg(val){
                ImagePreview([val]);
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
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
                }
                this.query.toW(qry, "ambientFlag", 1, "EQ");
                this.query.toP(qry, this.pageNo, this.pageSize);

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

