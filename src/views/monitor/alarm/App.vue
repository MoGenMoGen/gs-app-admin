<template>
    <div id="container">
<!--        <van-nav-bar fixed title="实时警报" @click-left="back" left-arrow > </van-nav-bar>-->
<!--        <div style="height: 75px"></div>-->

        <van-sticky>
            <my-header title="实时警报" @back="back" > </my-header>
        </van-sticky>

        <van-list  v-model="loading"  :finished="finished" finished-text="没有更多了"   @load="onLoad"  :immediate-check="immediate" >
            <div   v-for="(item,index) in dataList" :key="index" @click="toDetail(item)">
                <van-cell-group>
                    <van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"> </van-field>
                    <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"> </van-field>
                    <van-field label="分区名称:" v-model="item.nm" readonly :border="false" right-icon="arrow"  ></van-field>
                    <van-field label="报警类型:" v-model="item.type" readonly :border="false"></van-field>
                    <van-field label="报警时间:" v-model="item.startTm" readonly :border="false"></van-field>
                    <van-button block style="height: 5px" color="#F3F3F3"></van-button>
                </van-cell-group>
            </div>
        </van-list>


        <van-popup v-model="show" position="bottom" :style="{ height: '50%' }"  round>

            <van-cell-group>
                <van-field label="报警原因:" v-model="info.reason" > </van-field>
                <van-field label="确认人:" v-model="info.confUser" > </van-field>
                <van-field  readonly  clickable  name="datetimePicker"  :value="info.confTm"  label="确认时间"   placeholder="点击选择时间"   @click="showPicker = true"></van-field>

            </van-cell-group>
            <van-goods-action >
                <van-goods-action-button type="primary" text="确认" @click="addAlarm()"></van-goods-action-button>
            </van-goods-action>
        </van-popup>

        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker   v-model="currentDate"   type="datetime"    @confirm="onConfirm"  @cancel="showPicker = false"></van-datetime-picker>
        </van-popup>
    </div>
</template>

<script>
    import { Dialog ,Toast } from 'vant';
    import myHeader from "../../../components/myHeader/myHeader";
    export default {
        components: {myHeader},
        name: "alarm",
        data() {
            return {
                showPicker:false,
                currentDate: new Date(),
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
            onConfirm(val){
              this.info.confTm = this.until.dateFormat(val);
              this.showPicker = false;
            },
            addAlarm(){
                Dialog.confirm({
                    title: '注意',
                    message: '是否确认警报'
                }).then(() => {
                    this.info.status = '已确认';
                    this.api.updAlarm(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('提交成功');
                            this.show = false;
                            this.pageNo = 1;
                            this.dataList = [];
                            this.getList();
                        }
                    })


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
                this.query.toW(qry, "status", "未处理", "EQ");
                this.query.toP(qry, this.pageNo, this.pageSize);

                this.api.getAlarmList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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
    .van-nav-bar {
        z-index: 999;
        background-color: #1177B9;
        height: 75px;
    }



</style>

