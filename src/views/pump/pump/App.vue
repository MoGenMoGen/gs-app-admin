<template>
  <div id="container">
    <van-sticky>
      <my-header
        title="泵房档案"
        :searchStatus="false"
        @back="back"
      ></my-header>
      <div class="div-search">
        <input placeholder="搜索泵房名称" v-model="searchTxt" />
      </div>
      <div class="tab">
        <ul>
          <li v-for="item in zoneList" @click="toChoose(item)" :key="item.id">
            <p :class="{ active: tabId == item.id }">
              {{ item.nm }}
            </p>
            <van-tag round type="danger">{{ item.arg1 }}</van-tag>
          </li>
        </ul>
      </div>
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="immediate"
    >
      <div v-for="(item, index) in dataList" :key="index" class="listItem">
        <div class="itemTop">
          <div>
            {{ item.no }}<span></span>{{ item.nm }}<span></span
            >{{ item.waterArea }}
          </div>
          <p><span>分区情况：</span>{{ item.partitionSituation }}</p>
          <p>
            <span>供水模式：</span>{{ item.arg2 }}
            <van-button
              size="mini"
              type="info"
              @click.stop="toNav(item)"
              style="margin-left: auto"
              >导航</van-button
            >
          </p>
          <img
            :src="arrowDownBlue"
            :class="{ showMore: item.showMore }"
            @click="toShowMore(item, index)"
          />
        </div>
        <div
          class="itemContent"
          @click.stop="toDetail(item)"
          v-if="item.showMore == true"
        >
          <!--<p><span>小区名称：</span>{{item.estateNm}}</p>-->
          <p><span>分区楼层：</span>{{ item.partitionFloor }}</p>
          <p><span>物业电话：</span>{{ item.propertyPhone }}</p>
          <p><span>泵房地址：</span>{{ item.pumpLocation }}</p>
          <p>
            <span>路线图：</span
            ><img
              :src="item.pumpRoute"
              @click.stop="showImg(item.pumpRoute)"
              v-if="item.pumpRoute != null && item.pumpRoute !== ''"
              width="80"
              height="80"
            />
          </p>
          <!--<p><span></span><van-button  size="mini" type="info" @click="toNav(item)">去导航</van-button></p>-->
        </div>
      </div>
    </van-list>
    <!--详情弹窗-->
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <van-sticky>
        <my-header
          title="详情"
          @back="show = false"
          :searchStatus="false"
        ></my-header>
      </van-sticky>

      <van-cell-group>
        <van-field
          v-model="info.no"
          label="泵房编号:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.nm"
          label="泵房名称:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.guarantee"
          label="是否过保:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.region"
          label="行政区域:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.waterArea"
          label="供水区域:"
          readonly
          label-width="120"
        ></van-field>
        <!--                <van-field v-model="info.estateNm" label="小区名称:" readonly label-width="120"></van-field>-->
        <van-field
          v-model="info.recordNm"
          label="备案名:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.sxNum"
          label="水箱个数:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.volume"
          label="总容积:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.transferTm"
          label="移交时间:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.enableTm"
          label="启用时间:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.warrantyTm"
          label="质保时间:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.maintainTm"
          label="保养调整时间:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.maintainStartTm"
          label="保养开始时间:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.houseNum"
          label="小区户数:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.estateNum"
          label="小区栋数:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.partitionFloor"
          label="分区楼层:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.partitionSituation"
          label="分区情况:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.propertyPhone"
          label="物业电话:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.community"
          label="所属社区:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.communityPhone"
          label="社区电话:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.sxsffk"
          label="生消分开:"
          readonly
          label-width="120"
        ></van-field>

        <van-field
          v-model="info.serverAddress"
          label="服务器地址:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.ip"
          label="IP地址:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.broadbandAccount"
          label="网关:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.broadbandPassword"
          label="子网掩码:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.broadbandOperator"
          label="宽带运营商:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.networkType"
          label="网络类型:"
          readonly
          label-width="120"
        ></van-field>
        <van-field v-model="info.lng" label="经度:" readonly label-width="120">
          <template #button>
            <van-button size="small" type="primary" @click="getGps"
              >获取当前定位</van-button
            >
          </template>
        </van-field>
        <van-field v-model="info.lat" label="维度:" readonly label-width="120">
          <template #button>
            <van-button size="small" type="info" @click="saveGps"
              >保存当前定位</van-button
            >
          </template>
        </van-field>
        <van-field
          v-model="info.pumpLocation"
          label="泵房位置:"
          readonly
          label-width="120"
          type="textarea"
          rows="2"
        ></van-field>
        <van-field
          v-model="info.bigEvent"
          label="泵房大事件:"
          readonly
          label-width="120"
          type="textarea"
          rows="2"
        ></van-field>
        <van-field
          v-model="info.wideVideo"
          label="广角监控数量:"
          readonly
          label-width="120"
        ></van-field>
        <van-field label="泵房图:" readonly label-width="120"></van-field>
        <van-image
          width="100"
          height="100"
          v-if="info.pumpImg1"
          :src="info.pumpImg1"
          @click="showImg(info.pumpImg1)"
        ></van-image>
        <van-image
          width="100"
          height="100"
          v-if="info.pumpImg2"
          :src="info.pumpImg2"
          @click="showImg(info.pumpImg2)"
        ></van-image>
        <van-field label="泵房路线图:" readonly label-width="120"></van-field>
        <van-image
          width="100"
          height="100"
          v-if="info.pumpRoute"
          :src="info.pumpRoute"
          @click="showImg(info.pumpRoute)"
        ></van-image>
        <van-field
          v-model="info.equipmentNm"
          label="设备供应商:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.equipmentPhone"
          label="设备联系人及电话:"
          readonly
          label-width="150"
        ></van-field>
        <van-field
          v-model="info.lnspectionNm"
          label="巡检单位:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.lnspectionPhone"
          label="巡检联系人及电话:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.maintenanceNm"
          label="保养单位:"
          readonly
          label-width="120"
        ></van-field>
        <van-field
          v-model="info.maintenancePhone"
          label="保养联系人及电话:"
          readonly
          label-width="120"
        ></van-field>
        <!--        <van-field v-model="info.maintenanceMethod" label="维护方式:" readonly label-width="120"></van-field>-->
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
import { ImagePreview, Toast } from "vant";
import myHeader from "../../../components/myHeader/myHeader";
import arrowDownBlue from "./img/向下.png";

