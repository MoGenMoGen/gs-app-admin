<template>
    <div id="container">

        <van-sticky>
            <my-header title="有限空间审批" @back="back" @search="searchShow = true"> </my-header>
        </van-sticky>

        <van-tabs v-model="active" color="#1177B9" @change="tabChange"  >
            <van-tab v-for="item in tabList" :title='item' :key="item">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
                    <div v-for="item in dataList" :key="item.id" @click="toDetail(item)">
                        <van-cell-group>
                            <van-field label="清洗单位:" v-model="item.unitNm" readonly :border="false" label-width="120"></van-field>
                            <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false" label-width="120"></van-field>
                            <van-field label="单位:" v-model="item.unit" readonly :border="false" label-width="120" right-icon="arrow"></van-field>
                            <van-field label="开工时间:" v-model="item.startTm" readonly :border="false" label-width="120"></van-field>
                            <van-field label="填写人:" v-model="item.fillPerson" readonly :border="false" label-width="120"></van-field>
                        </van-cell-group>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>

        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '95%' }" closeable  close-icon="close" round>
            <van-cell-group style="margin-top: 50px">
                <van-form>
                    <van-field v-model="infoSpace.pumpNm" label="泵房名称：" readonly label-width="100"></van-field>
                    <van-field v-model="infoSpace.unitNm" label="施工单位:" readonly label-width="100"></van-field>
                    <van-field v-model="infoSpace.unit" label="单位:" readonly label-width="100"></van-field>
                    <van-field v-model="infoSpace.facilityName" label="设施名称:" readonly label-width="100"></van-field>
                    <van-field v-model="infoSpace.jobContent" label="作业内容:" readonly label-width="100"></van-field>
                    <van-field v-model="infoSpace.riskFactor" label="主要危险因素:" readonly label-width="100"></van-field>
                    <van-field v-model="infoSpace.guardian" label="监护人:" placeholder="请选择监护人" label-width="100" readonly ></van-field>
                    <van-field v-model="infoSpace.fillPerson" label="填写人:" placeholder="请选择填写人" label-width="100"  readonly ></van-field>
                    <van-cell title="作业人:">
                        <template slot="label">
                            <van-tag type="primary" v-for="item in jobPerson" :key="item" size="medium"  style="margin-right: 10px;margin-top: 5px">{{item}}</van-tag>
                        </template>
                    </van-cell>

                    <van-field v-model="infoSpace.startTm" label="开工时间:" placeholder="请选择开工时间" label-width="100"  readonly></van-field>

                    <van-field label="主要安全措施" readonly></van-field>


                    <van-cell >
                        <van-radio-group v-model="infoSpace.safety1" direction="horizontal" disabled>
                            <van-radio name="1" shape="square">
                                1.作业前对进入有限空间危险性进行分析，并进行操作前安全交底及培训，确认作业人员的身体状况，有无感冒、 发烧、咳嗽、拉肚子等症状，发现有碍饮水卫生病症的 应立即脱离工作岗位。
                            </van-radio>
                        </van-radio-group>
                    </van-cell>

                    <van-cell >
                         <van-radio-group v-model="infoSpace.safety2" direction="horizontal" disabled>
                             <van-radio name="1" shape="square">
                                 2.清洗人员确认有限空间内存在的其他危险因素，如内部
                                 附件、龙骨等。
                             </van-radio>
                         </van-radio-group>
                    </van-cell>

                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety3" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    3.打开水箱人孔口，用手提鼓风机进行强制通风或佩戴空
                                    气呼吸器，吹风2小时以上，使有限空间内部空气流通。
                                </van-radio>
                            </van-radio-group>
                    </van-cell>

                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety4" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    4.检查有限空间内部是否具备作业条件:检测有限空间内空
                                    气质量，未经检测或检测不格，任何人员严禁入内。
                                </van-radio>
                            </van-radio-group>
                    </van-cell>

                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety5" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    5.检查高压水枪电源线，保证性能良好，线路无破损、无
                                    漏点。
                                </van-radio>
                            </van-radio-group>
                    </van-cell>

                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety6" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    6.检查水箱进水阀是否在关闭，并挂“禁止开启”标志牌。
                                </van-radio>
                            </van-radio-group>

                    </van-cell>
                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety7" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    7.负责清洗的班组至少3人以上，水箱内必须2人以上一起
                                    作业。
                                </van-radio>
                            </van-radio-group>
                    </van-cell>

                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety8" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    8.清洗人员必须穿戴防护作用的口罩、眼镜、安全帽、防
                                    割手套、穿长袖长裤工作服、防滑雨靴、戴头灯，无关
                                    物品不得带入有限空间内部。
                                </van-radio>
                            </van-radio-group>

                    </van-cell>
                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety9" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    9.检查有限空间进出口，水箱人孔处须有1人监管，并与
                                    有限空间内人员保持通话。
                                </van-radio>
                            </van-radio-group>
                    </van-cell>
                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety10" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    10.清洗结束后，开启水箱进水阀之前须检查水箱内人员是
                                    否全部撤离，核对并清点工具，是否有遗漏物品。
                                </van-radio>
                            </van-radio-group>
                    </van-cell>
                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety11" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    11.消防器材
                                </van-radio>
                            </van-radio-group>
                    </van-cell>
                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety12" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    12.救生绳
                                </van-radio>
                            </van-radio-group>
                    </van-cell>

                    <van-cell >
                            <van-radio-group v-model="infoSpace.safety13" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    13.急救箱
                                </van-radio>
                            </van-radio-group>
                    </van-cell>

                    <van-cell >
                            <van-radio-group v-model="infoSpace.hazard" direction="horizontal" disabled>
                                <van-radio name="1" shape="square">
                                    无危害
                                </van-radio>
                            </van-radio-group>
                    </van-cell>

                    <van-field label="施工作业负责人签字" readonly label-width="130"></van-field>
                    <van-image  width="100%" height="10rem" :src="infoSpace.jobSign">
                        <template v-slot:loading>施工作业负责人签字</template>
                    </van-image>
                    <van-field v-model="infoSpace.jobSignTm" label="签字时间:"  label-width="100" readonly></van-field>

                    <van-field label="确认人签字" readonly label-width="130"></van-field>
                    <van-image  @click="show3 = true"  width="100%" height="8rem" :src="infoSpace.confirmSign">
                        <template v-slot:loading>确认人签字</template>
                    </van-image>
                    <van-field v-model="infoSpace.safety16" right-icon="notes-o" label="签字时间：" placeholder="点击选择时间" label-width="120" readonly @click="showTime = true"
                               clickable></van-field>

                    <!-- 签字弹窗-->
                    <van-popup v-model="show3" position="top" :style="{ height: '100%' }">
                        <van-nav-bar fixed title="签字" @click-left="show3 = false" left-arrow> </van-nav-bar>
                        <sign v-if="show3" ref="SignCanvas"></sign>
                        <van-goods-action style="margin-bottom: 50px">
                            <van-goods-action-button color="#be99ff" text="重写" @click="canvasInit"></van-goods-action-button>
                            <van-goods-action-button color="#7232dd" text="确定" @click="writeEnd"></van-goods-action-button>
                        </van-goods-action>
                    </van-popup>

                    <van-button  v-if="infoSpace.status == 1" block type="info" @click="submit">
                        审核通过
                    </van-button>


                </van-form>
            </van-cell-group>
        </van-popup>




        <!--时间弹窗-->
        <van-popup v-model="showTime" position="bottom">
            <van-datetime-picker  v-model="currentDate"  type="datetime" @confirm="confirmDate" @cancel="showTime = false" ></van-datetime-picker>
        </van-popup>




        <!--搜索弹窗-->
        <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
            <van-form  style="margin-top: 50px">
                <van-field label="清洗单位:" v-model="searchData.unitNm" clearable></van-field>
                <van-field label="泵房名称:" v-model="searchData.pumpNm" clearable></van-field>
                <div style="margin: 16px;">
                    <van-button round block type="info"  @click="search">
                        提 交
                    </van-button>
                </div>
            </van-form>
        </van-popup>


    </div>
