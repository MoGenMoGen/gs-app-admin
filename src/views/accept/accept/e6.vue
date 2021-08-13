<template>
    <div id="container">
        <van-sticky>
            <my-header title="门禁视频" @back="back" :search-status="false"> </my-header>
        </van-sticky>
        <van-form>
<!--            <van-field v-model="info.estateNm" label="小区名称：" readonly  label-width="80" >  </van-field>-->
            <van-field v-model="info.pumpNm" label="泵房名称："   label-width="80"  readonly>  </van-field>
            <van-field v-model="info.region" label="行政区域："   label-width="80"  readonly>  </van-field>
            <van-field v-model="info.recordNm" label="备案名："   label-width="80"  readonly>  </van-field>

            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>验收内容及结论</van-cell>
            <van-cell>
                <span class="span">
                   1.门禁读卡器安装符合要求，能读卡开门
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val1,'门禁读卡器安装符合要求，能读卡开门')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val1" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val1 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   2.灵性锁安装符合要求（手动钥匙、旋钮开启，锁舌弹出、回缩正常）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val2,'灵性锁安装符合要求（手动钥匙、旋钮开启，锁舌弹出、回缩正常）')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val2" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val2 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   3.门禁主机、报警主机安装符合要求
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80"  @click="off(info.val3,'门禁主机、报警主机安装符合要求')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val3" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val3 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   4.门磁探测器安装符合要求，现场报警正常（手动钥匙开门，触发报警）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val4,'门磁探测器安装符合要求，现场报警正常（手动钥匙开门，触发报警）')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val4" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val4 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   5.水位探测器安装符合要求，现场报警正常（垂直安装，手动触碰浮球顶起，触发报警）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val5,'水位探测器安装符合要求，现场报警正常（垂直安装，手动触碰浮球顶起，触发报警）')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val5" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val5 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   6.红外报警器安装符合要求，现场报警正常（泵房门关闭，人在泵房内走动，触发报警）
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val6,'红外报警器安装符合要求，现场报警正常（泵房门关闭，人在泵房内走动，触发报警）')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val6" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val6 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   7.硬盘录像机、枪型摄像机、球型摄像机安装符合要求
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val7,'硬盘录像机、枪型摄像机、球型摄像机安装符合要求')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val7" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val7 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   8.海康门禁视频监控平台能读取泵房现场画面，球机并能转动
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val8,'海康门禁视频监控平台能读取泵房现场画面，球机并能转动')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val8" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val8 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                   9.海康门禁视频监控平台能实现“远程开门
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val9,'海康门禁视频监控平台能实现“远程开门')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val9" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val9 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   10.海康门禁视频监控平台能收到“门磁报警”
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val10,'海康门禁视频监控平台能收到“门磁报警”')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val10" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val10 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   11.海康门禁视频监控平台能收到“红外报警”
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val11,'海康门禁视频监控平台能收到“红外报警”')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val11" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val11 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                   12.海康门禁视频监控平台能收到“积水报警”
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80" @click="off(info.val12,'海康门禁视频监控平台能收到“积水报警”')">
                 <slot slot="input">
                    <van-radio-group v-model="info.val12" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val12 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field  v-model="info.val13"  rows="3"   autosize    label="其他意见：" type="textarea"  placeholder="请输入" label-width="80" ></van-field>


            <van-field name="radio" label="整改要求：" label-width="80">
                 <slot slot="input">
                    <van-radio-group v-model="info.val61" direction="horizontal">
                        <van-radio name="无整改内容，验收通过" shape="square">无整改内容，验收通过</van-radio>
                        <van-radio name="需要整改，内容如下" shape="square">需要整改，内容如下</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val61 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field  v-model="info.val62"  rows="4"   autosize    label="整改要求：" type="textarea"  placeholder="请输入" label-width="80" ></van-field>
            <van-field name="radio" label="整改期限：" label-width="80">
                 <slot slot="input">
                    <van-radio-group v-model="info.val63" direction="horizontal">
                        <van-radio name="2周内整改完毕" shape="square">2周内整改完毕</van-radio>
                        <van-radio name="1个月内整改完毕" shape="square">1个月内整改完毕</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val63 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-field label="验收人员签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(1)"  width="100%" height="6rem" :src="info.val64"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val65"  label="验收日期："  placeholder="点击选择时间" @click="dateShow(1)" label-width="80"></van-field>


            <van-field name="radio" label="复检情况：" label-width="80">
                 <slot slot="input">
                    <van-radio-group v-model="info.val66" direction="horizontal">
                        <van-radio name="已按要求整改，验收通过" shape="square">已按要求整改，验收通过</van-radio>
                        <van-button  type="primary" size="mini" @click="info.val66 = ''" plain >取消</van-button>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field label="复检人员签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(2)"  width="100%" height="6rem" :src="info.val67"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val68"  label="复检日期："  placeholder="点击选择时间" @click="dateShow(2)" label-width="80"></van-field>

            <van-row gutter="2"  v-if="info.status !== '已提交'">
                <van-col span="12">
                    <van-button type="primary" color="#00CED1" block @click="keep">保存</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" color="#008B8B" block @click="submit">提交</van-button>
                </van-col>
            </van-row>
            <van-row gutter="2" v-if="info.status == '已提交' && info.state != 0">
                <van-col span="24">
                    <van-button type="primary" color="#00CED1" block @click="toBack">回退</van-button>
                </van-col>
            </van-row>


            <van-row gutter="2" v-if="info.state === 0">
                <van-col span="24">
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
        name: "e6",
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
            //回退
            toBack(){
                this.info.status=""
            },

            off(type,val){
                if (type === '不合格'){
                    if (this.info.val62.search(val) === -1){
                        this.info.val62 =  this.info.val62 + val +','
                    }
                }
            },

            //定时保存
            timerKeep() {
                if (this.info.status === '保存'){
                    this.info.status = '保存';
                    this.api.updE6(JSON.stringify(this.info)).then(res => {
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
            // onConfirmCalendar(item){
            //     this.info.val28  = this.until.dateFormatDay(item);
            //     this.showCalendar = false;
            // },
            onConfirm(time){
                //验收日期
                if (this.dateVal === 1){
                    this.info.val65 = this.until.dateFormatDay(time);
                }
                //复检日期
                if (this.dateVal === 2){
                    this.info.val68 = this.until.dateFormatDay(time);
                }
                this.showPicker = false;
            },
            canvasInit() {
                this.$refs.SignCanvas.canvasInit();
            },
            writeEnd() {
                //验收人员签字
                if (this.signVal === 1){
                    this.info.val64 = this.$refs.SignCanvas.saveAsImg();
                }
                //复检人员签字
                if (this.signVal === 2){
                    this.info.val67 = this.$refs.SignCanvas.saveAsImg();
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
                this.api.getE6(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.info = res.data.list[0];
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
                    this.api.updE6(JSON.stringify(this.info)).then(res => {
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
                    this.api.updE6(JSON.stringify(this.info)).then(res => {
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

