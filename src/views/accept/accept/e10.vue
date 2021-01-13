<template>
    <div id="container">
        <van-sticky>
            <my-header title="泵房设备最终验收报告" @back="back" :search-status="false"> </my-header>
        </van-sticky>
        <van-form>
            <van-field v-model="info.pumpNm" label="泵房名称："   label-width="80"  readonly>  </van-field>
<!--            <van-field v-model="info.estateNm" label="小区名称："  label-width="80" readonly >  </van-field>-->
            <van-field v-model="info.deviceUnit" label="设备商："  label-width="80" readonly >  </van-field>
            <van-field v-model="info.supplyMode" label="供水方式："  label-width="80" readonly >  </van-field>

            <van-field readonly clickable name="date"  :value="info.val1"  label="终验日期："  placeholder="点击选择时间" @click="dateShow(1)" label-width="100" right-icon="calender-o"></van-field>
            <van-field v-model="info.val2" label="验收人员："  label-width="100"  placeholder="请输入验收人员" >  </van-field>


            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>设备故障记录</van-cell>
            <van-field v-model="info.val5" label="故障内容："  label-width="100"  placeholder="请输入故障内容" >  </van-field>

            <van-field readonly clickable name="date"  :value="info.val3"  label="故障时间："  placeholder="点击选择时间" @click="dateShow(8)" label-width="100" right-icon="calender-o"></van-field>
            <van-field readonly clickable name="date"  :value="info.val4"  label="排除时间："  placeholder="点击选择时间" @click="dateShow(9)" label-width="100" right-icon="calender-o"></van-field>

            <van-field v-model="info.val16" label="试运行__月："  label-width="100"  placeholder="请输入试运行几个月" >  </van-field>
            <van-field readonly clickable name="date"  :value="info.val6"  label="试运行日期："  placeholder="点击选择日期" @click="dateShow(2)" label-width="100" right-icon="calender-o"></van-field>
            <van-field readonly clickable name="date"  :value="info.val7"  label="质保开始时间："  placeholder="点击选择时间" @click="dateShow(3)" label-width="100" right-icon="calender-o"></van-field>
            <van-field readonly clickable name="date"  :value="info.val8"  label="质保结束时间："  placeholder="点击选择时间" @click="dateShow(4)" label-width="100" right-icon="calender-o"></van-field>

            <van-field label="设施维护科负责人签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(1)"  width="100%" height="6rem" :src="info.val9"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val10"  label="签字日期："  placeholder="点击选择时间" @click="dateShow(5)" label-width="100" right-icon="calender-o"></van-field>


            <van-field label="生产运行科负责人签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(2)"  width="100%" height="6rem" :src="info.val11"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val12"  label="签字日期："  placeholder="点击选择时间" @click="dateShow(6)" label-width="100" right-icon="calender-o"></van-field>

            <van-field v-model="info.val15" label="资料归档情况："  label-width="100"  placeholder="请输入资料归档情况" >  </van-field>


            <van-field label="档案员签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(3)"  width="100%" height="6rem" :src="info.val13"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val14"  label="签字日期："  placeholder="点击选择时间" @click="dateShow(7)" label-width="100" right-icon="calender-o"></van-field>


            <van-row gutter="2"  v-if="info.status !== '已提交'">
                <van-col span="12">
                    <van-button type="primary" color="#00CED1" block @click="keep">保存</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" color="#008B8B" block @click="submit">提交</van-button>
                </van-col>
            </van-row>

        </van-form>
        <!-- 签名弹窗-->
        <van-popup v-model="showSign" position="top" :style="{ height: '100%' }" closeable>
            <sign ref="SignCanvas"></sign>
            <van-goods-action style="margin-bottom: 50px">
                <van-goods-action-button color="#be99ff" text="重写" @click="canvasInit"></van-goods-action-button>
                <van-goods-action-button color="#7232dd" text="确定" @click="writeEnd"></van-goods-action-button>
            </van-goods-action>
        </van-popup>
        <!--时间弹窗-->
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker  v-model="currentDate" type="date"  @confirm="onConfirm"   @cancel="showPicker = false"></van-datetime-picker>
        </van-popup>
    </div>
</template>

<script>
    import sign from "../../../components/sign";
    import myHeader from "../../../components/myHeader/myHeader";
    import { Toast,Dialog } from 'vant';
    export default {
        name: "e10",
        components: {sign,myHeader},

        data() {
            return {
                timer: '',
                showPicker:false,
                showCalendar: false,
                currentDate: new Date(),
                showSign:false,
                signVal:'',
                info:{},
                checkboxGroup1:[],
                checkboxGroup2:[],
                checkboxGroup3:[],
                dateVal:'',
            };
        },
        mounted() {
            this.getInfo(this.id)
            this.timer = setInterval(this.timerKeep, 30000);
        },
        props: ["id"],
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            //定时保存
            timerKeep() {
                if (this.info.status === '保存'){
                    this.info.status = '保存';
                    this.api.updE10(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('自动保存成功');
                        }else {
                            Toast.fail('保存失败');
                        }
                    })
                }
            },
            dateShow(val){
                this.dateVal = val;
                this.showPicker = true
            },

            onConfirm(time){

                if (this.dateVal === 1){
                    this.info.val1 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 2){
                    this.info.val6 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 3){
                    this.info.val7 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 4){
                    this.info.val8 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 5){
                    this.info.val10 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 6){
                    this.info.val12 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 7){
                    this.info.val14 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 8){
                    this.info.val3 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 9){
                    this.info.val4 = this.until.dateFormatDay(time);
                }
                this.showPicker = false;
            },
            canvasInit() {
                this.$refs.SignCanvas.canvasInit();
            },
            writeEnd() {
                if (this.signVal === 1){
                    this.info.val9 = this.$refs.SignCanvas.saveAsImg();
                }
                if (this.signVal === 2){
                    this.info.val11 = this.$refs.SignCanvas.saveAsImg();
                }
                if (this.signVal === 3){
                    this.info.val13 = this.$refs.SignCanvas.saveAsImg();
                }
                this.showSign = false;
                this.$refs.SignCanvas.canvasInit();
            },
            signShow(val){
                this.signVal = val;
                this.showSign = true;
            },
            getInfo(id){
                let qry = this.query.new();
                this.query.toW(qry, 'earlyId', id, "EQ");
                this.api.getE10(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.info = res.data.list[0];
                        console.log(this.info)
                    }
                })
            },
            back() {
                this.$emit('closeInfo')
            },
            //提交
            submit(){
                Dialog.confirm({
                    title: '注意',
                    message: '确定提交？'
                }).then(() => {
                    this.info.status = '已提交';
                    this.api.updE10(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('提交成功');
                            this.$emit('closeInfo')
                        }else {
                            Toast.fail('提交失败');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            //保存
            keep(){
                Dialog.confirm ({
                    title: '注意',
                    message: '确定保存？'
                }).then(() => {
                    this.info.status = '保存';
                    this.api.updE10(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('保存成功');
                        }else {
                            Toast.fail('保存失败');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .span{
        color: #999999;
        font-size: 10px;
    }
    .van-cell{
        font-size: 10px;
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

