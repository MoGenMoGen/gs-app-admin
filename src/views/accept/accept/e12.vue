<template>
    <div id="container">
        <van-sticky>
            <my-header title="水箱验收表" @back="back" :search-status="false"></my-header>
        </van-sticky>
        <van-form>
            <van-field v-model="info.pumpNm" label="泵房名称：" label-width="80" readonly></van-field>
<!--            <van-field v-model="info.estateNm" label="小区名称：" label-width="80" readonly></van-field>-->
            <van-field v-model="info.recordNm" label="备案名：" label-width="80" readonly></van-field>
            <van-field v-model="info.deviceUnit" label="设备厂家：" label-width="80" readonly></van-field>

            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>水    箱</van-cell>
            <van-field v-model="info.val40" label="水箱1尺寸："  label-width="80"  placeholder="请输入水箱1尺寸" clearable></van-field>
            <van-field v-model="info.val41" label="水箱1容积："  label-width="80"  placeholder="请输入水箱1容积" clearable></van-field>
            <van-field v-model="info.val42" label="水箱1数量："  label-width="80"  placeholder="水箱1数量" clearable></van-field>
            <van-field name="radio" label="水箱1：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val43" direction="horizontal">
                        <van-radio name="独立" shape="square">独立</van-radio>
                        <van-radio name="内分割" shape="square">内分割</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val44" label="水箱2尺寸："  label-width="80"  placeholder="请输入水箱2尺寸" clearable></van-field>
            <van-field v-model="info.val45" label="水箱2容积："  label-width="80"  placeholder="请输入水箱2容积" clearable></van-field>
            <van-field v-model="info.val46" label="水箱2数量："  label-width="80"  placeholder="水箱2数量" clearable></van-field>
            <van-field name="radio" label="水箱2：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val47" direction="horizontal">
                        <van-radio name="独立" shape="square">独立</van-radio>
                        <van-radio name="内分割" shape="square">内分割</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val48" label="水箱3尺寸："  label-width="80"  placeholder="请输入水箱3尺寸" clearable></van-field>
            <van-field v-model="info.val49" label="水箱3容积："  label-width="80"  placeholder="请输入水箱3容积" clearable></van-field>
            <van-field v-model="info.val50" label="水箱3数量："  label-width="80"  placeholder="水箱3数量" clearable></van-field>
            <van-field name="radio" label="水箱3：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val51" direction="horizontal">
                        <van-radio name="独立" shape="square">独立</van-radio>
                        <van-radio name="内分割" shape="square">内分割</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field name="radio" label="水箱品牌：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val52" direction="horizontal">
                        <van-radio name="上海绿潮" shape="square">上海绿潮</van-radio>
                        <van-radio name="上海通华" shape="square">上海通华</van-radio>
                        <van-radio name="上虞百联" shape="square">上虞百联</van-radio>
                        <van-radio name="浙江科诚" shape="square">浙江科诚</van-radio>
                        <van-radio name="上虞富友" shape="square">上虞富友</van-radio>
                        <van-radio name="浙江杭特" shape="square">浙江杭特</van-radio>
                        <van-radio name="上海熊猫" shape="square">上海熊猫</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="水箱品牌结论：" label-width="120">
                <slot slot="input">
                    <van-radio-group v-model="info.val53" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                        <van-radio name="无入围品牌要求" shape="square">无入围品牌要求</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  2.水箱有标牌标志，其内容应有：产品名称及型号、商标、制造厂家及厂址、制造日期、生产批号、涉水产品许可证、执行标准号。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val54" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  3.水箱、内外人梯、支撑件、配件及其焊接材料应选用不低于06Cr19Ni10的不锈钢材料制作而成，不锈钢焊缝应进行酸洗钝化等抗氧化处理。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val55" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val56" label="侧壁1厚："  label-width="80"  placeholder="请输入侧壁1厚" clearable></van-field>
            <van-field v-model="info.val57" label="侧壁2厚："  label-width="80"  placeholder="请输入侧壁2厚" clearable></van-field>
            <van-field v-model="info.val58" label="侧壁3厚："  label-width="80"  placeholder="请输入侧壁3厚" clearable></van-field>
            <van-field v-model="info.val59" label="水箱顶厚："  label-width="80"  placeholder="请输入水箱顶厚" clearable></van-field>
            <van-field v-model="info.val60" label="底壁厚："  label-width="80"  placeholder="请输入底壁厚" clearable></van-field>
            <van-field v-model="info.val61" label="其他："  label-width="80"  placeholder="请输入其他" clearable></van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val62" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  5.水箱有人孔，大小符合要求，有带锁的食品级不锈钢密封盖，已上锁。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val63" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  6.水箱人孔上方无管道穿过，顶板面与建筑板底的净空不小于0.8m。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val64" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  7.内外人梯边框采用壁厚2mm、长*宽为30 mm*30 mm的06Cr19Ni10不锈钢方管，横向间距0.5m；梯步采用厚度2mm ，直径32mm的06Cr19Ni10不锈钢圆钢，纵向间距0.4m，人梯底部距离地面不应大于0.2m，安装高度应超过水箱高度0.4m，顶部采用环形圆钢制作并与水箱顶板紧密焊接。人梯安装应牢固可靠，应能承载100千克（含）以上负荷（2020年第一批开始执行）。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val65" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  8.溢流管、透气管应安装微孔过滤器，溢流管、泄水管不得与排水系统直接连接
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val66" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  9.泄水管必须设在水箱底部，直径宜不小于DN100。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val67" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  10.低位水箱进水管应安装具有机械和电气双重控制功能的电动蝶阀，由液位控制仪实现自动控制；泵房内只有1个水箱时，应安装两套水力控制浮球阀；有多个水箱并联时，每个水箱可安装一套水力控制浮球阀；且进水管标高应一致。电动蝶阀和水力控制浮球阀前应安装检修闸阀。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val68" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  11.低位水箱供水应实现：当水位达到低水位时应自动报警，达到超低水位时应自动停泵；达到高水位时应自动关闭浮球阀，达到超高水位时应自动关闭进水电动阀并报警。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val69" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  12.高位水箱应安装灵敏有效的液位控制仪，多个水箱供水时还应安装水力控制浮球阀，当采用浮球阀时不应少于两个，且进水管标高应一致
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val70" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  13.高位水箱供水应实现：当水位达到高水位时应自动停泵，达到超高水位时应自动报警；达到低水位时应自动启动水泵，达到超低水位时应自动报警。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val71" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  14.水箱顶部进水，底部出水，进水管与出水管应采取相对方向设置，设导流装置
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val72" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-cell>
                <span class="span">
                  15.水箱进水管与出水管安装阀门。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val73" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>



            <van-cell>
                <span class="span">
                  16.电动头品牌
                </span>
            </van-cell>
            <van-field name="radio" label="品牌：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val74" direction="horizontal">
                        <van-radio name="罗托克ROTORK(型号ROM2及以上)" shape="square">罗托克ROTORK(型号ROM2及以上)</van-radio>
                        <van-radio name="德国欧玛AUMA（型号SQ05.2及以上)" shape="square">德国欧玛AUMA（型号SQ05.2及以上)</van-radio>
                        <van-radio name="同档次及以上" shape="square">同档次及以上</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val75" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-cell>
                <span class="span">
                  17.与消防水箱分开。
                </span>
            </van-cell>
            <van-field name="radio" label="验收结论：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val76" direction="horizontal">
                        <van-radio name="合格" shape="square">合格</van-radio>
                        <van-radio name="不合格" shape="square">不合格</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>

            <van-field v-model="info.val77" label="其他补充："  label-width="80"  placeholder="请输入其他补充" clearable></van-field>


            <van-field name="radio" label="整改要求：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val78" direction="horizontal">
                        <van-radio name="无整改内容，验收通过" shape="square">无整改内容，验收通过</van-radio>
                        <van-radio name="需要整改，内容如下" shape="square">需要整改，内容如下</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field  v-model="info.val79"  rows="4"   autosize    label="整改要求：" type="textarea"  placeholder="请输入" label-width="80" ></van-field>
            <van-field name="radio" label="整改期限：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val80" direction="horizontal">
                        <van-radio name="2周内整改完毕" shape="square">2周内整改完毕</van-radio>
                        <van-radio name="1个月内整改完毕" shape="square">1个月内整改完毕</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>


            <van-field label="验收人员签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(1)"  width="100%" height="6rem" :src="info.val81"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val82"  label="验收日期："  placeholder="点击选择时间" @click="dateShow(1)" label-width="80"></van-field>


            <van-field name="radio" label="复检情况：" label-width="80">
                <slot slot="input">
                    <van-radio-group v-model="info.val83" direction="horizontal">
                        <van-radio name="已按要求整改，验收通过" shape="square">已按要求整改，验收通过</van-radio>
                    </van-radio-group>
                </slot>
            </van-field>
            <van-field label="复检人员签字：" readonly label-width="200"></van-field>
            <van-image  @click="signShow(2)"  width="100%" height="6rem" :src="info.val84"> </van-image>
            <van-field readonly clickable name="date"  :value="info.val85"  label="复检日期："  placeholder="点击选择时间" @click="dateShow(2)" label-width="80"></van-field>