export default {
  components: { myHeader },
  name: "pump",
  data() {
    return {
      arrowDownBlue,
      region: "",
      searchTxt: "",
      zoneList: [],
      tabId: 1,
      info: {},
      searchData: {
        pumpNm: "",
      },
      show: false,
      activeNames: ["1"],
      dataList: [],
      searchShow: false,
      loading: false,
      finished: false,
      immediate: false, //初始化不加载必须用变量
      pageNo: 1,
      pageSize: 10,
      total: 0,
      title: "",
      pumpNm: "",
      timer:null
    };
  },
  mounted() {
    this.getRegionTotal();
    this.getList();
  },
  watch: {
    searchTxt(newVal, oldVal) {
      console.log("首次观测");
      this.debounce(this.search, 1000)();
    },
  },
  methods: {
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
    getRegionTotal() {
      this.api.getApiUrl("/gs/pump/regionTotal").then((res) => {
        if (res.code === 200) {
          this.zoneList = res.data;
        }
      });
    },

    toShowMore(item, index) {
      item.showMore = !item.showMore;
    },
    toChoose(item) {
      if (this.tabId != item.id) {
        this.tabId = item.id;
        this.region = item.nm == "全部" ? "" : item.nm;
        this.finished = false;
        this.pageNo = 1;
        this.pageSize = 10;
        this.dataList = [];
        setTimeout(() => {
          this.getList();
        }, 1000);
      }
    },
    getGps() {
      this.$bridge.callHandler("h5_up_location", "", (res) => {
        let parse = JSON.parse(res);
        this.info.lng = parse.dlon;
        this.info.lat = parse.dlat;
      });
    },
    saveGps() {
      this.api.updPump(JSON.stringify(this.info)).then((res) => {
        Toast("修改成功");
      });
    },

    toNav(item) {
      let temp = {
        dlat: item.lat,
        dlon: item.lng,
        name: item.nm,
      };
      this.$bridge.callHandler("h5_baidumap", JSON.stringify(temp));
    },

    showImg(val) {
      ImagePreview([val]);
    },

    search() {
      this.searchShow = false;
      this.pageNo = 1;
      this.dataList = [];
      this.getList();
    },
    back() {
      this.until.back();
    },
    onLoad() {
      this.getList();
    },
    toDetail(item) {
      this.show = true;
      this.info = item;
      if (this.info.sxsffk === '1') {
        this.info.sxsffk = '分开'
      }
      if (this.info.sxsffk === '0') {
        this.info.sxsffk = '不分开'
      }
    },
    getList() {
      let qry = this.query.new();
      if (this.searchTxt) {
        this.query.toW(qry, "nm", this.searchTxt, "LK");
      }
      if (this.region) {
        this.query.toW(qry, "waterArea", this.region, "EQ");
      }
      this.query.toP(qry, this.pageNo, this.pageSize);
      this.query.toO(qry, "no", "asc");
      this.api
        .getPumpPage(encodeURIComponent(this.query.toJsonStr(qry)))
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
  },
  filters: {
    filter: function (val) {
      if (val === 0) {
        return "离线";
      } else if (val === 1) {
        return "在线";
      }
      return val;
    },
  },
};
</script>

<style lang="less" scoped>
.van-cell {
  line-height: normal;
  padding: 8px 16px;
}
.van-popup{
	overflow: visible;
	.van-cell-group{
		overflow: scroll;
		max-height: 100%;
	}
}

.van-list {
  margin-top: 0.15rem;
}

#container {
  min-height: 100vh;
  background: #f5f2f5;
}

