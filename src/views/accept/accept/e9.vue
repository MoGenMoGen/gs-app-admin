<template>
  <div id="container">
    <van-sticky>
      <my-header title="泵房验收总表" @back="back" :search-status="false"></my-header>
    </van-sticky>
    <van-form>
      <van-field v-model="info.no" label="泵房编号：" label-width="80" readonly></van-field>
      <van-field v-model="info.nm" label="泵房名称：" label-width="80" readonly></van-field>
      <van-field v-model="info.region" label="行政区域：" label-width="80" readonly></van-field>
      <van-field v-model="info.waterArea" label="供水区域：" label-width="80" readonly></van-field>
      <van-field v-model="info.pumpNature" label="泵房性质：" label-width="80" readonly></van-field>
      <van-field v-model="info.recordNm" label="备案名：" label-width="80" readonly></van-field>
      <van-field v-model="info.community" label="所属社区：" label-width="80" placeholder="请输入所属社区" clearable></van-field>
      <van-field v-model="info.communityPhone" label="社区电话：" label-width="80" placeholder="请输入社区电话"
                 clearable></van-field>
      <van-field v-model="info.propertyPhone" label="物业电话：" label-width="80" placeholder="请输入物业电话"
                 clearable></van-field>
      <van-field name="stepper" label="小区栋数">
        <slot slot="input">
          <van-stepper v-model="info.estateNum"></van-stepper>
        </slot>
      </van-field>
      <van-field name="stepper" label="小区户数">
        <slot slot="input">
          <van-stepper v-model="info.houseNum"></van-stepper>
        </slot>
      </van-field>

      <van-field name="radio" label="生消分开：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.sxsffk" direction="horizontal">
            <van-radio name="分开" shape="square">分开</van-radio>
            <van-radio name="不分开" shape="square">不分开</van-radio>
            <van-button type="primary" size="mini" @click="info.sxsffk = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field v-model="info.pumpLocation" label="泵房位置：" rows="2" type="textarea" label-width="80"
                 placeholder="请输入泵房位置" clearable></van-field>
      <van-field v-model="info.lng" label="经度：" label-width="80" placeholder="请输入经度" clearable>
        <slot slot="button">
          <van-button size="small" type="primary" @click="getGps">获取当前定位</van-button>
        </slot>
      </van-field>
      <van-field v-model="info.lat" label="纬度：" label-width="80" placeholder="请输入纬度" clearable></van-field>
      <van-field readonly clickable :value="info.equipmentNm" label="设备供应商:" placeholder="点击选择设备供应商"
                 @click="showPicker2 = true"></van-field>
      <van-field v-model="info.equipmentPhone" label="联系人及电话：" label-width="100" placeholder="请输入联系人及电话"
                 clearable></van-field>
      <van-field readonly clickable name="date" :value="info.transferTm" label="移交时间：" placeholder="点击选择时间"
                 @click="dateShow(1)" label-width="100" right-icon="calender-o"></van-field>
      <van-field readonly clickable name="date" :value="info.warrantyTm" label="质保时间：" placeholder="点击选择时间"
                 @click="dateShow(2)" label-width="100" right-icon="calender-o"></van-field>
      <van-field name="switch" label="无负压" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.wfy" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="无负压个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.wfyNum" min="0"></van-stepper>
        </slot>
      </van-field>
      <van-field name="switch" label="箱式" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.xs" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="箱式个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.xsNum" min="0"></van-stepper>
        </slot>
      </van-field>
      <van-field name="switch" label="水箱加变频" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.sxbp" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="水箱加变频个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.sxbpNum" min="0"></van-stepper>
        </slot>
      </van-field>

      <van-field name="switch" label="工频" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.gp" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>




      <van-field name="stepper" label="共频个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.gpNum" min="0"></van-stepper>
        </slot>
      </van-field>

      <van-field name="switch" label="一体化" label-width="120">
        <slot slot="input">
          <van-switch v-model="info.yth" size="20" :active-value="1" :inactive-value="0" active-color="#07c160"
                      inactive-color="#ee0a24"></van-switch>
        </slot>
      </van-field>
      <van-field name="stepper" label="一体化个数" label-width="120">
        <slot slot="input">
          <van-stepper v-model="info.ythNum" min="0"></van-stepper>
        </slot>
      </van-field>


      <van-field v-model="info.sx" label="水箱容积：" label-width="80" placeholder="请输入水箱容积" clearable></van-field>
      <van-field name="stepper" label="水箱个数：" label-width="80">
        <slot slot="input">
          <van-stepper v-model="info.sxNum"></van-stepper>
        </slot>
      </van-field>

      <van-field v-model="info.volume" label="总容积：" label-width="80" placeholder="请输入总容积" clearable></van-field>
      <van-field v-model="info.partitionFloor" label="分区楼层：" label-width="80" placeholder="请输入分区楼层"
                 clearable></van-field>

      <van-field name="checkboxGroup" label="分区情况：" label-width="60">
        <slot slot="input">
          <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
            <van-checkbox name="低区" shape="square">低区</van-checkbox>
            <van-checkbox name="中区" shape="square">中区</van-checkbox>
            <van-checkbox name="高区" shape="square">高区</van-checkbox>
            <van-checkbox name="超高区" shape="square">超高区</van-checkbox>
          </van-checkbox-group>
        </slot>
      </van-field>


      <van-field label="水泵品牌：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.waterBrand" direction="horizontal">
            <van-radio name="格兰富" shape="square">格兰富</van-radio>
            <van-radio name="荏原" shape="square">荏原</van-radio>
            <van-radio name="滨特尔" shape="square">滨特尔</van-radio>
            <van-button type="primary" size="mini" @click="info.waterBrand = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-field v-model="info.val1" label="低区水泵型号：" label-width="100" placeholder="请输入低区水泵型号" clearable></van-field>
      <van-field v-model="info.val2" label="低区水泵功率：" label-width="100" placeholder="请输入低区水泵功率" clearable></van-field>
      <van-field v-model="info.val3" label="低区水泵流量：" label-width="100" placeholder="请输入低区水泵流量" clearable></van-field>
      <van-field v-model="info.val4" label="低区水泵扬程：" label-width="100" placeholder="请输入低区水泵扬程" clearable></van-field>
      <van-field v-model="info.val5" label="低区水泵数量：" label-width="100" placeholder="请输入低区水泵数量" clearable></van-field>
      <van-field v-model="info.val36" label="低区设定压力：" label-width="100" placeholder="请输入低区设定压力" clearable></van-field>

      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-field v-model="info.val6" label="中区水泵型号：" label-width="100" placeholder="请输入中区水泵型号" clearable></van-field>
      <van-field v-model="info.val7" label="中区水泵功率：" label-width="100" placeholder="请输入中区水泵功率" clearable></van-field>
      <van-field v-model="info.val8" label="中区水泵流量：" label-width="100" placeholder="请输入中区水泵流量" clearable></van-field>
      <van-field v-model="info.val9" label="中区水泵扬程：" label-width="100" placeholder="请输入中区水泵扬程" clearable></van-field>
      <van-field v-model="info.val10" label="中区水泵数量：" label-width="100" placeholder="请输入中区水泵数量" clearable></van-field>
      <van-field v-model="info.val37" label="中区设定压力：" label-width="100" placeholder="请输入中区设定压力" clearable></van-field>
      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-field v-model="info.val11" label="高区水泵型号：" label-width="100" placeholder="请输入高区水泵型号" clearable></van-field>
      <van-field v-model="info.val12" label="高区水泵功率：" label-width="100" placeholder="请输入高区水泵功率" clearable></van-field>
      <van-field v-model="info.val13" label="高区水泵流量：" label-width="100" placeholder="请输入高区水泵流量" clearable></van-field>
      <van-field v-model="info.val14" label="高区水泵扬程：" label-width="100" placeholder="请输入高区水泵扬程" clearable></van-field>
      <van-field v-model="info.val15" label="高区水泵数量：" label-width="100" placeholder="请输入高区水泵数量" clearable></van-field>
      <van-field v-model="info.val38" label="高区设定压力：" label-width="100" placeholder="请输入高区设定压力" clearable></van-field>
      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-field v-model="info.val16" label="超高区水泵型号：" label-width="100" placeholder="请输入超高区水泵型号" clearable></van-field>
      <van-field v-model="info.val17" label="超高区水泵功率：" label-width="100" placeholder="请输入超高区水泵功率" clearable></van-field>
      <van-field v-model="info.val18" label="超高区水泵流量：" label-width="100" placeholder="请输入超高区水泵流量" clearable></van-field>
      <van-field v-model="info.val19" label="超高区水泵扬程：" label-width="100" placeholder="请输入超高区水泵扬程" clearable></van-field>
      <van-field v-model="info.val20" label="超高区水泵数量：" label-width="100" placeholder="请输入超高区水泵数量" clearable></van-field>
      <van-field v-model="info.val39" label="超高区设定压力：" label-width="100" placeholder="请输入超高区设定压力" clearable></van-field>
      <van-button block style="height: 10px" color="#F3F3F3"></van-button>


      <van-field name="stepper" label="门禁套数：" label-width="80">
        <slot slot="input">
          <van-stepper v-model="info.accessControl"></van-stepper>
        </slot>
      </van-field>

      <van-field name="stepper" label="视频套数：" label-width="80">
        <slot slot="input">
          <van-stepper v-model="info.video"></van-stepper>
        </slot>
      </van-field>


      <van-field label="宽带运营商：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.broadbandOperator" direction="horizontal">
            <van-radio name="电信" shape="square">电信</van-radio>
            <van-radio name="移动" shape="square">移动</van-radio>
            <van-button type="primary" size="mini" @click="info.broadbandOperator = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-field label="移交资料：" label-width="60">
        <slot slot="input">
          <van-checkbox-group v-model="checkboxGroup2" direction="horizontal">
            <van-checkbox name="竣工图" shape="square">竣工图</van-checkbox>
            <van-checkbox name="设备资料" shape="square">设备资料</van-checkbox>
            <van-checkbox name="门禁视频监控系统" shape="square">门禁视频监控系统</van-checkbox>
          </van-checkbox-group>
        </slot>
      </van-field>

      <van-field v-model="info.val21" label="二次供水分公司验收人员：" label-width="150" placeholder="请输入验收人员"
                 clearable></van-field>
      <van-field v-model="info.val22" label="工程公司验收人员：" label-width="150" placeholder="请输入验收人员" clearable></van-field>
      <van-field v-model="info.val23" label="其他部门验收人员：" label-width="150" placeholder="请输入验收人员" clearable></van-field>

      <van-field readonly clickable name="date" :value="info.val24" label="初验日期：" placeholder="点击选择时间"
                 @click="dateShow(3)" label-width="100" right-icon="calender-o"></van-field>
      <van-field readonly clickable name="date" :value="info.val25" label="复验日期：" placeholder="点击选择时间"
                 @click="dateShow(4)" label-width="100" right-icon="calender-o"></van-field>

      <van-field name="radio" label="整改要求：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val26" direction="horizontal">
            <van-radio name="无整改内容，验收通过" shape="square">无整改内容，验收通过</van-radio>
            <van-radio name="需要整改，内容如下" shape="square">需要整改，内容如下</van-radio>
            <van-button type="primary" size="mini" @click="info.val26 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>
      <van-field v-model="info.val28" label="建设单位：" label-width="80" readonly></van-field>
      <van-field v-model="info.val29" rows="2" autosize label="建设单位整改内容：" type="textarea" placeholder="请输入"
                 label-width="120"></van-field>
      <van-field v-model="info.val30" label="设备厂家：" label-width="80" readonly></van-field>
      <van-field v-model="info.val31" rows="2" autosize label="设备厂家整改内容：" type="textarea" placeholder="请输入"
                 label-width="120"></van-field>
      <van-field name="radio" label="整改期限：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val32" direction="horizontal">
            <van-radio name="2周内整改完毕" shape="square">2周内整改完毕</van-radio>
            <van-radio name="1个月内整改完毕" shape="square">1个月内整改完毕</van-radio>
            <van-button type="primary" size="mini" @click="info.val32 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>


      <van-field name="radio" label="复验情况：" label-width="80">
        <slot slot="input">
          <van-radio-group v-model="info.val33" direction="horizontal">
            <van-radio name="已按要求整改，验收通过" shape="square">已按要求整改，验收通过</van-radio>
            <van-button type="primary" size="mini" @click="info.val33 = ''" plain>取消</van-button>
          </van-radio-group>
        </slot>
      </van-field>

      <van-field label="生产科负责人签字：" readonly label-width="200"></van-field>
      <van-image @click="signShow(1)" width="100%" height="6rem" :src="info.val34"></van-image>
      <van-field readonly clickable name="date" :value="info.val35" label="签字时间：" placeholder="点击选择时间"
                 @click="dateShow(5)" label-width="80"></van-field>


      <van-row gutter="2" v-if="info.status !== '已提交'">
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
      <van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm"
                           @cancel="showPicker = false"></van-datetime-picker>
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
  name: "e9",
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
      checkboxGroup: [],
      checkboxGroup2: [],
      checkboxGroup3: []
    };
  },
  mounted() {
    this.getInfo(this.id);
    this.getDept();
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

    //定时保存
    timerKeep() {
      if (this.info.status === '保存') {
        this.info.status = '保存';
        if (this.checkboxGroup2.length !== 0) {
          this.info.transferMaterial = this.checkboxGroup2.toString();
        }
        if (this.checkboxGroup.length !== 0) {
          this.info.partitionSituation = this.checkboxGroup.toString();
        }
        this.api.updE9(JSON.stringify(this.info)).then(res => {
          if (res.code === 200) {
            Toast.success('自动保存成功');
          } else {
            Toast.fail('保存失败');
          }
        })
      }
    },
    getGps() {
      this.$bridge.callHandler('h5_up_location', "", (res) => {
        let parse = JSON.parse(res);
        this.info.lng = parse.dlon;
        this.info.lat = parse.dlat;
        //Toast(parse.dlat+"***"+parse.dlon)
      })
    },


    //接单单位
    getDept() {
      this.api.getDeptList(3000).then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          this.columns.push(res.data.list[i].nm);
        }

      })
    },


    dateShow(val) {
      this.dateVal = val;
      this.showPicker = true
    },
    onConfirm2(item) {
      this.info.equipmentNm = item;
      this.showPicker2 = false;

    },
    onConfirm(time) {
      if (this.dateVal === 1) {
        this.info.transferTm = this.until.dateFormatDay(time);
      }
      if (this.dateVal === 2) {
        this.info.warrantyTm = this.until.dateFormatDay(time);
      }
      if (this.dateVal === 3) {
        this.info.val24 = this.until.dateFormatDay(time);
      }
      if (this.dateVal === 4) {
        this.info.val25 = this.until.dateFormatDay(time);
      }
      if (this.dateVal === 5) {
        this.info.val35 = this.until.dateFormatDay(time);
      }

      this.showPicker = false;
    },
    canvasInit() {
      this.$refs.SignCanvas.canvasInit();
    },
    writeEnd() {
      if (this.signVal === 1) {
        this.info.val34 = this.$refs.SignCanvas.saveAsImg();
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
      this.api.getE9(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
        if (res.code === 200) {
          this.info = res.data.list[0];
          if (this.info.transferMaterial != null) {
            this.checkboxGroup2 = this.info.transferMaterial.split(",")
          }
          if (this.info.partitionSituation != null) {
            this.checkboxGroup = this.info.partitionSituation.split(",")
          }
          this.api.getE5(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
            if (res.code === 200) {
              let x = res.data.list[0];
              this.info.wfy = x.wfy;
              this.info.wfyNum = x.wfyNum;
              this.info.xs = x.xs;
              this.info.xsNum = x.xsNum;
              this.info.sxbp = x.sxbp;
              this.info.sxbpNum = x.sxbpNum;
              this.info.gp = x.gp;
              this.info.gpNum = x.gpNum;
              this.info.yth = x.yth;
              this.info.ythNum = x.ythNum;
              this.info.recordNm = x.recordNm;
            }
          })
          //土建交底表e4 整改内容写入 建设单位整改内容中
          this.api.getE4(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
            if (res.code === 200) {
              let x = res.data.list[0];
              if (!this.info.val29){
                this.info.val29 = x.val34;
              }
            }
          })

          //管道配件表e5  成套设备验收表e13 整改内容写入 设备厂家整改记录
          this.api.getE5(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
            if (res.code === 200) {
              let x = res.data.list[0];
              if (x.val62 != null) {
                if (!this.info.val31) {
                  this.info.val31 = this.info.val31 + x.val62;
                }
              }
            }
          })

          this.api.getE13(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
            if (res.code === 200) {
              let x = res.data.list[0];
              if (x.val79 != null) {
                if (!this.info.val31) {
                  this.info.val31 = this.info.val31 + x.val79;
                }
              }
            }
          })
          //成套设备 整改内容写入厂家
          this.api.getE7(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
            if (res.code === 200) {
              let x = res.data.list[0];
              if (x.val79 != null) {
                if (!this.info.val31) {
                  this.info.val31 = this.info.val31 + x.val79;
                }
              }
            }
          })
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
        if (this.checkboxGroup2.length !== 0) {
          this.info.transferMaterial = this.checkboxGroup2.toString();
        }
        if (this.checkboxGroup.length !== 0) {
          this.info.partitionSituation = this.checkboxGroup.toString();
        }
        this.api.updE9(JSON.stringify(this.info)).then(res => {
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
        if (this.checkboxGroup2.length !== 0) {
          this.info.transferMaterial = this.checkboxGroup2.toString();
        }
        if (this.checkboxGroup.length !== 0) {
          this.info.partitionSituation = this.checkboxGroup.toString();
        }
        this.api.updE9(JSON.stringify(this.info)).then(res => {
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

