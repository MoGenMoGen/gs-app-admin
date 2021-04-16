<template>
    <div id="container">
        <my-header title="设备保养" @back="back" @search="searchShow = true"> </my-header>
        <van-tabs v-model="active" color="#1177B9" @change="tabChange">
            <van-tab v-for="item in tabList" :title='item' :key="item">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  :immediate-check="immediate">
                    <div v-for="item in dataList" :key="item.id" @click="toDetail(item)">
                        <van-cell-group>
                            <van-field label="保养单位:" v-model="item.unitNm" readonly :border="false" label-width="140"></van-field>
                            <van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false" label-width="140"></van-field>
                            <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false" label-width="140"></van-field>
                            <van-field label="供水区域:" v-model="item.zoning" readonly :border="false" label-width="140" right-icon="arrow"></van-field>
                            <van-field label="计划保养开始日期:" v-model="item.planTm" readonly :border="false" label-width="140"></van-field>
                            <van-field label="计划保养结束日期:" v-model="item.plan2Tm" readonly :border="false" label-width="140"></van-field>
                            <van-button block style="height: 5px" color="#F3F3F3"></van-button>
                        </van-cell-group>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>

        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
<!--            <van-nav-bar  title="保养详情"  left-arrow  @click-left="show = false"></van-nav-bar>-->
            <van-cell-group style="margin-top: 50px" >
                <van-field label="保养单位:" v-model="info.unitNm" readonly  label-width="140"></van-field>
                <van-field label="泵房编号:" v-model="info.pumpNo" readonly  label-width="140"></van-field>
                <van-field label="泵房名称:" v-model="info.estateNm" readonly  label-width="140"></van-field>
                <van-field label="供水模式:" v-model="info.zoning" readonly  label-width="140"></van-field>
                <van-field label="设备套数:" v-model="info.deviceNum" readonly  label-width="140"></van-field>
                <van-field label="计划保养开始日期:" v-model="info.planTm" readonly  label-width="140"></van-field>
                <van-field label="计划保养结束日期:" v-model="info.plan2Tm" readonly  label-width="140"></van-field>
                <van-field label="保养人姓名:" v-model="info.user" readonly  label-width="140"></van-field>
                <van-field label="保养完成情况:" v-model="info.status" readonly  label-width="140"></van-field>
                <van-field label="任务结束时间:" v-model="info.taskTm" readonly  label-width="140"></van-field>
            </van-cell-group>
        </van-popup>
        <!--搜索弹窗-->
        <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }"   closeable round close-icon="close"  >
            <van-form @submit="search" style="margin-top: 50px">
                <van-field label="保养单位:" v-model="searchData.unitNm" clearable></van-field>
                <van-field label="泵房编号:" v-model="searchData.pumpNo" clearable></van-field>
                <van-field label="泵房名称:" v-model="searchData.estateNm" clearable></van-field>
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
        name: "maintain",
        data() {
            return {
                info:{},
                show: false,
                searchShow: false,
                searchData:{
                    unitNm:'',
                    pumpNo:'',
                    estateNm:''
                },
                tabList: ['待保养', '已保养', '逾期'],
                tabIndex: 0,
                searchText: '',
                active: '',
                loading: false,
                pageNo: 1,
                pageSize: 10,
                dataList: [],
                immediate: false,//初始化不加载必须用变量
                finished: false,
            };
        },
        components: {myHeader},
        mounted() {
            this.getList()
        },
        methods: {
            search(){
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            toDetail(item) {
                this.show = true;
                this.info = item;
            },
            //0待保养 1已保养 2逾期
            tabChange(val) {
                this.dataList = [];
                this.pageNo = 1;
                this.tabIndex = val;
                this.getList()
            },
            onLoad() {
                this.getList()
            },
            getList() {
                let qry = this.query.new();
                if (this.searchData.estateNm) {
                    this.query.toW(qry, "estateNm", this.searchData.estateNm, "LK");
                }
                if (this.searchData.pumpNo) {
                    this.query.toW(qry, "pumpNo", this.searchData.pumpNo, "LK");
                }
                if (this.searchData.unitNm) {
                    this.query.toW(qry, "unitNm", this.searchData.unitNm, "LK");
                }
                if (this.tabIndex === 0) {
                    this.query.toW(qry, 'status', '待保养', "EQ");
                }
                if (this.tabIndex === 1) {
                    this.query.toW(qry, 'status', '已保养', "EQ");
                }
                if (this.tabIndex === 2) {
                    this.query.toW(qry, 'status', '逾期', "EQ");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.query.toO(qry, "crtTm", "desc");
                this.api.getMaintainTask(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200){
                        this.dataList.push(...res.data.list);
                        // 加载状态结束
                        this.finished = this.dataList.length >= res.page.total;
                        this.loading = false;
                        this.pageNo++;
                    }
                })
            },
            back() {
                this.until.back()
            },
        }
    };
</script>

<style lang="less" scoped>
    .van-cell {
        line-height: normal;
    }
    .van-nav-bar {
        z-index: 999;
        background-color: #1177B9;
        height: 75px;
    }
    .van-nav-bar__title {
        color: white;
        margin-top: 35px;
    }
    .van-nav-bar .van-icon {
        color: white;
    }
</style>

