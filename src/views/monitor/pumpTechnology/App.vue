<template>
    <div id="container">
        <van-nav-bar fixed title="泵房工艺" @click-left="back" left-arrow @click-right="searchShow = true">
            <van-icon name="search" slot="right"></van-icon>
        </van-nav-bar>
        <div style="height: 75px"></div>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  :immediate-check="immediate">
            <div v-for="(item,index) in dataList" :key="index" @click="toDetail(item)">
                <van-cell-group>
                    <van-field label="泵房编号:" v-model="item.no" readonly :border="false"></van-field>
                    <van-field label="泵房名称:" v-model="item.nm" readonly :border="false"></van-field>
                    <van-field label="小区名称:" v-model="item.estateNm" readonly :border="false"></van-field>
                    <van-field label="分区楼层:" v-model="item.partitionFloor" readonly :border="false"></van-field>
                    <van-field label="分区情况:" v-model="item.partitionSituation" readonly :border="false"></van-field>
                    <van-field label="供水模式:" v-model="item.arg2" readonly :border="false"></van-field>
                    <van-button block style="height: 5px" color="#F3F3F3"></van-button>
                </van-cell-group>
            </div>
        </van-list>

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
    //import list from "@/components/monitorList";

    export default {
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
        components: {},
        created() {
        },
        mounted() {
            this.getList();
        },
        methods: {
            onLoad() {
                this.getList()
            },
            back() {
                this.until.back()
            },
            search() {
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            getList() {
                let qry = this.query.new();
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "nm", this.searchData.pumpNm, "LK");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.query.toO(qry, "no", "asc");
                this.api.getPumpPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.dataList.push(...res.data.list);
                        // 加载状态结束
                        this.finished = this.dataList.length >= res.page.total;
                        this.loading = false;
                        this.pageNo++;
                    }
                })
            },
            toDetail(info) {
                this.until.href('./pumpTechnologyDetail.html?no=' + info.no + '&nm=' + info.nm)
            }
        }
    };
</script>
<style>
    .van-nav-bar__title {
        color: white;
        margin-top: 35px;
    }
    .van-nav-bar__left, .van-nav-bar__right{
        top:35px
    }
</style>
<style lang="less">
    .van-nav-bar {
        z-index: 999;
        background-color: #1177B9 !important;
        height: 75px;
    }

    .van-nav-bar__title {
        color: white !important;
        margin-top: 35px;
    }

    .van-nav-bar .van-icon {
        color: white !important;
    }

</style>

