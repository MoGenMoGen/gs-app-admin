<template>
  <div id="container">
    <!--<van-sticky>-->
    <my-header title="水箱清洗" @back="back" :searchStatus="false"></my-header>
    <div class="searchBox">
      <div class="div-search">
        <input placeholder="搜索清洗单位" v-model="searchTxt1"/>
      </div>
      <div class="div-search">
        <input placeholder="搜索泵房编号" v-model="searchTxt2"/>
      </div>
      <div class="div-search">
        <input placeholder="搜索泵房名称" v-model="searchTxt3"/>
      </div>
    </div>


    <div class="tab">
      <ul>
        <li v-for="item in tabList" @click="toChoose(item)" :key="item.id">
          <p :class="{ active: tabId == item.id }">
            {{ item.name }}
          </p>
          <van-tag round type="danger">{{ item.total }}</van-tag>
        </li>
      </ul>
    </div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" style="margin-top: 10px"
              :immediate-check="immediate">
      <div v-for="(item, index) in dataList" :key="item.id" class="listItem">
        <div class="itemTop">
          <div> {{ item.pumpNo }}<span></span>{{ item.pumpNm }}<span></span>{{ item.waterArea }}
          </div>
          <img
              :src="arrowDownBlue"
              :class="{ showMore: item.showMore }"
              @click.stop="toShowMore(item, index)"
          />
        </div>
        <div style="margin-left: 10px; padding-bottom: 10px">
          <span style="font-size: 10px">计划时间: {{ item.startTm }}</span>
        </div>
        <div style="margin-left: 10px; padding-bottom: 10px" v-if="tabId != 0">
          <span style="font-size: 10px">实际时间: {{ item.realWashTm }}</span>
        </div>
        <div style="margin-left: 10px; padding-bottom: 10px" v-if="tabId != 0 && tabId != 1 && tabId != 2">
          <span style="font-size: 10px">完成时间: {{ item.completeTm }}</span>
        </div>
        <div style="margin-left: 10px; padding-bottom: 10px">
          <span style="font-size: 10px">清洗单位: {{ item.unitNm }}</span>
        </div>

        <div style="margin-left: 10px; padding-bottom: 10px" @click="getSpecInfo(item.id)" v-if="tabId != 0 && tabId != 1">

          <van-tag type="success" v-if="item.confinedStatus == '2'">受限空间审核通过</van-tag>
          <van-tag type="primary" v-if="item.confinedStatus == '1'">受限空间审核中</van-tag>
          <van-tag type="warning" v-if="item.confinedStatus == '0'">受限空间未提交</van-tag>
          <!--          <span style="font-size: 10px">清洗单位: {{ item.unitNm }}</span>-->
        </div>
        <div
            class="itemContent"
            @click="toDetail(item)"
            v-if="item.showMore == true"
        >
          <p><span>分层楼层：</span>{{ item.partitionFloor }}</p>
          <p><span>供水模式：</span>{{ item.arg2 }}</p>
          <p><span>清洗数量：</span>{{ item.boxNum }} 只</p>
          <p><span>清洗容积：</span>{{ item.washVolume }} 吨</p>
          <p><span>是否停水：</span>{{ item.cutOff }}</p>
          <p><span>停水备注：</span>{{ item.cutOffRemarks }}</p>
          <p><span>注意事项：</span>{{ item.washMainEvent }}</p>
          <p><span>事故记录：</span>{{ item.washEventRemarks }}</p>
          <p><span>备注：</span>{{ item.remarks }}</p>
        </div>
        <van-cell-group style="width: 95%; margin: 0 auto">
          <van-cell v-if="item.val8 !== 1 && item.status === '已清洗'">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <van-tag type="warning">待设施科考评</van-tag>
            </template>
          </van-cell>

          <van-row gutter="5" v-if="tabIndex === 1">
            <van-col span="12">
              <van-button
                  type="primary"
                  size="small"
                  block
                  @click.stop="audit(item, '已审批')"
              >同意
              </van-button
              >
            </van-col>
            <van-col span="12">
              <van-button
                  type="danger"
                  size="small"
                  block
                  @click.stop="audit(item, '未通过')"
              >撤回
              </van-button
              >
            </van-col>
          </van-row>
        </van-cell-group>
      </div>
    </van-list>

    <!--详情弹窗-->
    <van-popup v-model="show" position="right" :style="{ height: '100%', width: '100%' }">

      <van-sticky>
        <my-header
            title="详情"
            @back="show = false"
            :searchStatus="false"
        ></my-header>
      </van-sticky>

      <van-cell-group>
        <van-field
            label="清洗单位:"
            v-model="info.unitNm"
            readonly
            label-width="120"
        ></van-field>
        <van-field
            label="泵房编号:"
            v-model="info.pumpNo"
            readonly
            label-width="120"
        ></van-field>
        <van-field
            v-model="info.pumpNm"
            label="泵房名称："
            readonly
            label-width="120"
        ></van-field>
        <van-field
            v-model="info.volume"
            label="水箱容量（m³）:"
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.disinfectTm"
            label="清洗消毒日期："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.washUser"
            label="清洗消毒人员："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.drainageTm"
            label="放水时间："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.washTm"
            label="清洗消毒时间："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.soup"
            label="使用药液名称："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.concentration"
            label="配制浓度："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.makeUser"
            label="配制人员："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.proctor"
            label="监督人："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.inletTm"
            label="注水时间："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.completeTm"
            label="完成时间："
            label-width="120"
            readonly
        ></van-field>
        <van-button block style="height: 10px" color="#F3F3F3"></van-button>
        <van-field
            v-model="info.cleanRecord"
            label="清洗消毒有关记录："
            type="textarea"
            label-width="130"
            rows="4"
            readonly
        ></van-field>

        <van-field
            v-model="info.recorder"
            label="记录人："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.leader"
            label="负责人："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.val1"
            label="浮球阀维护："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.chlorine"
            label="余氯："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.turbidity"
            label="浊度："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.val2"
            label="水质快检结论："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="val3"
            label="其他说明事项："
            label-width="120"
            readonly
        ></van-field>
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div>
              <span>清洗前照片:</span>
              <van-image
                  v-if="info.img1"
                  width="80"
                  height="80"
                  :src="info.img1"
                  @click="lookImg(info.img1)"
              />
            </div>
            <div>
              <span>清洗后照片:</span>
              <van-image
                  v-if="info.img2"
                  width="80"
                  height="80"
                  :src="info.img2"
                  @click="lookImg(info.img2)"
              />
            </div>
          </template>
        </van-cell>
        <van-field
            v-if="info.cleanRecord !== null"
            v-model="info.cleanRecord"
            label="清洗消毒记录："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.recorder"
            label="记录人："
            label-width="120"
            readonly
        ></van-field>
        <van-field
            v-model="info.leader"
            label="负责人："
            label-width="120"
            readonly
        ></van-field>
        <van-button block style="height: 10px" color="#F3F3F3"></van-button>

        <div v-if="info.status === '已清洗'">
          <van-divider>设施科考评</van-divider>
          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span>清洗存在问题</span>
              {{ info.val8 }}
              <van-checkbox-group
                  v-model="val4"
                  direction="horizontal"
                  :disabled="info.val8 === 1"
              >
                <van-checkbox
                    name="停水告知通知有误"
                    shape="square"
                    style="margin-top: 5px"
                >停水告知通知有误
                </van-checkbox>
                <van-checkbox
                    name="防护用品穿戴不规范"
                    shape="square"
                    style="margin-top: 5px"
                >防护用品穿戴不规范
                </van-checkbox>
                <van-checkbox
                    name="未按计划停水"
                    shape="square"
                    style="margin-top: 5px"
                >未按计划停水
                </van-checkbox
                >
                <van-checkbox
                    name="违规操作或安全事故"
                    shape="square"
                    style="margin-top: 5px"
                >违规操作或安全事故
                </van-checkbox>
                <van-checkbox
                    name="清洗完毕未通知物业"
                    shape="square"
                    style="margin-top: 5px"
                >清洗完毕未通知物业
                </van-checkbox>
                <van-checkbox
                    name="用户投诉"
                    shape="square"
                    style="margin-top: 5px"
                >用户投诉
                </van-checkbox
                >
                <van-checkbox name="其他" shape="square" style="margin-top: 5px"
                >其他
                </van-checkbox
                >
                <van-checkbox name="无" shape="square" style="margin-top: 5px"
                >无
                </van-checkbox
                >
              </van-checkbox-group>
            </template>
          </van-cell>

          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span>总体考评:</span>
              <van-rate
                  style="margin-left: 20px"
                  v-model="from.val5"
                  :size="25"
                  color="#ffd21e"
                  void-icon="star"
                  :disabled="info.val8 === 1"
                  void-color="#eee"
              />
            </template>
          </van-cell>
          <van-field
              v-model="from.val6"
              label="其他说明事项"
              rows="3"
              type="textarea"
              :disabled="info.val8 === 1"
              placeholder="请输入其他说明事项"
          />
          <van-field
              v-model="from.val7"
              label="项目负责人"
              placeholder="请输入项目负责人"
              :disabled="info.val8 === 1"
          />
          <div style="height: 30px"></div>
          <van-button
              type="primary"
              @click="addEvaluation"
              block
              v-if="info.val8 !== 1"
          >提交考评
          </van-button
          >
        </div>
      </van-cell-group>
    </van-popup>

    <!--受限详情-->
    <van-popup v-model="show2" position="right" :style="{ height: '100%', width: '100%' }">
      <van-sticky>
        <my-header title="详情" @back="show2 = false" :searchStatus="false"></my-header>
      </van-sticky>
      <van-cell-group>
        <van-form>
          <van-field
              v-model="infoSpace.pumpNm"
              label="泵房名称："
              readonly
              label-width="100"
          ></van-field>
          <van-field
              v-model="infoSpace.unitNm"
              label="施工单位:"
              readonly
              label-width="100"
          ></van-field>
          <van-field
              v-model="infoSpace.unit"
              label="单位:"
              readonly
              label-width="100"
          ></van-field>
          <van-field
              v-model="infoSpace.facilityName"
              label="设施名称:"
              readonly
              label-width="100"
          ></van-field>
          <van-field
              v-model="infoSpace.jobContent"
              label="作业内容:"
              readonly
              label-width="100"
          ></van-field>
          <van-field
              v-model="infoSpace.riskFactor"
              label="主要危险因素:"
              readonly
              label-width="100"
          ></van-field>
          <van-field
              v-model="infoSpace.guardian"
              label="监护人:"
              placeholder="请选择监护人"
              label-width="100"
              readonly
          ></van-field>
          <van-field
              v-model="infoSpace.fillPerson"
              label="填写人:"
              placeholder="请选择填写人"
              label-width="100"
              readonly
          ></van-field>
          <van-cell title="作业人:">
            <template slot="label">
              <van-tag
                  type="primary"
                  v-for="item in jobPerson"
                  :key="item"
                  size="medium"
                  style="margin-right: 10px; margin-top: 5px"
              >{{ item }}
              </van-tag>
            </template>
          </van-cell>

          <van-field
              v-model="infoSpace.startTm"
              label="开工时间:"
              placeholder="请选择开工时间"
              label-width="100"
              readonly
          ></van-field>

          <van-field label="主要安全措施" readonly></van-field>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety1"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                1.作业前对进入有限空间危险性进行分析，并进行操作前安全交底及培训，确认作业人员的身体状况，有无感冒、
                发烧、咳嗽、拉肚子等症状，发现有碍饮水卫生病症的
                应立即脱离工作岗位。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety2"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                2.清洗人员确认有限空间内存在的其他危险因素，如内部
                附件、龙骨等。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety3"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                3.打开水箱人孔口，用手提鼓风机进行强制通风或佩戴空
                气呼吸器，吹风2小时以上，使有限空间内部空气流通。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety4"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                4.检查有限空间内部是否具备作业条件:检测有限空间内空
                气质量，未经检测或检测不格，任何人员严禁入内。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety5"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                5.检查高压水枪电源线，保证性能良好，线路无破损、无 漏点。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety6"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                6.检查水箱进水阀是否在关闭，并挂“禁止开启”标志牌。
              </van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety7"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                7.负责清洗的班组至少3人以上，水箱内必须2人以上一起 作业。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety8"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                8.清洗人员必须穿戴防护作用的口罩、眼镜、安全帽、防
                割手套、穿长袖长裤工作服、防滑雨靴、戴头灯，无关
                物品不得带入有限空间内部。
              </van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety9"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                9.检查有限空间进出口，水箱人孔处须有1人监管，并与
                有限空间内人员保持通话。
              </van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety10"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square">
                10.清洗结束后，开启水箱进水阀之前须检查水箱内人员是
                否全部撤离，核对并清点工具，是否有遗漏物品。
              </van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety11"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square"> 11.消防器材</van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety12"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square"> 12.救生绳</van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.safety13"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square"> 13.急救箱</van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group
                v-model="infoSpace.hazard"
                direction="horizontal"
                disabled
            >
              <van-radio name="1" shape="square"> 无危害</van-radio>
            </van-radio-group>
          </van-cell>

          <van-field
              label="施工作业负责人签字"
              readonly
              label-width="130"
          ></van-field>
          <van-image width="100%" height="10rem" :src="infoSpace.jobSign">
            <template v-slot:loading>施工作业负责人签字</template>
          </van-image>
          <van-field
              v-model="infoSpace.jobSignTm"
              label="签字时间:"
              label-width="100"
              readonly
          ></van-field>

          <van-field label="确认人签字" readonly label-width="130"></van-field>
          <van-image
              @click="show3 = true"
              width="100%"
              height="8rem"
              :src="infoSpace.confirmSign"
          >
            <template v-slot:loading>确认人签字</template>
          </van-image>
          <van-field
              v-model="infoSpace.safety16"
              right-icon="notes-o"
              label="签字时间："
              placeholder="点击选择时间"
              label-width="120"
              readonly
              @click="showTime = true"
              clickable
          ></van-field>

          <!-- 签字弹窗-->

          <van-button
              v-if="infoSpace.status == 1"
              block
              type="info"
              @click="submit"
          >
            审核通过
          </van-button>
        </van-form>
      </van-cell-group>
    </van-popup>
    <!--搜索弹窗-->
    <van-popup
        v-model="searchShow"
        position="bottom"
        :style="{ height: '80%' }"
        closeable
        round
        close-icon="close"
    >
      <van-form @submit="search" style="margin-top: 50px">
        <van-field
            label="清洗单位:"
            v-model="searchData.unitNm"
            clearable
        ></van-field>
        <van-field
            label="泵房编号:"
            v-model="searchData.pumpNo"
            clearable
        ></van-field>
        <van-field
            label="泵房名称:"
            v-model="searchData.pumpNm"
            clearable
        ></van-field>
        <div style="margin: 16px">
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
import {Dialog, Toast, ImagePreview} from "vant";
import arrowDownBlue from "./img/向下.png";

