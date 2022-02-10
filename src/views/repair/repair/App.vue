
<template>
    <div id="container">
<!--        <van-nav-bar fixed title="设备维修" @click-left="back" left-arrow @click-right="searchShow = true">-->
<!--            <van-icon name="search" slot="right"></van-icon>-->
<!--        </van-nav-bar>-->
        <my-header title="设备维修" @back="back" @search="searchShow = true"> </my-header>

        <van-tabs v-model="active" color="#1177B9" @change="tabChange">
            <van-tab v-for="item in tabList" :title='item' :key="item">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
                    <div v-for="item in dataList" :key="item.id" @click="toDetail(item)" class="listItem">
                        <div class="itemTop" @click="toDetail(item)" >
                            <div>{{item.pumpNo}}<span></span>{{item.pumpNm}}<span></span>{{item.region}}</div>
                        </div>
                        <div  style="margin-left: 10px;padding-bottom: 10px">
                            <span>维修单号：{{item.no}}</span>
                        </div>

                        <div class="itemContent">
                            <p><span>申请单位：</span>{{item.applicantUnitNm}}</p>
                            <p><span>申请日期：</span>{{item.applicantTm}}</p>
                            <p><span>维修单位：</span>{{item.repairUnitNm}}</p>
                            <p><span>预算：</span>{{item.budget}}</p>
                            <p><span>维修事由：</span>{{item.cause}}</p>
                        </div>
                        <div style="margin-left: 10px;margin-bottom: 5px">
                            <van-tag round type="primary" v-if="item.opinion1Status === 1">经办人正在审批</van-tag>
                            <van-tag round type="primary" v-if="item.opinion2Status === 1">设施科副科长正在审批</van-tag>
                            <van-tag round type="primary" v-if="item.opinion3Status === 1">设施科科长正在审批</van-tag>
                            <van-tag round type="primary" v-if="item.opinion4Status === 1">分管经理正在审批</van-tag>
                            <van-tag round type="primary" v-if="item.opinion5Status === 1">经理正在审批</van-tag>

                            <van-tag round type="success" v-if="item.opinion1Status === 2">经办人审批通过</van-tag>
                            <van-tag round type="success" v-if="item.opinion2Status === 2">设施科副科长审批通过</van-tag>
                            <van-tag round type="success" v-if="item.opinion3Status === 2">设施科科长审批通过</van-tag>
                            <van-tag round type="success" v-if="item.opinion4Status === 2">分管经理审批通过</van-tag>
                            <van-tag round type="success" v-if="item.opinion5Status === 2">经理审批通过</van-tag>

                            <van-tag round type="danger" v-if="item.opinion1Status === 3">经办人审批不通过</van-tag>
                            <van-tag round type="danger" v-if="item.opinion2Status === 3">设施科副科长审批不通过</van-tag>
                            <van-tag round type="danger" v-if="item.opinion3Status === 3">设施科科长审批不通过</van-tag>
                            <van-tag round type="danger" v-if="item.opinion4Status === 3">分管经理审批不通过</van-tag>
                            <van-tag round type="danger" v-if="item.opinion5Status === 3">经理审批不通过</van-tag>
                        </div>
                        <!--<van-cell-group>-->
                            <!--<van-field label="维修单号:" v-model="item.no" readonly :border="false" label-width="120"></van-field>-->
                            <!--<van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false" label-width="120"></van-field>-->
                            <!--<van-field label="维修单位:" v-model="item.repairUnitNm" readonly :border="false" label-width="120"></van-field>-->
                            <!--<van-field label="申请日期:" v-model="item.applicantTm" readonly :border="false" label-width="120"></van-field>-->
                            <!--<van-field label="预算:" v-model="item.budget" readonly :border="false" label-width="120"></van-field>-->
                            <!--<van-field label="维修事由:" v-model="item.cause" readonly :border="false" label-width="120"></van-field>-->
                            <!--<div style="margin-left: 10px;margin-bottom: 5px">-->
                                <!--<van-tag round type="primary" v-if="item.opinion1Status === 1">经办人正在审批</van-tag>-->
                                <!--<van-tag round type="primary" v-if="item.opinion2Status === 1">设施科副科长正在审批</van-tag>-->
                                <!--<van-tag round type="primary" v-if="item.opinion3Status === 1">设施科科长正在审批</van-tag>-->
                                <!--<van-tag round type="primary" v-if="item.opinion4Status === 1">分管经理正在审批</van-tag>-->
                                <!--<van-tag round type="primary" v-if="item.opinion5Status === 1">经理正在审批</van-tag>-->

                                <!--<van-tag round type="success" v-if="item.opinion1Status === 2">经办人审批通过</van-tag>-->
                                <!--<van-tag round type="success" v-if="item.opinion2Status === 2">设施科副科长审批通过</van-tag>-->
                                <!--<van-tag round type="success" v-if="item.opinion3Status === 2">设施科科长审批通过</van-tag>-->
                                <!--<van-tag round type="success" v-if="item.opinion4Status === 2">分管经理审批通过</van-tag>-->
                                <!--<van-tag round type="success" v-if="item.opinion5Status === 2">经理审批通过</van-tag>-->

                                <!--<van-tag round type="danger" v-if="item.opinion1Status === 3">经办人审批不通过</van-tag>-->
                                <!--<van-tag round type="danger" v-if="item.opinion2Status === 3">设施科副科长审批不通过</van-tag>-->
                                <!--<van-tag round type="danger" v-if="item.opinion3Status === 3">设施科科长审批不通过</van-tag>-->
                                <!--<van-tag round type="danger" v-if="item.opinion4Status === 3">分管经理审批不通过</van-tag>-->
                                <!--<van-tag round type="danger" v-if="item.opinion5Status === 3">经理审批不通过</van-tag>-->
                            <!--</div>-->
                            <!--<van-button block style="height: 5px" color="#F3F3F3"></van-button>-->
                        <!--</van-cell-group>-->
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>

        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '95%' }" closeable round close-icon="close">
            <van-cell-group style="margin-top: 50px">
