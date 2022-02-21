<template>
  <!--  设备保养详情-->

  <div class="out">
    <van-sticky>
      <my-header title="设备保养详情" @back="back" :searchStatus="false">
      </my-header>
    </van-sticky>
    <!--    列表页面-->
    <div class="list">
      <div class="label">
        <p>保养单位：</p>
        <p v-if="info.unitNm">{{ info.unitNm }}</p>
      </div>
      <div class="label">
        <p>泵房编号：</p>
        <p v-if="info.pumpNo">{{ info.pumpNo }}</p>
      </div>
      <div class="label">
        <p>泵房名称：</p>
        <p v-if="info.pumpNm">{{ info.pumpNm }}</p>
      </div>
      <div class="label">
        <p>供水分区：</p>
        <p v-if="info.zoning">{{ info.zoning }}</p>
      </div>
      <div class="label">
        <p>供水模式：</p>
        <p v-if="info.supplyMode">{{ info.supplyMode }}</p>
      </div>
      <div class="label">
        <p>计划开始日期：</p>
        <p v-if="info.planTm">{{ info.planTm }}</p>
      </div>
      <div class="label">
        <p>计划结束日期：</p>
        <p v-if="info.plan2Tm">{{ info.plan2Tm }}</p>
      </div>
      <div class="label">
        <p>保养人姓名：</p>
        <p v-if="info.user">{{ info.user }}</p>
      </div>
      <!--          0：保存，1：已提交，2：逾期，3：等待清洗      -->