export default {
  components: {myHeader},
  name: "boxWash",
  data() {
    return {
      arrowDownBlue,
      tabId: 0,
      searchTxt1: "",
      searchTxt2: "",
      searchTxt3: "",
      info: {},
      infoSpace: {},
      val4: [],
      val3: [],
      // val5:'',
      from: {
        id: "",
        val4: "",
        val5: 0,
        val6: "",
        val7: "",
        val8: "",
      },
      show: false,
      searchShow: false,
      searchData: {
        unitNm: "",
        pumpNo: "",
        pumpNm: "",
      },
      tabList: [
        {
          id: 0,
          name: "清洗计划",
          total: 0,
        },
        {
          id: 1,
          name: "清洗审核",
          total: 0,
        },
        {
          id: 2,
          name: "清洗任务",
          total: 0,
        },
        {
          id: 3,
          name: "清洗报表",
          total: 0,
        }
      ],
      tabIndex: 0,
      active: "",
      loading: false,
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      immediate: false, //初始化不加载必须用变量
      finished: false,
      show2: false,
      timer: null,
    };
  },
  watch: {
    searchTxt1(newVal, oldVal) {
      this.debounce(this.search, 1000)();
    },
    searchTxt2(newVal, oldVal) {
      this.debounce(this.search, 1000)();
    },
    searchTxt3(newVal, oldVal) {
      this.debounce(this.search, 1000)();
    },
  },
  mounted() {
    this.getList();
    this.getTotal()
  },

  methods: {
    toChoose(item) {
      if (this.tabId != item.id) {
        this.tabId = item.id;
        this.tabIndex = item.id;
        this.finished = false;
        this.pageNo = 1;
        this.dataList = [];
        setTimeout(() => {
          this.getList();
        }, 2000);
      }
    },
    debounce(fn, wait) {
      return () => {
        if (this.timer) {
          clearTimeout(this.timer); //清除这个定时器
        }
        this.timer = setTimeout(fn, wait);
      };
    },
    search() {
      //     this.searchShow = false;
      this.pageNo = 1;
      this.pageSize = 10;
      this.dataList = [];
      this.getList();
    },
    toShowMore(item, index) {
      item.showMore = !item.showMore;
    },
    //审核通过与否
    audit(item, status) {
      Dialog.confirm({
        title: "提交审核",
        message: "确认提交审核？",
      })
          .then(() => {
            // on confirm
            this.api.auditBoxWash(item.id, status).then((res) => {
              console.log(res);
              if (res.code === 200) {
                Toast.success("操作成功");
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
                this.show = false;
              }
            });
          })
          .catch(() => {
            // on cancel
          });
    },

    lookImg(val) {
      ImagePreview([val]);
    },
    //提交考评
    addEvaluation() {
      this.from.id = this.info.id;
      this.from.val4 = this.val4.toString();
      this.from.val8 = 1;
      Dialog.confirm({
        title: "提交考评",
        message: "一旦提交将无法修改，确认提交？",
      })
          .then(() => {
            // on confirm
            this.api.updWash(JSON.stringify(this.from)).then((res) => {
              console.log(res);
              if (res.code === 200) {
                Toast.success("操作成功");
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
                this.show = false;
              }
            });
          })
          .catch(() => {
            // on cancel
          });
    },

    // search() {
    //   this.searchShow = false;
    //   this.pageNo = 1;
    //   this.dataList = [];
    //   this.getList();
    // },
    toDetail(item) {
      if (this.tabId != 0){
        this.api.getBoxWashDtl(item.id).then((res) => {
          this.info = res.data;
          this.show = true;
        });
      }


    },
    //0待保养 1已保养 2逾期
    tabChange(val) {
      this.dataList = [];
      this.pageNo = 1;
      this.tabIndex = val;
      this.getList();
    },
    onLoad() {
      this.getList();
    },
    getSpecInfo(id) {
      this.api.confinedSpaceInfo(id).then((res) => {
        if (res.code === 200) {
          console.log(res.data)
          this.infoSpace = res.data
          this.show2 = true
        }
      });

    },
    getTotal() {
      for (let i = 0; i < this.tabList.length; i++) {
        let qry = this.query.new();
        let tab = this.tabList[i];
        if (tab.id == 0) {
          this.query.toW(qry, "status", "待清洗", "EQ");
          this.query.toWNull(qry, "auditStatus");
        }
        if (tab.id == 1) {
          this.query.toW(qry, "status", "待清洗", "EQ");
          this.query.toW(qry, "auditStatus", "未审批", "EQ");
        }
        if (tab.id == 2) {
          this.query.toW(qry, "status", "待清洗", "EQ");
          this.query.toW(qry, "auditStatus", "已审批", "EQ");
        }
        if (tab.id == 3) {
          this.query.toW(qry, "status", "已清洗", "LK");
        }
        this.query.toP(qry, 1, 1);
        this.api.getBoxWashList2(encodeURIComponent(this.query.toJsonStr(qry)))
            .then((res) => {
              if (res.code === 200) {
                this.tabList[i].total = res.page.total
              }
            });
      }


    },

    getList() {
      let qry = this.query.new();
      if (this.searchTxt3) {
        this.query.toW(qry, "pumpNm", this.searchTxt3, "LK");
      }
      if (this.searchTxt2) {
        this.query.toW(qry, "pumpNo", this.searchTxt2, "LK");
      }
      if (this.searchTxt1) {
        this.query.toW(qry, "unitNm", this.searchTxt1, "LK");
      }
      if (this.tabIndex === 0) {
        this.query.toW(qry, "status", "待清洗", "EQ");
        this.query.toWNull(qry, "auditStatus");
        this.query.toO(qry, "boxNum", "desc");
      }
      if (this.tabIndex === 1) {
        this.query.toW(qry, "status", "待清洗", "EQ");
        this.query.toW(qry, "auditStatus", "未审批", "EQ");
        // this.query.toW(qry, 'val8', 0, "EQ");
      }
      if (this.tabIndex === 2) {
        // this.query.toW(qry, 'val8', 1, "EQ");
        this.query.toW(qry, "status", "待清洗", "EQ");
        this.query.toW(qry, "auditStatus", "已审批", "EQ");
      }
      if (this.tabIndex === 3) {
        // this.query.toW(qry, 'status', '逾期', "EQ");
        this.query.toW(qry, "status", "已清洗", "LK");
        this.query.toO(qry, "startTm", "desc");
        this.query.toO(qry, "completeTm", "desc");
      }
      this.query.toP(qry, this.pageNo, this.pageSize);
      // this.query.toO(qry, "crtTm", "desc");
      this.api
          .getBoxWashList2(encodeURIComponent(this.query.toJsonStr(qry)))
          .then((res) => {
            if (res.code === 200) {
              this.dataList.push(...res.data.list);
              this.dataList.forEach((item) => {
                this.$set(item, "showMore", false);
              });
              // 加载状态结束
              this.finished = this.dataList.length >= res.page.total;
              this.loading = false;
              this.pageNo++;
            }
          });
    },
    back() {
      this.until.back();
    },
  },
};
</script>


