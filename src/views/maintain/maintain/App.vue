<template>
    <div id="container">
        <div class="myTop">
            <my-header title="设备保养" @back="back" @search="searchShow = true"> </my-header>
        </div>
        <van-tabs v-model="active" color="#1177B9" @change="tabChange">
                <van-tab v-for="item in tabList" :title='item' :key="item">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  :immediate-check="immediate">
                        <div v-for="item in dataList" :key="item.id" @click="toDetail(item)" class="listItem">
                            <div class="itemTop">
                                <div>{{item.pumpNo}}<span></span>{{item.pumpNm}}<span></span>{{item.region}}
                                </div>

                                <img :src="arrowDownBlue" :class="{showMore:item.showMore}"/>
                            </div>
                            <div  style="margin-left: 10px;padding-bottom: 10px">
                                <span style="font-size: 10px;">计划保养开始日期:{{item.planTm}}</span>
                            </div>

                            <div class="itemContent">
                                <p><span>计划保养结束日期：</span>{{item.plan2Tm}}</p>
                                <p><span>保养单位：</span>{{item.unitNm}}</p>
                            </div>
                            <!--<van-cell-group>-->
                                <!--<van-field label="保养单位:" v-model="item.unitNm" readonly :border="false" label-width="140"></van-field>-->
                                <!--<van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false" label-width="140"></van-field>-->
                                <!--<van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false" label-width="140"></van-field>-->
                                <!--<van-field label="供水区域:" v-model="item.zoning" readonly :border="false" label-width="140" right-icon="arrow"></van-field>-->
                                <!--<van-field label="计划保养开始日期:" v-model="item.planTm" readonly :border="false" label-width="140"></van-field>-->
                                <!--<van-field label="计划保养结束日期:" v-model="item.plan2Tm" readonly :border="false" label-width="140"></van-field>-->
                                <!--<van-button block style="height: 5px" color="#F3F3F3"></van-button>-->
                            <!--</van-cell-group>-->
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

<style lang="less">
    #container{
        display: flex;
        flex-direction: column;
        height: 100vh;
        .van-tabs{
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: scroll;
            .van-tabs__content{
                margin-top: 10px;
                flex: 1;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
            }
        }
    }
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
    #container{
        min-height: 100vh;
        background: #F5F2F5;
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

            p{
                width: 100%;
                display: flex;
                align-items: center;
                height: 0.5rem;
                span{
                    color: #909090;
                    width: 2rem;
                    display: inline-block;
                    flex-shrink: 0;
                }
                img{
                    width: 0.45rem;
                }
            }

        }
    }
</style>

