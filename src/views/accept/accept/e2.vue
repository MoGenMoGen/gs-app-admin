<template>
  <div id="container">
    <van-sticky>
      <my-header title="土建交底记录表" @back="back" :search-status="false"></my-header>
    </van-sticky>
    <van-cell-group>
      <van-field v-model="info.entryNm" placeholder="请输入项目名称" label="项目名称：" clearable></van-field>
      <van-field v-model="info.discloseUnit" label="交底单位：" readonly></van-field>
      <van-field v-model="info.buildUnit" label="建设单位：" readonly></van-field>
      <van-field v-model="info.discloseTm" label="交底时间：" readonly></van-field>

      <van-button block style="height: 10px" color="#F3F3F3"></van-button>
      <van-cell>泵房土建交底内容</van-cell>
      <van-cell>
                <span class="span">
                 1、.泵房应设置于地上一层或高于周边道路路面标高，泵房室内地坪标高不得低于室外地坪标高，应选址在独立区域，其垂直上一层不得有住宅（含厕所、浴室、盥洗室、厨房、污水处理间、污水管道），墙体与主体结构（含地下室）分离，与住宅楼保持适当距离，满足噪声规范GB50118要求；泵房不应毗邻小区垃圾用房，与污染源距离应不小于5米，有水箱的泵房不宜毗邻电气用房。
                </span>
        <van-divider></van-divider>
        <span class="span">
                 2、.泵房面积一般要求为单套设备不小于40m2，长度不少于6m，宽度不少于5m，每增加一套设备，应相应增加20m2，水箱占有位置单独考虑，梁底净高不得小于4.3m
                </span>
        <van-divider></van-divider>
        <span class="span">
                 3、泵房土建中应充分考虑整体荷载，不应后期增加加固措施。雨水管、消防管等非泵房管线不得接入或穿过泵房。
                </span>
        <van-divider></van-divider>
        <span class="span">
                4、	泵房大门应采用双开防火防盗门，宽度不小于1.2m，统一往外开；泵房内应有窗户，不应装落地窗，采用中空隔音玻璃，并装不锈钢防盗窗、窗帘。
                </span>
        <van-divider></van-divider>
        <span class="span">
                5、	泵房各个出入口设置 5cm 高的混凝土门槛，并安装不锈钢挡水（小动物）条，高度为30cm。
                </span>
        <van-divider></van-divider>
        <span class="span">
                6、	泵房内墙、屋顶应粉刷（白色为主），墙上无渗、漏痕迹，地上泵房要保证屋顶落水无阻塞、漏水现象；泵房地面应做环氧地坪（灰色），光滑平整
                </span>
        <van-divider></van-divider>
        <span class="span">
                7、	泵房照明应采安装56瓦以上防爆壁灯，高度2.5m以上，控制柜、水箱人梯、人孔周边等无照明死角，照明开关应设置于正门进门处，并配备应急照明设施和8个防水5孔插座（暗敷），分设于大门两边、控制柜附近，高度1.3m。
                </span>
        <van-divider></van-divider>
        <span class="span">
                8、	泵房每面墙上应安装消防疏散逃生指示灯，距地面60公分，每个墙面1盏，两灯间距大于20米的加装一盏。疏散防爆应急照明灯及电线应该嵌入式安装（暗敷）。泵房大门门框上安装安全出口标志灯。
                </span>
        <van-divider></van-divider>
        <span class="span">
                9、	泵房内要求覆盖无线信号，预留有线端口，小区网络机房到泵房配线光缆应使用单膜4芯光纤，拉至泵房正门处。小区驻地网应及早申请，泵房移交前应开通有线网络。
                </span>
        <van-divider></van-divider>
        <span class="span">
                10、 泵房应具备良好的通风、排水条件。泵房应设置通风孔并安装排风扇；地上泵房不设集水坑，泵房朝外墙底开设应急排水孔，尺寸0.4m*0.2m，离地0.1m，泵房四周应设排水沟，排水沟与室外雨水井相连，不得排至地下室，深度、宽度0.3m以上，并有不小于0.01 m的坡度，斜向排水口。泵房地面应有不小于0.01 m的坡度，斜向排水沟。排水沟采用壁厚不小于 1mm 的不锈钢格栅盖平，排水沟出口要求2个Φ200以上，排水沟及应急排水孔出口都应设置1mm孔径防虫网。
                </span>
        <van-divider></van-divider>
        <span class="span">
                11、有水箱的泵房，须满足以下三点：（1）水箱基础：可采用混凝土条形梁或工字钢，基础高度应不小于0.5m；条梁或工字钢之间的地坪应高于泵房内一般地坪0.05m，并有不小于0.02m的坡度，斜向排水沟。（2）间距：水箱外壁与建筑墙面或其它池壁之间的净距一般不小于0.7m，安装有管道、阀门的侧面离墙净距不小于1.0 m；设有人孔的池顶，顶板面与建筑板底的净空不小于0.8m。（3）安全环：水箱人孔和人梯上方横梁或顶板的合适位置应安装三个安全绳挂环，应能承载100	千克（含）以上负荷。
                </span>
        <van-divider></van-divider>
        <span class="span">
                12、设备混凝土基础：水泵基础，高度不应小于0.2m，控制柜基础，混凝土加槽钢底座0.3m，离墙0.7m；基础平面要求形状规则、光滑平整，平面尺寸比设备外轮廓长、宽各加大0.2m。
                </span>
        <van-divider></van-divider>
        <span class="span">
                13、 泵房用电应从泵房内专用电源箱处连接，并设置专用电表，电表应安装在泵房外
                </span>
        <van-divider></van-divider>
        <span class="span">
                14、泵房消防器材配置标准：每50平米配置一套：2个1211（2KG/个）灭火器+1个灭火器专用箱
                </span>
        <van-divider></van-divider>
        <span class="span">
                15、泵房内不得存放易燃易爆及腐蚀性物品，泵房验收前将泵房杂物、施工痕迹清理干净，保证泵房门、窗、地面、设备整洁。
                </span>

      </van-cell>
      <van-field v-model="info.agreedContent" label="其他需要约定内容：" placeholder="请输入内容" rows="3" type="textarea"
                 label-width="120" clearable></van-field>

      <van-field label="交底人签字：" readonly label-width="130"></van-field>
      <van-image @click="showSign = true" width="100%" height="8rem" :src="info.discloseUser"></van-image>
      <van-popup v-model="showSign" position="top" :style="{ height: '100%' }" closeable>
        <sign ref="SignCanvas"></sign>
        <van-goods-action style="margin-bottom: 50px">
          <van-goods-action-button color="#be99ff" text="重写" @click="canvasInit"></van-goods-action-button>
          <van-goods-action-button color="#7232dd" text="确定" @click="writeEnd"></van-goods-action-button>
        </van-goods-action>
      </van-popup>
      <van-field v-model="info.discloseUserPhone" label="联系电话：" placeholder="请输入联系电话" label-width="120"
                 clearable></van-field>
      <van-field readonly clickable name="datetimePicker" :value="info.discloseUserTm" label="签字时间" placeholder="点击选择时间"
                 @click="showPicker = true" label-width="120"></van-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker v-model="currentDate" type="datetime" @confirm="onConfirm"
                             @cancel="showPicker = false"></van-datetime-picker>
      </van-popup>

      <van-field label="被交底人签字：" readonly label-width="130"></van-field>
      <van-image @click="showSign2 = true" width="100%" height="8rem" :src="info.coverUser"></van-image>
      <van-popup v-model="showSign2" position="top" :style="{ height: '100%' }" closeable>
        <sign ref="SignCanvas"></sign>
        <van-goods-action style="margin-bottom: 50px">
          <van-goods-action-button color="#be99ff" text="重写" @click="canvasInit"></van-goods-action-button>
          <van-goods-action-button color="#7232dd" text="确定" @click="writeEnd2"></van-goods-action-button>
        </van-goods-action>
      </van-popup>
      <van-field v-model="info.coverUserPhone" label="联系电话：" placeholder="请输入联系电话" label-width="120"
                 clearable></van-field>
      <van-field readonly clickable name="datetimePicker" :value="info.coverUserTm" label="签字时间" placeholder="点击选择时间"
                 @click="showPicker2 = true" label-width="120"></van-field>
      <van-popup v-model="showPicker2" position="bottom">
        <van-datetime-picker v-model="currentDate" type="datetime" @confirm="onConfirm2"
                             @cancel="showPicker2 = false"></van-datetime-picker>
      </van-popup>

      <van-row gutter="2" v-if="info.status !== '已提交'">
        <van-col span="12">
          <van-button type="primary" color="#00CED1" block @click="keep">保存</van-button>
        </van-col>
        <van-col span="12">
          <van-button type="primary" color="#008B8B" block @click="submit">提交</van-button>
        </van-col>
      </van-row>
    </van-cell-group>


  </div>