<style lang="less" scoped>
.van-cell {
  line-height: normal;
}

.van-nav-bar {
  z-index: 999;
  background-color: #1177b9;
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

<style lang="less">
#container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .tab {
    height: 0.7rem;
    background: white;
    // position: fixed;
    width: 100vw;
    // top: 0.9rem;
    border-bottom: 1 rpx solid #f4f6f8;
    display: flex;
    z-index: 10;
    box-sizing: border-box;

    ul {
      width: auto;
      overflow-x: auto;
      white-space: nowrap;
      display: flex;
    }

    li {
      //   flex: 1;
      //display: flex;
      width: 4rem;
      align-items: center;
      justify-content: center;

      display: flex;
      align-items: center;

      p {
        width: fit-content;
        height: 0.69rem;
        padding: 0 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.28rem;
        color: #808080;
      }
    }
  }

  .active {
    color: #1177b9 !important;
    border-bottom: 1 rpx solid #1177b9;
  }

  .van-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    .van-tabs__content {
      margin-top: 10px;
      flex: 1;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .van-tab__text--ellipsis {
      display: flex !important;
      overflow: visible !important;
      font-size: 10px;
    }
  }
}

#container {
  min-height: 100vh;
  background: #f5f2f5;
}

.searchBox {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0.2rem 0.2rem;
  width: 100%;

  .div-search {
    width: 30%;
    background-color: #f4f6f8;
    text-align: center;

    input {
      width: 80%;
      height: 0.54rem;
      border: 0.02rem solid #e5e5e5;
      border-radius: 0.3rem;
      padding: 0rem 0.2rem;
      font-size: 0.22rem;
    }
  }
}