.div-search {
  width: 100%;
  padding: 0.2rem 0rem;
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

.active {
  color: #1177b9 !important;
  border-bottom: 1 rpx solid #1177b9;
}

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
    width: 2rem;
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

      .van-button--info {
        color: #1989fa;
        background-color: #ffffff;
        border: 0px solid #1989fa;
      }
      .van-cell {
        line-height: normal;
        padding: 8px 16px;
      }

      span {
        // position: absolute;
        background: red;
        border-radius: 40%;
        padding: 0.09rem;
        color: #fff;
        height: 0.25rem;
        line-height: 0.25rem;
        // right: 0;
        // top: 50%;
        font-size: 0.22rem;
        text-align: center;
        min-width: 0.38rem;
        // transform: translate(100%, -50%);
      }
    }
  }
}

.listItem {
  background: #ffffff;
  border-radius: 0.1rem;
  margin: 0 auto 0.15rem;
  width: 96%;
  overflow: hidden;

  .itemTop {
    padding: 0.1rem 0;
    width: 95%;
    margin: 0.15rem auto;
    position: relative;
    .van-button--info {
      color: #1989fa;
      background-color: #ffffff;
      border: 0px solid #1989fa;
    }
    > div:first-of-type {
      display: flex;
      align-items: center;
      padding: 0.1rem 0;

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
    }

    img {
      width: 0.35rem;
      position: absolute;
      top: 0.1rem;
      right: 0.2rem;
    }

    .showMore {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* IE 9 */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg); /* Opera */
    }

    > p {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0.1rem 0;

      > span {
        width: 1.3rem;
        display: inline-block;
        flex-shrink: 0;
      }
    }
  }

  .itemContent {
    width: 95%;
    margin: 0 auto;
    border-top: 1px solid #e9e9e9;
    padding: 0.2rem 0;

    p {
      display: flex;
      align-items: center;
      padding: 0.1rem 0;

      > span {
        color: #909090;
        width: 1.3rem;
        display: inline-block;
        flex-shrink: 0;
      }
    }
  }
}
</style>

