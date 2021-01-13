<template>
    <div id="container">
        <van-sticky>
            <my-header title="前期验收" @back="back" @search="searchShow = true"></my-header>
        </van-sticky>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  :immediate-check="immediate">
            <div v-for="item in dataList" :key="item.id">
                <van-cell-group>
                    <van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"
                               label-width="120"></van-field>
                    <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"
                               label-width="120"></van-field>

                    <van-field label="土建交底记录:" readonly :border="false" label-width="130">
                        <van-button v-if="item.early2Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,2)">完善信息
                        </van-button>
                        <van-button v-if="item.early2Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,2)">查看信息
                        </van-button>
                        <van-button v-if="item.early2Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,2)">整改中
                        </van-button>
                    </van-field>

                    <van-field label="泵房试压记录表:" readonly :border="false" label-width="130">
                        <van-button v-if="item.early3Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,3)">完善信息
                        </van-button>
                        <van-button v-if="item.early3Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,3)">查看信息
                        </van-button>
                        <van-button v-if="item.early3Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,3)">整改中
                        </van-button>
                    </van-field>

                    <van-field label="土建验收:" readonly :border="false" label-width="130">
                        <van-button v-if="item.early4Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,4)">完善信息
                        </van-button>
                        <van-button v-if="item.early4Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,4)">查看信息
                        </van-button>
                        <van-button v-if="item.early4Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,4)">整改中
                        </van-button>
                    </van-field>

                    <van-field label="泵房管道配件:" readonly :border="false" label-width="120">
                        <van-button v-if="item.early5Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,5)">完善信息
                        </van-button>
                        <van-button v-if="item.early5Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,5)">查看信息
                        </van-button>
                        <van-button v-if="item.early5Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,5)">整改中
                        </van-button>
                    </van-field>

                    <van-field label="门禁视频:" readonly :border="false" label-width="130">
                        <van-button v-if="item.early6Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,6)">完善信息
                        </van-button>
                        <van-button v-if="item.early6Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,6)">查看信息
                        </van-button>
                        <van-button v-if="item.early6Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,6)">整改中
                        </van-button>
                    </van-field>

                    <van-field v-if="item.pumpType === '新建'" label="成套设备,水箱验收表:" readonly :border="false"
                               label-width="200">
                        <van-button v-if="item.early7Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,7)">完善信息
                        </van-button>
                        <van-button v-if="item.early7Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,7)">查看信息
                        </van-button>
                        <van-button v-if="item.early7Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,7)">整改中
                        </van-button>
                    </van-field>

                    <van-field v-if="item.pumpType === '改造'" label="水箱验收表:" readonly :border="false" label-width="220">
                        <van-button v-if="item.early12Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,12)">完善信息
                        </van-button>
                        <van-button v-if="item.early12Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,12)">查看信息
                        </van-button>
                        <van-button v-if="item.early12Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,12)">整改中
                        </van-button>
                    </van-field>

                    <van-field v-if="item.pumpType === '改造'" label="成套设备验收表:" readonly :border="false"
                               label-width="220">
                        <van-button v-if="item.early13Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,13)">完善信息
                        </van-button>
                        <van-button v-if="item.early13Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,13)">查看信息
                        </van-button>
                        <van-button v-if="item.early13Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,13)">整改中
                        </van-button>
                    </van-field>

                    <van-field label="泵房验收总表:" readonly :border="false" label-width="220">
                        <van-button v-if="item.early9Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,9)">完善信息
                        </van-button>
                        <van-button v-if="item.early9Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,9)">查看信息
                        </van-button>
                        <van-button v-if="item.early9Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,9)">整改中
                        </van-button>
                    </van-field>

                    <van-field label="泵房设备最终验收报告:" readonly :border="false" label-width="220">
                        <van-button v-if="item.early10Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,10)">完善信息
                        </van-button>
                        <van-button v-if="item.early10Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,10)">查看信息
                        </van-button>
                        <van-button v-if="item.early10Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,10)">整改中
                        </van-button>
                    </van-field>

                    <van-field label="门禁视频监控系统最终验收报告:" readonly :border="false" label-width="220">
                        <van-button v-if="item.early11Status === null" slot="button" size="small" type="primary"
                                    @click="showEarly(item.id,11)">完善信息
                        </van-button>
                        <van-button v-if="item.early11Status === '已提交'" slot="button" size="small" type="info"
                                    @click="showEarly(item.id,11)">查看信息
                        </van-button>
                        <van-button v-if="item.early11Status === '整改中'" slot="button" size="small" type="warning"
                                    @click="showEarly(item.id,11)">整改中
                        </van-button>
                    </van-field>

                </van-cell-group>
            </div>
        </van-list>

        <van-popup v-model="show2" position="bottom" :style="{ height: '100%' }" get-container="body">
            <e2 v-if="show2" @closeInfo="closeInfo" :id="id"></e2>
        </van-popup>

        <van-popup v-model="show3" position="bottom" :style="{ height: '100%' }">
            <e3 v-if="show3" @closeInfo="closeInfo" :id="id"></e3>
        </van-popup>

        <van-popup v-model="show4" position="bottom" :style="{ height: '100%' }">
            <e4 v-if="show4" @closeInfo="closeInfo" :id="id"></e4>
        </van-popup>
        <van-popup v-model="show5" position="bottom" :style="{ height: '100%' }">
            <e5 v-if="show5" @closeInfo="closeInfo" :id="id"></e5>
        </van-popup>
        <van-popup v-model="show6" position="bottom" :style="{ height: '100%' }">
            <e6 v-if="show6" @closeInfo="closeInfo" :id="id"></e6>
        </van-popup>
        <van-popup v-model="show7" position="bottom" :style="{ height: '100%' }">
            <e7 v-if="show7" @closeInfo="closeInfo" :id="id"></e7>
        </van-popup>

        <van-popup v-model="show9" position="bottom" :style="{ height: '100%' }">
            <e9 v-if="show9" @closeInfo="closeInfo" :id="id"></e9>
        </van-popup>
        <van-popup v-model="show10" position="bottom" :style="{ height: '100%' }">
            <e10 v-if="show10" @closeInfo="closeInfo" :id="id"></e10>
        </van-popup>
        <van-popup v-model="show11" position="bottom" :style="{ height: '100%' }">
            <e11 v-if="show11" @closeInfo="closeInfo" :id="id"></e11>
        </van-popup>

        <van-popup v-model="show12" position="bottom" :style="{ height: '100%' }">
            <e12 v-if="show12" @closeInfo="closeInfo" :id="id"></e12>
        </van-popup>
        <van-popup v-model="show13" position="bottom" :style="{ height: '100%' }">
            <e13 v-if="show13" @closeInfo="closeInfo" :id="id"></e13>
        </van-popup>


        <!--搜索弹窗-->
        <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
            <van-form @submit="search" style="margin-top: 50px">
                <van-field label="泵房编号:" v-model="searchData.pumpNo" clearable></van-field>
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

    import e2 from "./e2";
    import e3 from "./e3";
    import e4 from "./e4";
    import e6 from "./e6";
    import e5 from "./e5";
    import e11 from "./e11";
    import e10 from "./e10";
    import e9 from "./e9";
    import e7 from "./e7";
    import e12 from "./e12";
    import e13 from "./e13";

    import myHeader from "../../../components/myHeader/myHeader";

    export default {
        name: "boxWash",
        components: {myHeader, e2, e4, e6, e5, e11, e10, e9, e7, e12, e13, e3},
        data() {
            return {
                id: '',
                info: {},
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                show6: false,
                show7: false,
                show9: false,
                show10: false,
                show11: false,
                show12: false,
                show13: false,
                searchShow: false,
                searchData: {
                    unitNm: '',
                    pumpNo: '',
                    pumpNm: ''
                },
                tabList: ['已会审', '已交底', '已试压', '已初验', '已移交'],
                tabIndex: 0,
                active: '',
                loading: false,
                pageNo: 1,
                pageSize: 5,
                dataList: [],
                immediate: false,//初始化不加载必须用变量
                finished: false,
            };
        },
        mounted() {
            this.getList()
        },
        methods: {


            showEarly(id, val) {
                this.id = id;
                if (val === 1) {
                    this.show1 = true;
                }
                if (val === 2) {
                    this.show2 = true;
                }
                if (val === 3) {
                    this.show3 = true;
                }
                if (val === 4) {
                    this.show4 = true;
                }
                if (val === 5) {
                    this.show5 = true;
                }
                if (val === 6) {
                    this.show6 = true;
                }
                if (val === 7) {
                    this.show7 = true;
                }
                if (val === 9) {
                    this.show9 = true;
                }
                if (val === 10) {
                    this.show10 = true;
                }
                if (val === 11) {
                    this.show11 = true;
                }
                if (val === 12) {
                    this.show12 = true;
                }
                if (val === 13) {
                    this.show13 = true;
                }
            },

            closeInfo() {
                this.show1 = false;
                this.show2 = false;
                this.show3 = false;
                this.show4 = false;
                this.show5 = false;
                this.show6 = false;
                this.show7 = false;
                this.show9 = false;
                this.show10 = false;
                this.show11 = false;
                this.show12 = false;
                this.show13 = false;
                // this.pageNo = 1;
                // this.dataList = [];
                // this.getList();
            },





            search() {
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            toDetail(item) {
                this.show = true;
                this.info = item;
            },

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
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
                }
                if (this.searchData.pumpNo) {
                    this.query.toW(qry, "pumpNo", this.searchData.pumpNo, "LK");
                }
                if (this.searchData.unitNm) {
                    this.query.toW(qry, "unitNm", this.searchData.unitNm, "LK");
                }
                // if (this.tabIndex === 0) {
                //     this.query.toW(qry, 'pumpStatus', '已会审', "EQ");
                // }
                // if (this.tabIndex === 1) {
                //     this.query.toW(qry, 'pumpStatus', '已交底', "EQ");
                // }
                // if (this.tabIndex === 2) {
                //     this.query.toW(qry, 'pumpStatus', '已试压', "EQ");
                // }
                // if (this.tabIndex === 3) {
                //     this.query.toW(qry, 'pumpStatus', '已初验', "EQ");
                // }
                // if (this.tabIndex === 4) {
                //     this.query.toW(qry, 'pumpStatus', '已移交', "EQ");
                // }


                this.query.toP(qry, this.pageNo, this.pageSize);
                this.query.toO(qry, "earlyNo", "asc");
                this.api.getAcceptList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
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

    /*.van-nav-bar {*/
    /*    z-index: 999;*/
    /*    background-color: #1177B9;*/
    /*    height: 75px;*/
    /*}*/

    /*.van-nav-bar__title {*/
    /*    color: white;*/
    /*    margin-top: 35px;*/
    /*}*/

    /*.van-nav-bar .van-icon {*/
    /*    color: white;*/
    /*}*/
</style>

