<template>
    <div id="container">
        <van-nav-bar fixed title="设备巡检" @click-left="back" left-arrow @click-right="searchShow = true">
            <van-icon name="search" slot="right"></van-icon>
        </van-nav-bar>
        <van-tabs v-model="active" color="#1177B9" @change="tabChange" style="margin-top: 75px">
            <van-tab v-for="item in tabList" :title='item' :key="item">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
                    <div v-for="item in dataList" :key="item.id" @click="toDetail(item)">
                        <van-cell-group>
                            <van-field label="巡检单位:" v-model="item.unitNm" readonly :border="false" label-width="120"></van-field>
                            <van-field label="行政区域:" v-model="item.region" readonly :border="false" label-width="120"></van-field>
                            <van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false" label-width="120"></van-field>
                            <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false" label-width="120" right-icon="arrow"></van-field>
                            <van-field label="供水区域:" v-model="item.zoning" readonly :border="false" label-width="120"></van-field>
                            <van-field label="计划巡检时间:" v-model="item.planTm" readonly :border="false" label-width="120"></van-field>
                            <van-field label="计划完成时间:" v-model="item.plan2Tm" readonly :border="false" label-width="120"></van-field>
                            <van-field label="巡检人:" v-model="item.user" readonly :border="false" label-width="120"></van-field>
                        </van-cell-group>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>

        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '90%' }" closeable round close-icon="close">
            <van-cell-group style="margin-top: 50px">
                <van-field v-model="info.pumpNm" label="泵房名称:" readonly label-width="120"></van-field>
                <van-field v-model="info.estateNm" label="小区名称:" readonly label-width="120"></van-field>
                <van-field v-model="info.zoning" label="供水分区：" readonly label-width="120"></van-field>
                <van-field v-model="info.supplyMode" label="供水方式：" label-width="120" readonly></van-field>
                <van-field v-model="info.user" label="巡检人员：" label-width="120" readonly></van-field>
                <van-field v-model="info.unitNm" label="巡检单位：" label-width="120" readonly></van-field>
                <van-field v-model="info.planTm" label="计划时间：" label-width="120" readonly></van-field>
                <van-field v-model="info.plan2Tm" label="计划完成时间：" label-width="120" readonly></van-field>
                <van-field v-model="info.taskTm" label="实际巡检时间：" label-width="120" readonly></van-field>
                <van-field v-model="info.deviceNum" label="设备套数：" label-width="120" readonly></van-field>
                <van-field v-model="info.val21" label="上期电表读数：" label-width="120" readonly></van-field>
                <van-field v-model="info.val22" label="本期电表读数：" label-width="120" readonly></van-field>
                <van-divider>1号泵</van-divider>
                <van-field v-model="info.val1" label="运行编号：" label-width="120" readonly></van-field>
                <van-field v-model="info.val2" label="进水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val3" label="出水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val4" label="电流(A)：" label-width="120" readonly></van-field>
                <van-field v-model="info.val5" label="变频器频率：" label-width="120" readonly></van-field>
                <van-divider>2号泵</van-divider>
                <van-field v-model="info.val6" label="运行编号：" label-width="120" readonly></van-field>
                <van-field v-model="info.val7" label="进水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val8" label="出水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val9" label="电流(A)：" label-width="120" readonly></van-field>
                <van-field v-model="info.val10" label="变频器频率：" label-width="120" readonly></van-field>
                <van-divider>3号泵</van-divider>
                <van-field v-model="info.val11" label="运行编号：" label-width="120" readonly></van-field>
                <van-field v-model="info.val12" label="进水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val13" label="出水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val14" label="电流(A)：" label-width="120" readonly></van-field>
                <van-field v-model="info.val15" label="变频器频率：" label-width="120" readonly></van-field>
                <van-divider>4号泵</van-divider>
                <van-field v-model="info.val16" label="运行编号：" label-width="120" readonly></van-field>
                <van-field v-model="info.val17" label="进水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val18" label="出水压力：" label-width="120" readonly></van-field>
                <van-field v-model="info.val19" label="电流(A)：" label-width="120" readonly></van-field>
                <van-field v-model="info.val20" label="变频器频率：" label-width="120" readonly></van-field>
                <van-divider>进线电源控制箱</van-divider>
                <van-field v-model="info.val23" label="接线是否正常：" label-width="120" readonly></van-field>
                <van-field v-model="info.val24" label="空开是否正常：" label-width="120" readonly></van-field>
                <van-field v-model="info.val25" label="电子元器件是否正常：" label-width="120" readonly></van-field>
                <van-field v-model="info.val26" label="电度表是否正常：" label-width="120" readonly></van-field>
                <van-divider>控制柜</van-divider>
                <van-field v-model="info.val78" label="指示灯：" label-width="120" readonly></van-field>
                <van-field v-model="info.val27" label="防水：" label-width="120" readonly></van-field>
                <van-field v-model="info.val28" label="防尘：" label-width="120" readonly></van-field>
                <van-field v-model="info.val29" label="内接电路：" label-width="120" readonly></van-field>
                <van-field v-model="info.val30" label="电器元件：" label-width="120" readonly></van-field>
                <van-field v-model="info.val31" label="每季对控制器进行除尘：" label-width="120" readonly></van-field>
                <van-field v-model="info.val32" label="除尘日期：" label-width="120" readonly></van-field>
                <van-divider>变频器</van-divider>
                <van-field v-model="info.val33" label="运转：" label-width="120" readonly></van-field>
                <van-field v-model="info.val34" label="是否在最佳状态：" label-width="120" readonly></van-field>
                <van-field v-model="info.val35" label="PLC运转：" label-width="120" readonly></van-field>
                <van-field v-model="info.val36" label="远程通讯状态：" label-width="120" readonly></van-field>
                <van-field v-model="info.val37" label="数据远传参数：" label-width="120" readonly></van-field>
                <van-field v-model="info.val38" label="压力表：" label-width="120" readonly></van-field>
                <van-field v-model="info.val39" label="压力变送器：" label-width="120" readonly></van-field>
                <van-divider>水泵</van-divider>
                <van-field v-model="info.val40" label="运行：" label-width="120" readonly></van-field>
                <van-field v-model="info.val41" label="噪音：" label-width="120" readonly></van-field>
                <van-field v-model="info.val42" label="震动：" label-width="120" readonly></van-field>
                <van-field v-model="info.val43" label="泵体是否发热：" label-width="120" readonly></van-field>
                <van-field v-model="info.val44" label="水泵排气：" label-width="120" readonly></van-field>
                <van-field v-model="info.val45" label="机械密封：" label-width="120" readonly></van-field>
                <van-divider>电机</van-divider>
                <van-field v-model="info.val46" label="运行：" label-width="120" readonly></van-field>
                <van-field v-model="info.val47" label="电机电流：" label-width="120" readonly></van-field>
                <van-field v-model="info.val48" label="电机是否发热：" label-width="120" readonly></van-field>
                <van-field v-model="info.val49" label="水泵、管道、阀门、压力水容器等密封情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val50" label="每季检查水泵远程启闭功能是否完好：" label-width="120" readonly></van-field>
                <van-field v-model="info.val51" label="检查日期：" label-width="120" readonly></van-field>
                <van-divider>每季检查水泵远程启闭功能是否完好</van-divider>
                <van-field v-model="info.val52" label="接线：" label-width="120" readonly></van-field>
                <van-field v-model="info.val53" label="空气开关：" label-width="120" readonly></van-field>
                <van-field v-model="info.val54" label="电子元器件：" label-width="120" readonly></van-field>
                <van-field v-model="info.val55" label="排污泵运行情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val56" label="具体描述：" label-width="120" readonly></van-field>
                <van-field v-model="info.val57" label="无负压设备罐体排污情况：" label-width="120" readonly></van-field>
                <van-divider>水池(箱)</van-divider>
                <van-field v-model="info.val58" label="水箱(池)与水泵联动运转情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val59" label="电动蝶阀使用情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val60" label="液体控制器使用情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val61" label="浮球阀使用情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val62" label="每季检查电动蝶阀启闭功能完好情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val63" label="检查日期：" label-width="120" readonly></van-field>
                <van-field v-model="info.val64" label="是否有泄露现象：" label-width="120" readonly></van-field>
                <van-field v-model="info.val65" label="具体描述：" label-width="120" readonly></van-field>
                <van-field v-model="info.val66" label="水位是否正常：" label-width="120" readonly></van-field>
                <van-field v-model="info.val67" label="水位显示米：" label-width="120" readonly></van-field>
                <van-field v-model="info.val68" label="水箱加盖上锁情况：" label-width="120" readonly></van-field>
                <van-divider>门禁视频</van-divider>
                <van-field v-model="info.val69" label="刷卡开门：" label-width="120" readonly></van-field>
                <van-field v-model="info.val70" label="水位报警：" label-width="120" readonly></van-field>
                <van-field v-model="info.val71" label="球体摄像头使用情况：" label-width="120" readonly></van-field>
                <van-divider>其他设施</van-divider>
                <van-field v-model="info.val72" label="泵房潮湿情况评定：" label-width="120" readonly></van-field>
                <van-field v-model="info.val73" label="泵房照明情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val74" label="具体描述：" label-width="120" readonly></van-field>
                <van-field v-model="info.val75" label="泵房内设备整洁情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val76" label="灭火器情况：" label-width="120" readonly></van-field>
                <van-field v-model="info.val77" label="其他需要说明的情况：" label-width="120" readonly></van-field>
            </van-cell-group>
        </van-popup>
        <!--搜索弹窗-->
        <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
            <van-form @submit="search" style="margin-top: 50px">
                <van-field label="巡检单位:" v-model="searchData.unitNm" clearable></van-field>
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

    export default {
        name: "detection",
        data() {
            return {
                info: {},
                show: false,
                searchShow: false,
                searchData: {
                    unitNm: '',
                    pumpNo: '',
                    pumpNm: ''
                },
                tabList: ['待巡检', '已巡检', '逾期'],
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
                    this.query.toW(qry, "pumpNm", this.searchData.estateNm, "LK");
                }
                if (this.searchData.pumpNo) {
                    this.query.toW(qry, "pumpNo", this.searchData.pumpNo, "LK");
                }
                if (this.searchData.unitNm) {
                    this.query.toW(qry, "unitNm", this.searchData.unitNm, "LK");
                }
                if (this.tabIndex === 0) {
                    this.query.toW(qry, 'status', '待巡检', "EQ");
                }
                if (this.tabIndex === 1) {
                    this.query.toW(qry, 'status', '已巡检', "EQ");
                }
                if (this.tabIndex === 2) {
                    this.query.toW(qry, 'status', '逾期', "EQ");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.query.toO(qry, "crtTm", "desc");
                this.api.getDetectionList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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