</template>

<script>
import sign from "../../../components/sign";
import myHeader from "../../../components/myHeader/myHeader";
import {Toast, Dialog} from 'vant';

export default {
  name: "e2",
  components: {sign, myHeader},
  data() {
    return {
      showPicker: false,
      showPicker2: false,
      showSign: false,
      showSign2: false,
      currentDate: new Date(),
      info: {
        val4: '',
        val8: '',
        status: ''
      }
    };
  },
  mounted() {
    this.getInfo(this.id);

  },
  props: ["id"],
  methods: {
    onConfirm(time) {
      this.info.discloseUserTm = this.until.dateFormat(time);
      this.showPicker = false;
    },
    onConfirm2(time) {
      this.info.coverUserTm = this.until.dateFormat(time);
      this.showPicker2 = false;
    },
    canvasInit() {
      this.$refs.SignCanvas.canvasInit();
    },
    writeEnd() {
      this.info.discloseUser = this.$refs.SignCanvas.saveAsImg();
      this.showSign = false;
    },
    writeEnd2() {
      this.info.coverUser = this.$refs.SignCanvas.saveAsImg();
      this.showSign2 = false;
    },
    getInfo(id) {
      let qry = this.query.new();
      this.query.toW(qry, 'earlyId', id, "EQ");
      this.api.getE2(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
        if (res.code === 200) {
          this.info = res.data.list[0];
          this.info.discloseUnit = '宁波市自来水有限公司二次供水分公司';
        }
      })
    },
    //提交
    submit() {
      Dialog.confirm({
        title: '注意',
        message: '确定提交？'
      }).then(() => {
        this.info.status = '已提交';
        this.api.updE2(JSON.stringify(this.info)).then(res => {
          if (res.code === 200) {
            Toast.success('提交成功');
            this.$emit('closeInfo')
          }
        })
      }).catch(() => {
        // on cancel
      });
    },
    //保存
    keep() {
      this.info.status = '保存';
      Dialog.confirm({
        title: '注意',
        message: '确定保存？'
      }).then(() => {
        this.api.updE2(JSON.stringify(this.info)).then(res => {
          if (res.code === 200) {
            Toast.success('保存成功');
          }
        })
      })
    },

    keep2() {
      Dialog.confirm({
        title: '注意',
        message: '确定保存？'
      }).then(() => {
        this.api.updE2(JSON.stringify(this.info)).then(res => {
          if (res.code === 200) {
            Toast.success('保存成功');
          }
        })
      })
    },

    back() {
      this.$emit('closeInfo')
    },
  }
};
</script>

<style lang="less" scoped>
.van-cell {
  font-size: 10px;
}

.span {
  color: #999999;
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

