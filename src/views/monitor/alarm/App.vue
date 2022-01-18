<template>
    <div id="container">
<!--        <van-nav-bar fixed title="实时警报" @click-left="back" left-arrow > </van-nav-bar>-->
<!--        <div style="height: 75px"></div>-->

        <van-sticky>
            <my-header title="实时警报" @back="back" > </my-header>
            <div class="search">
                <van-tabs swipeable type="card" color="#1177B9" @click="changeTab" v-model="tab1">
                    <van-tab :name="item" :title="item" v-for="(item,index) in menuList1" :key="index"></van-tab>
                </van-tabs>
                <van-icon name="wap-nav" size="0.6rem" color="#1177B9" @click="tab2Show=true"/>
            </div>

        </van-sticky>

        <van-list  v-model="loading"  :finished="finished" finished-text="没有更多了"   @load="onLoad"  :immediate-check="immediate" style="margin-top: 0.2rem">
            <div class="listItem"  v-for="(item,index) in dataList" :key="index" @click="toDetail(item)">
                <div class="itemTop" @click="toDetail(item)" >
                    <div>{{item.pumpNo}}<span></span>{{item.pumpNm}}<span></span>{{item.nm}}</div>
                </div>
                <div  style="margin-left: 10px;padding-bottom: 10px">
                    <van-tag type="success" v-if="item.status ==='已响应'">已响应</van-tag>
                    <van-tag type="warning" v-if="item.status ==='未处理'">未处理</van-tag>

                    <span style="margin-left: 10px">报警时间：{{item.startTm}}</span>
                </div>

                <div class="itemContent">
                    <p v-if="item.status ==='已响应'"><span>响应时间：</span>{{item.confTm}}</p>
                    <p><span>报警类型：</span>{{item.type}}</p>
                    <p><span>报警内容：</span>{{item.val}}</p>
                    <p><span>设备商：</span>{{item.equipmentNm}}</p>
                    <p><span>保养单位：</span>{{item.maintenanceNm}}</p>
                </div>
                <!--<van-cell-group>-->
                    <!--<van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"> </van-field>-->
                    <!--<van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"> </van-field>-->
                    <!--<van-field label="分区名称:" v-model="item.nm" readonly :border="false" right-icon="arrow"  ></van-field>-->
                    <!--<van-field label="报警类型:" v-model="item.type" readonly :border="false"></van-field>-->
                    <!--<van-field label="报警时间:" v-model="item.startTm" readonly :border="false"></van-field>-->
                    <!--<van-button block style="height: 5px" color="#F3F3F3"></van-button>-->
                <!--</van-cell-group>-->
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
        <van-popup v-model="tab2Show" position="right" :style="{ width: '90%',height:'100%' }" >
            <div class="tab2List">
                <p v-for="(item,index) in menuList2" :key="index" :class="{active:item==tab2}" @click="changeTab2(item)">{{item}}</p>
            </div>
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
                tab1:'',
                tab2:'',
                tab2Show:false,
                menuList1:['实时监控','出水低压','出水超压','无负压异常','频率异常','泵房断电断网'],
                menuList2:[
                    '水箱水位低',
                    '水箱水位高',
                    '水箱水位过低',
                    '水箱水位过高',
                    '出水压力超高',
                    '欠压报警',
                    '停机报警',
                    '积水报警',
                    '烟感报警',
                    '入侵报警',
                    '1号泵故障',
                    '1号泵检修',
                    '2号泵故障','2号泵检修','3号泵故障','3号泵检修','4号泵故障','4号泵检修'],
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
                dataForm: {
                    status: '未处理,已响应',
                    type: '"出水低压,出水超压,无负压异常,1号泵频率异常,2号泵频率异常,3号泵频率异常,4号泵频率异常"'
                },
                dataMode: {
                    status: 'IN',
                    type: 'NIN'
                },
            };
        },
        mounted() {
            this.getList()
        },
        methods: {
            changeTab(name, title){
                this.tab1 = title
                if (this.tab1 === '实时监控') {
                    this.dataForm.type = "出水低压,出水超压,无负压异常,1号泵频率异常,2号泵频率异常,3号泵频率异常,4号泵频率异常"
                    this.dataMode.type = "NIN"
                } else {
                    this.dataForm.type = this.tab1
                    this.dataMode.type = null
                }
                this.tab2 = ''
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            changeTab2(val){
                this.tab2 = val
                this.tab1 = ''
                console.log(val)
                if (this.tab2 == ''){
                    this.dataForm.type = "出水低压,出水超压,无负压异常,1号泵频率异常,2号泵频率异常,3号泵频率异常,4号泵频率异常"
                    this.dataMode.type = "NIN"
                    this.tab1 = '实时监控'
                }else {
                    this.dataForm.type = this.tab2
                    this.dataMode.type = null
                }
                this.tab2Show = false
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
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
                console.log(this.tab1)
                let qry = this.query.new();
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
                }
                this.query.toW(qry, "status", "未处理", "EQ");
                this.query.toW(qry, "type", this.dataForm.type, this.dataMode.type);
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
<style lang="less">
    .search{
        display: flex;
        align-items: center;
        background: #F5F2F5;
        padding: 0.2rem 2% 0;
        box-sizing: border-box;
        .van-tabs--card{
            margin-right: 0.1rem;
        }
        .van-tabs__nav--card{
            margin: 0;
        }
    }

</style>
<style lang="less" scoped>
    #container{
        min-height: 100vh;
        background: #F5F2F5;
    }
    .van-nav-bar {
        z-index: 999;
        background-color: #1177B9;
        height: 75px;
    }
    .tab2List{
        padding-top: 0.5rem;
        p{
            border: 1px solid #DAD7DB;
            width: 42%;
            float: left;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.2rem;
            border-radius: 3px;
            margin-left: 3%;
            box-sizing: border-box;
            &:nth-of-type(2n+1){
                margin-left: 6.5%;
            }
        }
        p.active{
            background: #106FB8;
            color: #ffffff;
            border: 1px solid #106FB8;
        }
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
                height: 0.5rem;
                span{
                    color: #909090;
                    width: 1.3rem;
                    display: inline-block;
                    flex-shrink: 0;
                }
            }

        }
    }

</style>