</template>

<script>
    import {Dialog, Toast} from 'vant';
    import sign from "./sign";
    import myHeader from "../../../components/myHeader/myHeader";
    export default {
        name: "boxSpace",
        components: {sign,myHeader},
        data() {
            return {
                show3: false,
                showTime: false,
                jobPerson:[],
                infoSpace: {},
                show: false,
                searchShow: false,
                searchData: {
                    unitNm: '',
                    pumpNm: ''
                },
                tabList: ['待审批', '已审批'],
                tabIndex: 0,
                active: '',
                currentDate: new Date(),
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
            confirmDate(val){
                this.infoSpace.safety16 =  this.until.dateFormat(val);
                this.showTime = false;
            },

            //审核通过
            submit(){

                Dialog.confirm({
                    title: '提示',
                    message: '确定审核通过？'
                }).then(() => {
                    this.infoSpace.status = 2;
                    this.api.updConfinedSpace(JSON.stringify(this.infoSpace)).then(res => {
                        if (res.code === 200) {
                            Toast.success('提交成功');
                            this.show = false;
                            this.pageNo = 1;
                            this.dataList = [];
                            this.getList();

                        }
                    })

                }).catch(() => {

                });
            },

            canvasInit() {
                this.$refs.SignCanvas.canvasInit();
            },
            writeEnd() {
                this.infoSpace.confirmSign = this.$refs.SignCanvas.saveAsImg();
                this.show3 = false;
            },
            search() {
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            toDetail(item) {
                this.show = true;
                this.infoSpace = item;
                this.jobPerson = item.jobPerson.split(',');

                console.log(item)

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
                if (this.searchData.unitNm) {
                    this.query.toW(qry, "unitNm", this.searchData.unitNm, "LK");
                }
                if (this.tabIndex === 0) {
                    this.query.toW(qry, 'status', 1, "EQ");
                }
                if (this.tabIndex === 1) {
                    this.query.toW(qry, 'status', 2, "EQ");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.query.toO(qry, "startTm", "desc");
                this.api.getBoxSpaceList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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
</style>