.listItem {
  background: #ffffff;
  border-radius: 0.1rem;
  margin: 0 auto 0.15rem;
  width: 96%;

  .itemTop {
    position: relative;
    display: flex;
    align-items: center;
    height: 1rem;
    width: 95%;
    margin: 0 auto;

    div:first-of-type {
      flex: 1;
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        width: 1px;
        height: 0.1rem;
        background: #000000;
        opacity: 0.2;
        margin: 0 0.2rem;
      }

      p {
        height: 0.45rem;
        line-height: 0.45rem;
        padding: 0 0.1rem;
        border-radius: 3px;
        color: #ffffff;
        margin-left: 0.2rem;
      }

      .red {
        background: red;
      }

      .green {
        background: green;
      }
    }

    img {
      width: 0.35rem;
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
    }

    .showMore {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* IE 9 */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg); /* Opera */
    }
  }

  .itemMore {
  }

  .itemContent {
    width: 95%;
    margin: 0 auto;
    border-top: 1px solid #e9e9e9;
    display: flex;
    flex-wrap: wrap;
    padding: 0.2rem 0;

    p {
      width: 100%;
      display: flex;
      align-items: center;
      height: 0.5rem;

      span {
        color: #909090;
        width: 1.6rem;
        display: inline-block;
        flex-shrink: 0;
      }

      img {
        width: 0.45rem;
      }
    }
  }
}
</style>