<!--      <div class="label">-->
<!--        <p>保养完成情况：</p>-->
<!--        <p v-if="info.statusNm">{{ info.statusNm }}</p>-->
<!--      </div>-->
      <div class="label">
        <p>实际保养时间：</p>
        <p v-if="info.taskTm">{{ info.taskTm }}</p>
      </div>

      <img :src="icCs" class="overtime" v-if="tabId == 2" />
    </div>
    <div class="list">
      <sub-header2 name="基本信息"></sub-header2>
      <div class="table">
        <div class="tr">
          <p>水泵运行编号</p>
          <p>{{ info.val1 }}号</p>
          <p>{{ info.val6 }}号</p>
          <p>{{ info.val11 }}号</p>
          <p>{{ info.val16 }}号</p>
        </div>

        <div class="tr">
          <p>进水压力(MPa)：</p>
          <p>{{ info.val2 }}</p>
          <p>{{ info.val7 }}</p>
          <p>{{ info.val12 }}</p>
          <p>{{ info.val17 }}</p>
        </div>
        <div class="tr">
          <p>出水压力(MPa)：</p>
          <p>{{ info.val3 }}</p>
          <p>{{ info.val8 }}</p>
          <p>{{ info.val13 }}</p>
          <p>{{ info.val18 }}</p>
        </div>
        <div class="tr">
          <p>电流(A)：</p>
          <p>{{ info.val4 }}</p>
          <p>{{ info.val9 }}</p>
          <p>{{ info.val14 }}</p>
          <p>{{ info.val19 }}</p>
        </div>
        <div class="tr">
          <p>变频器频率(Hz)：</p>
          <p>{{ info.val5 }}</p>
          <p>{{ info.val10 }}</p>
          <p>{{ info.val15 }}</p>
          <p>{{ info.val20 }}</p>
        </div>
      </div>

      <div class="meter">
        <p><span>电度表度数：</span></p>
        <!--        <p><span>上期：</span>{{info.val21}}</p>-->
        <p><span>本期：</span>{{ info.val22 }}</p>
      </div>
      <sub-header2 name="泵房设施"></sub-header2>
      <div class="subTitle"><p>1、进线电源控制器</p></div>

      <div class="label-value">
        <span>接线：</span><span v-if="info.val23">{{ info.val23 }}</span>
      </div>
      <div class="label-value">
        <span>空气开关：</span><span v-if="info.val24">{{ info.val24 }}</span>
      </div>
      <div class="label-value">
        <span>电子元器件：</span><span v-if="info.val25">{{ info.val25 }}</span>
      </div>
      <div class="label-value">
        <span>电度表：</span><span v-if="info.val26">{{ info.val26 }}</span>
      </div>

      <div class="subTitle"><p>2、控制柜</p></div>

      <div class="label-value">
        <span>指示灯：</span><span v-if="info.val78">{{ info.val78 }}</span>
      </div>
      <div class="label-value">
        <span>防水：</span><span v-if="info.val27">{{ info.val27 }}</span>
      </div>
      <div class="label-value">
        <span>防尘：</span><span v-if="info.val28">{{ info.val28 }}</span>
      </div>
      <div class="label-value">
        <span>内接电路：</span><span v-if="info.val29">{{ info.val29 }}</span>
      </div>
      <div class="label-value">
        <span>电器元件：</span><span v-if="info.val30">{{ info.val30 }}</span>
      </div>
      <div class="label-value">
        <span>每季对控制器进行除尘：</span
        ><span v-if="info.val31">{{ info.val31 }}</span>
      </div>
      <div class="label-value">
        <span>除尘日期：</span><span v-if="info.val32">{{ info.val32 }}</span>
      </div>

      <div class="subTitle"><p>3、变频器</p></div>
      <div class="label-value">
        <span>运转：</span><span v-if="info.val33">{{ info.val33 }}</span>
      </div>
      <div class="label-value">
        <span>是否在最佳状态：</span
        ><span v-if="info.val34">{{ info.val34 }}</span>
      </div>

      <div class="subTitle">
        <span>4、PLC运转：</span><span v-if="info.val35">{{ info.val35 }}</span>
      </div>

      <div class="subTitle">
        <span>5、远程通讯状态：</span
        ><span v-if="info.val36">{{ info.val36 }}</span>
      </div>
      <div class="label-value">
        <span>数据远传参数：</span
        ><span v-if="info.val37">{{ info.val37 }}</span>
      </div>

      <div class="subTitle">
        <span>6、压力表：</span><span v-if="info.val38">{{ info.val38 }}</span>
      </div>
      <div class="label-value">
        <span>压力变送器：</span><span v-if="info.val39">{{ info.val39 }}</span>
      </div>

      <div class="subTitle"><p>7、水泵：</p></div>
      <div class="label-value">
        <span>运行：</span><span>{{ info.val40 }}</span>
      </div>
      <div class="label-value">
        <span>噪音：</span><span>{{ info.val41 }}</span>
      </div>
      <div class="label-value">
        <span>震动：</span><span>{{ info.val42 }}</span>
      </div>
      <div class="label-value">
        <span>泵体是否发热：</span><span>{{ info.val43 }}</span>
      </div>
      <div class="label-value">
        <span>水泵排气：</span><span>{{ info.val44 }}</span>
      </div>
      <div class="label-value">
        <span>机械密封：</span><span>{{ info.val45 }}</span>
      </div>
      <div class="subTitle"><p>8、电机：</p></div>

      <div class="label-value">
        <span>运行：</span><span>{{ info.val46 }}</span>
      </div>
      <div class="label-value">
        <span>电机电流：</span><span>{{ info.val47 }}</span>
      </div>
      <div class="label-value">
        <span>电机是否发热：</span><span>{{ info.val48 }}</span>
      </div>

      <div class="subTitle">
        <span>9、水泵、管道、阀门、压力水容器等密封情况：</span
        ><span v-if="info.val49">{{ info.val49 }}</span>
      </div>

      <div class="subTitle">
        <span>10、每季检查水泵远程启闭功能是否完好：</span
        ><span v-if="info.val50">{{ info.val50 }}</span>
      </div>

      <div class="label-value">
        <span>检查日期：</span><span>{{ info.val51 }}</span>
      </div>

      <div class="subTitle">11、每季检查水泵远程启闭功能是否完好</div>
      <div class="label-value">
        <span>接线：</span><span>{{ info.val52 }}</span>
      </div>
      <div class="label-value">
        <span>空气开关：</span><span>{{ info.val53 }}</span>
      </div>
      <div class="label-value">
        <span>电子元器件：</span><span>{{ info.val54 }}</span>
      </div>
      <div class="label-value">
        <span>排污泵运行情况：</span><span>{{ info.val55 }}</span>
      </div>
      <div class="label-value">
        <span>具体描述：</span><span>{{ info.val56 }}</span>
      </div>

      <div class="subTitle">
        <span>12、无负压设备罐体排污情况：</span
        ><span v-if="info.val57">{{ info.val57 }}</span>
      </div>

      <sub-header2 name="水池(箱)"></sub-header2>

      <div class="subTitle">
        <span>1、水箱(池)与水泵联动运转情况：</span
        ><span>{{ info.val58 }}</span>
      </div>
      <div class="subTitle">
        <span>2、电动蝶阀使用情况：</span><span>{{ info.val59 }}</span>
      </div>
      <div class="label-value">
        <span>液体控制器使用情况：</span><span>{{ info.val60 }}</span>
      </div>
      <div class="label-value">
        <span>浮球阀使用情况：</span><span>{{ info.val61 }}</span>
      </div>
      <div class="subTitle">
        <span>3、每季检查电动蝶阀启闭功能完好情况：</span
        ><span>{{ info.val62 }}</span>
      </div>
      <div class="label-value">
        <span>检查日期：</span><span>{{ info.val63 }}</span>
      </div>
      <div class="subTitle">
        <span>4、水池(箱)是否有泄露现象：</span><span>{{ info.val64 }}</span>
      </div>
      <div class="label-value">
        <span>具体描述：</span><span>{{ info.val65 }}</span>
      </div>
      <div class="subTitle">
        <span>5、水池(箱)水位是否正常：</span><span>{{ info.val66 }}</span>
      </div>
      <div class="label-value">
        <span>水位显示：</span><span>{{ info.val67 }}米</span>
      </div>
      <div class="subTitle">
        <span>6、水箱加盖上锁情况：</span><span>{{ info.val68 }}</span>
      </div>

      <sub-header2 name="门禁视频"></sub-header2>

      <div class="subTitle"><span>1、门禁视频使用情况：</span></div>
      <div class="label-value">
        <span>刷卡开门：</span><span>{{ info.val69 }}</span>
      </div>
      <div class="label-value">
        <span>水位报警：</span><span>{{ info.val70 }}</span>
      </div>
      <div class="subTitle"><span>2、视频系统使用情况：</span></div>
      <div class="label-value">
        <span>球体摄像头使用情况：</span><span>{{ info.val71 }}</span>
      </div>

      <sub-header2 name="其他设施"></sub-header2>

      <div class="subTitle">
        <span>1、泵房潮湿情况评定：</span><span>{{ info.val72 }}</span>
      </div>
      <div class="subTitle">
        <span>2、泵房照明情况：</span><span>{{ info.val73 }}</span>
      </div>
      <div class="label-value">
        <span>具体描述：</span>
        <p>{{ info.val74 }}</p>
      </div>
      <div class="subTitle">
        <span>3、泵房内设备整洁情况：</span><span>{{ info.val75 }}</span>
      </div>
      <div class="subTitle">
        <span>4、灭火器情况：</span><span>{{ info.val76 }}</span>
      </div>
      <div class="subTitle">
        <span>5、其他需要说明的情况：</span><span>{{ info.val77 }}</span>
      </div>

      <div class="label-special" v-if="info.month2 == 1">
        <p class="special-title">专项检测：2个月一次</p>
        <div class="table2">
          <div class="th">
            <p>设施类别</p>
            <p>检测项目</p>
            <p>要求达到的技术要求</p>
            <p>检测数据记录</p>
          </div>
          <div class="tr">
            <p>泵组</p>
            <p>水泵温度检测</p>
            <p>
              轴承温升不应超过35℃，滚动轴承内极限温度不得超过75℃，滑动轴承温度不得超过70℃。
            </p>
            <p><span>水泵温度：</span>{{ info.testing1 }}<span>℃</span></p>
          </div>

          <div class="tr">
            <p>泵组</p>
            <p>水泵绝缘、接地检测</p>
            <p>大于国家标准50兆欧</p>
            <p>
              <span>绝缘电阻：</span>{{ info.testing2 }}<span>兆欧</span>
              <span>接地电阻：</span>{{ info.testing3 }}<span>兆欧</span>
            </p>
          </div>

          <div class="tr">
            <p>电控柜</p>
            <p>控制柜接地检测</p>
            <p>大于等于国家标准50兆欧</p>
            <p><span>接地电阻：</span>{{ info.testing4 }}<span>兆欧</span></p>
          </div>
        </div>
      </div>

      <div class="label-special" v-if="info.month3 == 1">
        <p class="special-title">专项检测：3个月一次</p>
        <div class="table2">
          <div class="th">
            <p>设施类别</p>
            <p>检测项目</p>
            <p>要求达到的技术要求</p>
            <p>检测数据记录</p>
          </div>
          <div class="tr">
            <p>各类仪器 仪表</p>
            <p>机械及电子压力仪表</p>
            <p>压力表的准确度等级和 最大允许基本误差应符 合精度等级。</p>
            <p><span>压力误差：</span>{{ info.testing5 }}<span>±bar</span></p>
          </div>
        </div>
      </div>

      <div class="label-special" v-if="info.month6 == 1">
        <p class="special-title">专项检测：6个月一次</p>
        <div class="table2">
          <div class="th">
            <p>设施类别</p>
            <p>检测项目</p>
            <p>要求达到的技术要求</p>
            <p>检测数据记录</p>
          </div>
          <div class="tr">
            <p>泵组</p>
            <p>水泵噪音、振动检测</p>
            <p>
              不应超过现行国家标准《泵的振动测量与评价方法》(GB
              10889)振动烈度C级的规定。
            </p>
            <p>
              <span>水泵噪音：</span>{{ info.testing6 }}<span>分贝</span>
              <span>水泵震动：</span>{{ info.testing7 }}<span>mm/s</span>
            </p>
          </div>

          <div class="tr">
            <p>电控柜</p>
            <p>热继保护检测</p>
            <p>反应灵敏，可靠</p>
            <p>
              {{ info.testing8 }}
            </p>
          </div>

          <div class="tr">
            <p>电控柜</p>
            <p>控制柜电压、电流表检测</p>
            <p>仪表的准确度等级和最大允许基本误差应符合</p>
            <p>
              <span>电压误差：</span>{{ info.testing9 }}<span>±V</span>
              <span>电流误差：</span>{{ info.testing10 }}<span>±I</span>
            </p>
          </div>

          <div class="tr">
            <p>各类仪器 仪表</p>
            <p>压力开关检测</p>
            <p>精度高，误差少并控制柜上显示的数值比对。</p>
            <p>
              <span>压力开关误差：</span>{{ info.testing11 }}<span>±bar</span>
            </p>
          </div>

          <div class="tr">
            <p>各类仪器 仪表</p>
            <p>压力开关检测</p>
            <p>
              当进水压力低于最低停机设定值时压力开关应能立即动作发出指令关停水泵，当压力恢复正常时应能及时复位，启动水泵。
              当出水压力高于设定值 时压力开关应能立即动
              作发出指令关停水泵，当压力恢复正常时应能及时复位。
            </p>
            <p>
              {{ info.testing12 }}
            </p>
          </div>

          <div class="tr">
            <p>电动阀</p>
            <p>电动阀开闭检测</p>
            <p>达到水箱高、低液位设定值应可靠开闭。</p>
            <p>
              {{ info.testing13 }}
            </p>
          </div>

          <div class="tr">
            <p>液位仪、浮球开关</p>
            <p>水箱液位检测</p>
            <p>
              低位水箱液位仪随着液位变化数据应能正常调整。
              低位水箱液位到达停泵水位时应能向自控系统发出准确停泵指令。高位水箱液位到达高、低位设定值时应能够准确向自控系统发出指令，控制水泵的启停。
            </p>
            <p>
              {{ info.testing14 }}
            </p>
          </div>

          <div class="tr">
            <p>阀门</p>
            <p>开启关闭</p>
            <p>对各类长期开启或长期关闭的阀门操作一次，保证启闭灵活；</p>
            <p>
              {{ info.testing15 }}
            </p>
          </div>

          <div class="tr">
            <p>泵房</p>
            <p>卫生打扫</p>
            <p>泵房内全面打扫，干净无杂物</p>
            <p>
              {{ info.testing16 }}
            </p>
          </div>
        </div>
      </div>
      <div class="label-special" v-if="info.month12 == 1">
        <p class="special-title">专项检测：12个月一次</p>
        <div class="table2">
          <div class="th">
            <p>设施类别</p>
            <p>检测项目</p>
            <p>要求达到的技术要求</p>
            <p>检测数据记录</p>
          </div>
          <div class="tr">
            <p>电控柜</p>
            <p>继电器、接触器 检测</p>
            <p>继电器、接触器的运行是否正常，触电无打黑氧化现象</p>
            <p>{{ info.testing17 }}</p>
          </div>

          <div class="tr">
            <p>泵组</p>
            <p>润滑</p>
            <p>水泵轴承润滑</p>
            <p>{{ info.testing18 }}</p>
          </div>
          <div class="tr">
            <p>泵组</p>
            <p>防松紧固</p>
            <p>地脚螺栓和其他连接部分的紧固件可能会发生松动的部位</p>
            <p>{{ info.testing19 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subHeader2 from "../../../components/subHeader2";
import myHeader from "../../../components/myHeader/myHeader";

export default {
  data() {
    return {
      icCs: "https://hsyxxcx.oss-cn-hangzhou.aliyuncs.com/82b90f8ed0184ae09a71d6d771be9286.png",
      info: {},
      tabId: "",
    };
  },

  components: {
    subHeader2,
    myHeader
  },
  mounted() {},
  async created() {
    this.tabId = this.until.getQueryString("tabId");
    this.info = await this.api.getMaintainDtl(this.until.getQueryString("id"));
    for (let [k, v] of Object.entries(this.info)) {
      if (v === null) {
        this.info[k] = "";
      }
    }
    //0：保存，1：已提交，2：逾期，3：等待清洗
    if (this.info.status == 0) {
      this.$set(this.info, "statusNm", "保存");
    } else if (this.info.status == 1) {
      this.$set(this.info, "statusNm", "已提交");
    } else if (this.info.status == 2) {
      this.$set(this.info, "statusNm", "逾期");
    } else if (this.info.status == 3) {
      this.$set(this.info, "statusNm", "等待清洗");
    }
    // for (let [k, v] of Object.entries(this.info)) {
    //   if (v === null) {
    //     this.info[k] = "";
    //   }
    // }
    console.log(111, this.info);
  },
  watch: {},
  methods: {
    preView(url) {
      this.until.previewImage(url);
    },
    back() {
      this.until.back();
    },
  },
};
</script>
<style scoped lang="less">
.out {
  /*height: 100%;*/
}
/*列表*/
.list {
  background: white;
  box-sizing: border-box;
  padding: 0.2rem 0.3rem;
  width: 100%;
  height: 100%;
  position: relative;
  //通用单元格，由于组件在v-for中会错乱
  .label {
    padding: 0.15rem 0rem;
    display: flex;
    position: relative;

    p:nth-of-type(1) {
      color: #909090;
      font-size: 0.26rem;
      width: 2rem;
      flex-shrink: 0;
      margin-right: 0.1rem;
    }
    p:nth-of-type(2) {
      color: #303030;
      font-size: 0.26rem;
      img {
        width: 1.5rem;
        height: 0.5rem;
      }
    }
    .icon {
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      right: 0.1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .overtime {
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 0.93rem;
    height: 0.61rem;
  }

  .table {
    margin: 0.1rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    /*border-bottom: 1rem solid rgba(0,0,0,0.1);*/
    padding: 0.1rem 0;
    .tr {
      display: flex;
      flex-wrap: nowrap;

      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      p {
        padding: 0.15rem 0;
        color: #303030;
        font-size: 0.26rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p:nth-of-type(1) {
        flex: 2;
      }
      p:nth-of-type(2),
      p:nth-of-type(3),
      p:nth-of-type(4),
      p:nth-of-type(5) {
        flex: 1;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
  /*电表读数*/
  .meter {
    background: white;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 0.26rem;

    p {
      display: flex;
      span:first-child {
        color: #303030;
      }
    }
    p:nth-of-type(1) {
      width: 1.6rem;
      flex-shrink: 0;
    }
    p:nth-of-type(2),
    p:nth-of-type(3) {
      flex: 1.5;
    }
  }
}

/*小标题*/
.subTitle {
  color: #303030;
  font-size: 0.28rem;
  padding: 0.15rem 0rem;
}
.label-value {
  color: #303030;
  font-size: 0.28rem;
  padding: 0.15rem 0rem 0.15rem 0.5rem;
}

.label-special {
  color: #303030;
  font-size: 0.26rem;
  background: white;
  .special-title {
    /*background: #1177B9;*/
    /*color: white;*/
    padding: 0.1rem 0.2rem;
  }

  /*  专项检测*/
  .table2 {
    .th {
      display: flex;
      flex-wrap: nowrap;

      p {
        background: #1177b9;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.05rem 0;
        font-size: 0.26rem;
      }
      p:nth-of-type(1) {
        flex: 1;
      }
      p:nth-of-type(2) {
        flex: 1;
      }
      p:nth-of-type(3) {
        flex: 2;
      }
      p:nth-of-type(4) {
        flex: 1.3;
      }
    }

    .tr {
      display: flex;
      flex-wrap: nowrap;
      p {
        color: #303030;
        font-size: 0.26rem;
        padding: 0.1rem 0.1rem;
        input {
          border-bottom: 1px solid #999999;
          margin: 0.1rem 0.15rem;
        }
        flex-shrink: 0;
      }

      p:nth-of-type(1) {
        flex: 1;
      }
      p:nth-of-type(2) {
        flex: 1;
      }
      p:nth-of-type(3) {
        flex: 2;
      }
      p:nth-of-type(4) {
        flex: 1.3;
      }
    }
  }
}
</style>