<!--            <div style="height: 50px"></div>-->
<!--            <van-goods-action v-if="info.status !== '已提交'">-->
<!--                <van-goods-action-button color="#00CED1" text="保存" @click="keep"></van-goods-action-button>-->
<!--                <van-goods-action-button color="#008B8B" text="提交" @click="submit"></van-goods-action-button>-->
<!--            </van-goods-action>-->

            <van-row gutter="2"  v-if="info.status !== '已提交'">
                <van-col span="12">
                    <van-button type="primary" color="#00CED1" block @click="keep">保存</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" color="#008B8B" block @click="submit">提交</van-button>
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
            <van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm" @cancel="showPicker = false"></van-datetime-picker>
        </van-popup>
        <!--选择器-->
        <van-popup v-model="showPicker2" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm2"
                    @cancel="showPicker2 = false">
            </van-picker>
        </van-popup>


    </div>
</template>

<script>
    import sign from "../../../components/sign";
    import myHeader from "../../../components/myHeader/myHeader";
    import {Toast, Dialog} from 'vant';

    export default {
        name: "e12",
        components: {sign, myHeader},

        data() {
            return {
                timer: '',
                showPicker: false,
                showPicker2: false,
                showCalendar: false,
                currentDate: new Date(),
                showSign: false,
                signVal: '',
                info: {},
                columns: [],
                dateVal: '',
            };
        },
        mounted() {
            this.getInfo(this.id);
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
                    this.api.updE12(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('自动保存成功');
                        } else {
                            Toast.fail('保存失败');
                        }
                    })
                }
            },
            dateShow(val) {
                this.dateVal = val;
                this.showPicker = true
            },
            onConfirm2(item){
                this.info.equipmentNm = item;
                this.showPicker2 = false;

            },
            onConfirm(time) {
                if (this.dateVal === 1) {
                    this.info.val82 = this.until.dateFormatDay(time);
                }
                if (this.dateVal === 2) {
                    this.info.val85 = this.until.dateFormatDay(time);
                }
                this.showPicker = false;
            },
            canvasInit() {
                this.$refs.SignCanvas.canvasInit();
            },
            writeEnd() {
                if (this.signVal === 1) {
                    this.info.val81 = this.$refs.SignCanvas.saveAsImg();
                }
                if (this.signVal === 2) {
                    this.info.val84 = this.$refs.SignCanvas.saveAsImg();
                }

                this.showSign = false;
                this.$refs.SignCanvas.canvasInit();
            },
            signShow(val) {
                this.signVal = val;
                this.showSign = true;
            },
            getInfo(id) {
                let qry = this.query.new();
                this.query.toW(qry, 'earlyId', id, "EQ");
                this.api.getE12(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.info = res.data.list[0];


                    }
                })
            },
            back() {
                this.$emit('closeInfo')
            },
            //提交
            submit() {
                Dialog.confirm({
                    title: '注意',
                    message: '确定提交？'
                }).then(() => {
                    this.info.status = '已提交';
                    this.api.updE12(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('提交成功');
                            this.$emit('closeInfo')
                        } else {
                            Toast.fail('提交失败');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            //保存
            keep() {
                Dialog.confirm({
                    title: '注意',
                    message: '确定保存？'
                }).then(() => {
                    this.info.status = '保存';
                    this.api.updE12(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('保存成功');
                        } else {
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
    .span {
        color: #999999;
        font-size: 10px;
    }

    .van-cell {
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

