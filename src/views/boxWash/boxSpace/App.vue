<template>
  <div id="container">


    <my-header title="有限空间审批" @back="back" :searchStatus='false'></my-header>
    <div class="searchBox">
      <div class="div-search">
        <input placeholder="搜索清洗单位" v-model="searchData.unitNm" @input="search"/>
      </div>
      <div class="div-search">
        <input placeholder="搜索泵房编号" v-model="searchData.pumpNo" @input="search"/>
      </div>
      <div class="div-search">
        <input placeholder="搜索泵房名称" v-model="searchData.pumpNm" @input="search"/>
      </div>
    </div>


    <van-tabs v-model="active" color="#1177B9" @change="tabChange">
      <van-tab v-for="item in tabList" :title='item' :key="item">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  :immediate-check="immediate">
          <div v-for="item in dataList" :key="item.id" @click="toDetail(item)" class="listItem">
            <div class="itemTop" @click="toDetail(item)">
              <div>{{ item.pumpNo }}<span></span>{{ item.pumpNm }}<span></span>{{ item.region }}</div>
            </div>
            <div style="margin-left: 10px;padding-bottom: 10px">
              <span>开工时间：{{ item.startTm }}</span>
            </div>

            <div class="itemContent">
              <p><span>清洗单位：</span>{{ item.unitNm }}</p>
              <p><span>单位：</span>{{ item.unit }}</p>
              <p><span>填写人：</span>{{ item.fillPerson }}</p>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>

    <!--详情弹窗-->
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'100%' }">

      <van-sticky>
        <my-header title="详情" @back="show = false" :searchStatus='false'></my-header>
      </van-sticky>

      <van-cell-group>
        <van-form>
          <van-field v-model="infoSpace.pumpNm" label="泵房名称：" readonly label-width="100"></van-field>
          <van-field v-model="infoSpace.unitNm" label="施工单位:" readonly label-width="100"></van-field>
          <van-field v-model="infoSpace.unit" label="单位:" readonly label-width="100"></van-field>
          <van-field v-model="infoSpace.facilityName" label="设施名称:" readonly label-width="100"></van-field>
          <van-field v-model="infoSpace.jobContent" label="作业内容:" readonly label-width="100"></van-field>
          <van-field v-model="infoSpace.riskFactor" label="主要危险因素:" readonly label-width="100"></van-field>
          <van-field v-model="infoSpace.guardian" label="监护人:" placeholder="请选择监护人" label-width="100"
                     readonly></van-field>
          <van-field v-model="infoSpace.fillPerson" label="填写人:" placeholder="请选择填写人" label-width="100"
                     readonly></van-field>
          <van-cell title="作业人:">
            <template slot="label">
              <van-tag type="primary" v-for="item in jobPerson" :key="item" size="medium"
                       style="margin-right: 10px;margin-top: 5px">{{ item }}
              </van-tag>
            </template>
          </van-cell>

          <van-field v-model="infoSpace.startTm" label="开工时间:" placeholder="请选择开工时间" label-width="100"
                     readonly></van-field>

          <van-field label="主要安全措施" readonly></van-field>


          <van-cell>
            <van-radio-group v-model="infoSpace.safety1" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                1.作业前对进入有限空间危险性进行分析，并进行操作前安全交底及培训，确认作业人员的身体状况，有无感冒、 发烧、咳嗽、拉肚子等症状，发现有碍饮水卫生病症的 应立即脱离工作岗位。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.safety2" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                2.清洗人员确认有限空间内存在的其他危险因素，如内部
                附件、龙骨等。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.safety3" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                3.打开水箱人孔口，用手提鼓风机进行强制通风或佩戴空
                气呼吸器，吹风2小时以上，使有限空间内部空气流通。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.safety4" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                4.检查有限空间内部是否具备作业条件:检测有限空间内空
                气质量，未经检测或检测不格，任何人员严禁入内。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.safety5" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                5.检查高压水枪电源线，保证性能良好，线路无破损、无
                漏点。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.safety6" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                6.检查水箱进水阀是否在关闭，并挂“禁止开启”标志牌。
              </van-radio>
            </van-radio-group>

          </van-cell>
          <van-cell>
            <van-radio-group v-model="infoSpace.safety7" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                7.负责清洗的班组至少3人以上，水箱内必须2人以上一起
                作业。
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.safety8" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                8.清洗人员必须穿戴防护作用的口罩、眼镜、安全帽、防
                割手套、穿长袖长裤工作服、防滑雨靴、戴头灯，无关
                物品不得带入有限空间内部。
              </van-radio>
            </van-radio-group>

          </van-cell>
          <van-cell>
            <van-radio-group v-model="infoSpace.safety9" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                9.检查有限空间进出口，水箱人孔处须有1人监管，并与
                有限空间内人员保持通话。
              </van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group v-model="infoSpace.safety10" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                10.清洗结束后，开启水箱进水阀之前须检查水箱内人员是
                否全部撤离，核对并清点工具，是否有遗漏物品。
              </van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group v-model="infoSpace.safety11" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                11.消防器材
              </van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell>
            <van-radio-group v-model="infoSpace.safety12" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                12.救生绳
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.safety13" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                13.急救箱
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-cell>
            <van-radio-group v-model="infoSpace.hazard" direction="horizontal" disabled>
              <van-radio name="1" shape="square">
                无危害
              </van-radio>
            </van-radio-group>
          </van-cell>

          <van-field label="施工作业负责人签字" readonly label-width="130"></van-field>
          <van-image width="100%" height="10rem" :src="infoSpace.jobSign">
            <template v-slot:loading>施工作业负责人签字</template>
          </van-image>
          <van-field v-model="infoSpace.jobSignTm" label="签字时间:" label-width="100" readonly></van-field>

          <van-field label="确认人签字" readonly label-width="130"></van-field>
          <van-image @click="show3 = true" width="100%" height="8rem" :src="infoSpace.confirmSign">
            <template v-slot:loading>确认人签字</template>
          </van-image>
          <van-field v-model="infoSpace.safety16" right-icon="notes-o" label="签字时间：" placeholder="点击选择时间"
                     label-width="120" readonly @click="showTime = true"
                     clickable></van-field>

          <!-- 签字弹窗-->

          <van-button v-if="infoSpace.status == 1" block type="info" @click="submit">
            审核通过
          </van-button>


        </van-form>
      </van-cell-group>
    </van-popup>

    <van-popup v-model="show3" position="top" :style="{ height: '100%' }">
      <van-nav-bar fixed title="签字" @click-left="show3 = false" left-arrow></van-nav-bar>
      <sign v-if="show3" ref="SignCanvas"></sign>
      <van-goods-action style="margin-bottom: 50px">
        <van-goods-action-button color="#be99ff" text="重写" @click="canvasInit"></van-goods-action-button>
        <van-goods-action-button color="#7232dd" text="确定" @click="writeEnd"></van-goods-action-button>
      </van-goods-action>
    </van-popup>


    <!--时间弹窗-->
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" @confirm="confirmDate"
                           @cancel="showTime = false"></van-datetime-picker>
    </van-popup>


    <!--搜索弹窗-->
    <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
      <van-form style="margin-top: 50px">
        <van-field label="清洗单位:" v-model="searchData.unitNm" clearable></van-field>
        <van-field label="泵房名称:" v-model="searchData.pumpNm" clearable></van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" @click="search">
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
  components: {sign, myHeader},
  data() {
    return {
      show3: false,
      showTime: false,
      jobPerson: [],
      infoSpace: {},
      show: false,
      searchShow: false,
      searchData: {
        unitNm: '',
        pumpNo: '',
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
    confirmDate(val) {
      this.infoSpace.safety16 = this.until.dateFormat(val);
      this.showTime = false;
    },

    //审核通过
    submit() {

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
      this.pageNo = 1;
      this.dataList = [];
      this.getList();
    },
    toDetail(item) {
      this.show = true;
      this.infoSpace = item;
      this.jobPerson = item.jobPerson.split(',');
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
      if (this.searchData.pumpNm) {
        this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
      }
      if (this.searchData.unitNm) {
        this.query.toW(qry, "unitNm", this.searchData.unitNm, "LK");
      }
      if (this.searchData.pumpNo) {
        this.query.toW(qry, "pumpNo", this.searchData.pumpNo, "LK");
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

<style lang="less">
.van-cell {
  line-height: normal;

}

/deep/ .van-tab__text--ellipsis {
  display: flex !important;
  overflow: visible !important;
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

<style lang="less">
#container {
  display: flex;
  flex-direction: column;
  height: 100vh;

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
  }
}

#container {
  min-height: 100vh;
  background: #F5F2F5;
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
    border-top: 1px solid #E9E9E9;
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

