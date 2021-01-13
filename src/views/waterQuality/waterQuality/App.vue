<template>
    <div id="container">
        <van-nav-bar fixed title="水质监控" @click-left="back" left-arrow @click-right="searchShow = true">
            <van-icon name="search" slot="right"></van-icon>
        </van-nav-bar>
        <div style="height: 75px"></div>

        <van-list  v-model="loading"  :finished="finished" finished-text="没有更多了"   @load="onLoad"  :immediate-check="immediate" >
            <div   v-for="(item,index) in dataList" :key="index">
                <van-cell-group>
                    <van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"> </van-field>
                    <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"> </van-field>
                    <van-field label="分区名称:" v-model="item.nm" readonly :border="false"></van-field>
                    <van-field v-if="item.status === '1'" label="通讯状态" value="在线" readonly :border="false"></van-field>
                    <van-field v-if="item.status === '0'" label="通讯状态" value="离线" readonly :border="false"></van-field>
                    <van-field label="最后通讯时间:" v-model="item.datetimes" readonly :border="false"></van-field>
                    <van-field label="浊度:" v-model="item.turbidity" readonly :border="false"></van-field>
                    <van-field label="余氯:" v-model="item.residualChlorine" readonly :border="false"></van-field>
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
    import { Dialog ,Toast } from 'vant';
    export default {
        name: "waterQuality",
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
                this.query.toW(qry, "waterFlag", 1, "EQ");
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