<!--                <van-field v-model="info.applicantUnitNm" label="申请单位" readonly></van-field>-->
<!--                <van-field v-model="info.repairUnitNm" label="维修单位" readonly></van-field>-->
<!--                <van-field v-model="info.applicantTm" label="申请日期" readonly></van-field>-->
<!--                <van-field v-model="info.applicantUser" label="申请人" readonly></van-field>-->
<!--                <van-field v-model="info.pumpNm" label="泵房名称" readonly></van-field>-->
<!--                <van-field v-model="info.partitionNm" label="泵房分区" readonly></van-field>-->
<!--                <van-field v-model="info.planTm" label="计划维修日期" readonly></van-field>-->
<!--                <van-field v-model="info.planFinishTm" label="计划完成日期" readonly></van-field>-->
<!--                <van-field v-model="info.budget" label="预算" readonly></van-field>-->
<!--                <van-field v-model="info.cause" label="维修事由" readonly></van-field>-->
<!--                <van-field v-model="info.situation" label="维修情况" readonly></van-field>-->
<!--                <van-field label="本年度已维修费用:" v-model="info.yearMoney" readonly label-width="140"></van-field>-->
<!--                <van-field label="累计维修费用:" v-model="info.allMoney" readonly label-width="140"></van-field>-->
                <van-field v-model="info.applicantUser" label="申请人" readonly></van-field>
                <van-field v-model="info.applicantTm" label="申请日期" readonly></van-field>
                <van-field v-model="info.pumpNm" label="泵房名称" readonly></van-field>
                <van-field v-model="info.region" label="行政区域" readonly></van-field>
                <van-field v-model="info.pumpNo" label="泵房编号" readonly></van-field>
                <van-field v-model="info.warrant" label="质保情况" readonly></van-field>
                <van-field v-model="info.repairRange" label="维修范围" readonly></van-field>
                <van-field v-model="info.cause" label="维修事由" readonly></van-field>
                <van-field v-model="info.waterOff" label="是否停水" readonly></van-field>
                <van-field v-model="info.repairUnitNm" label="维修单位" readonly></van-field>
                <van-field v-model="info.planFinishTm" label="计划完成日期" readonly></van-field>
                <van-field v-model="info.type" label="维修类别" readonly></van-field>
                <van-field v-model="info.budget" label="本次维修费用" label-width="150" readonly></van-field>
                <van-field v-model="info.yearMoney" label="本年度已维修费用" label-width="150" readonly></van-field>
                <van-field v-model="info.allMoney" label="累计维修费用" label-width="150" readonly></van-field>
            </van-cell-group>
            <el-table :data="repairInfoList" border style="width: 100% ; margin-top: 10px" size="mini"
                      :header-cell-style="{background:'#aed7e3',color:'#212c33'}">
                <el-table-column prop="gsDeviceRepairInfoVo.nm" label="配件名称" align="center"></el-table-column>
                <el-table-column prop="gsDeviceRepairInfoVo.brand" label="品牌" align="center"></el-table-column>
                <el-table-column prop="gsDeviceRepairInfoVo.spec" label="型号规格" align="center"></el-table-column>
                <el-table-column prop="gsDeviceRepairInfoVo.price" label="参考单价" align="center"></el-table-column>
                <el-table-column prop="gsDeviceRepairInfoVo.qty" label="数量"></el-table-column>
                <el-table-column prop="gsDeviceRepairInfoVo.amount" label="总金额" align="center"></el-table-column>
            </el-table>
            <van-field v-if="info.opinion1Status !== 0" :readonly="info.updBy !== '1'" v-model="info.opinion1" rows="2" autosize label-width="140"
                       label="经办人意见:" type="textarea" placeholder="请输入"></van-field>
            <van-field v-if="info.opinion2Status !== 0" :readonly="info.updBy !== '2'" v-model="info.opinion2" rows="2" autosize label-width="140"
                       label="设施科副科长意见:" type="textarea" placeholder="请输入"></van-field>
            <van-field v-if="info.opinion3Status !== 0" :readonly="info.updBy !== '3'" v-model="info.opinion3" rows="2" autosize label-width="140"
                       label="设施科科长意见:" type="textarea" placeholder="请输入"></van-field>
            <van-field v-if="info.opinion4Status !== 0" :readonly="info.updBy !== '4'" v-model="info.opinion4" rows="2" autosize label-width="140"
                       label="分管经理意见:" type="textarea" placeholder="请输入"></van-field>
            <van-field v-if="info.opinion5Status !== 0" :readonly="info.updBy !== '5'" v-model="info.opinion5" rows="2" autosize label-width="140" label="经理意见:"
                       type="textarea" placeholder="请输入"></van-field>

            <van-row v-if="action" >
                <van-col span="12">
                    <van-button type="primary" @click="upd(2)" block>审核通过</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="warning" @click="upd(3)" block>审核不通过</van-button>
                </van-col>
            </van-row>

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
    import {Dialog, Toast} from 'vant';
    import myHeader from "../../../components/myHeader/myHeader";
    export default {
        name: "repair",
        data() {
            return {
                action: false,
                info: {
                    opinion1:'',
                    opinion2:'',
                    opinion3:'',
                    opinion4:'',
                    opinion5:'',
                },
                show: false,
                searchShow: false,
                searchData: {
                    pumpNm: ''
                },
                tabList: ['待审批', '已审批'],
                tabIndex: 0,
                searchText: '',
                active: '',
                loading: false,
                pageNo: 1,
                pageSize: 10,
                dataList: [],
                immediate: false,//初始化不加载必须用变量
                finished: false,
                repairInfoList: []
            };
        },
        components: {myHeader},
        mounted() {
            this.getList()
        },
        methods: {
            upd(val) {
                Dialog.confirm({
                    title: '注意',
                    message: '是否确认操作？'
                }).then(() => {
                    if (this.info.updBy === "1") {
                        if (this.info.opinion1 == '') {
                            return Toast.fail('请输入意见')
                        }
                        this.info.opinion1Status = val;
                    }
                    if (this.info.updBy === "2") {
                        if (this.info.opinion2 == '') {
                            return Toast.fail('请输入意见')
                        }
                        this.info.opinion2Status = val;
                    }
                    if (this.info.updBy === "3") {
                        if (this.info.opinion3 == '') {
                            return Toast.fail('请输入意见')
                        }
                        this.info.opinion3Status = val;
                    }
                    if (this.info.updBy === "4") {
                        if (this.info.opinion4 == '') {
                            return Toast.fail('请输入意见')
                        }
                        this.info.opinion4Status = val;
                    }
                    if (this.info.updBy === "5") {
                        if (this.info.opinion5 == '') {
                            return Toast.fail('请输入意见')
                        }
                        this.info.opinion5Status = val;
                    }
                    this.api.updRepair(JSON.stringify(this.info)).then(res => {
                        this.show = false;
                        Toast('审批完成');
                        this.pageNo = 1;
                        this.dataList = [];
                        this.getList();
                    });


                }).catch(() => {
                    // on cancel
                });

            },


            search() {
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            toDetail(item) {
                this.api.getRepairInfo(item.id).then(res => {
                    this.info = res.data.gsDeviceRepairVo;
                    this.repairInfoList = res.data.gsDeviceRepairInfoDtos;
                    //是否评价
                    if (this.info.updBy === "1") {
                        if (this.info.opinion1Status === 1) {
                            this.action = true;
                        }
                    }
                    if (this.info.updBy === "2") {
                        if (this.info.opinion2Status === 1) {
                            this.action = true;
                        }
                    }
                    if (this.info.updBy === "3") {
                        if (this.info.opinion3Status === 1) {
                            this.action = true;
                        }
                    }
                    if (this.info.updBy === "4") {
                        if (this.info.opinion4Status === 1) {
                            this.action = true;
                        }
                    }
                    if (this.info.updBy === "5") {
                        if (this.info.opinion5Status === 1) {
                            this.action = true;
                        }
                    }


                    this.show = true;


                });
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
                this.query.toO(qry, "applicantTm", "desc");
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
                }
                if (this.tabIndex === 0) {
                    this.query.toW(qry, 'allStatus', 0, "EQ");
                }
                if (this.tabIndex === 1) {
                    this.query.toW(qry, 'allStatus', 1, "EQ");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);

                this.api.getRepairPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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
    .van-list{
        margin-top: 0.15rem;
    }
    #container{
        min-height: 100vh;
        background: #F5F2F5;
    }
    .listItem{
        background: #ffffff;
        border-radius: 0.1rem;
        margin: 0 auto 0.15rem;
        width: 96%;
        overflow: hidden;
        padding-bottom: 0.1rem;
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
            }
        }


        .itemContent{
            width: 95%;
            margin: 0 auto;
            border-top:1px solid #E9E9E9;
            padding: 0.2rem 0;
            p{
                display: flex;
                align-items: center;
                padding: 0.1rem 0;
                >span{
                    color: #909090;
                    width: 1.3rem;
                    display: inline-block;
                    flex-shrink: 0;
                }
            }

        }
    }
</style>

