<template>
  <div id="container">
    <!-- <div class="myTop"> -->
    <van-sticky>
      <my-header title="设备保养" @back="back" :searchStatus="false">
      </my-header>
    </van-sticky>

    <!-- </div> -->
    <div class="search">
      <div>
        <input
          placeholder="保养单位"
          v-model="searchData.unitNm"
          @input="search"
        />
      </div>
      <div>
        <input
          placeholder="泵房编号"
          v-model="searchData.pumpNo"
          @input="search"
        />
      </div>
      <div>
        <input
          placeholder="泵房名称"
          v-model="searchData.estateNm"
          @input="search"
        />
      </div>
    </div>
    <van-tabs v-model="active" color="#1177B9" @change="tabChange">
      <van-tab v-for="item in tabList" :key="item.name">
        <template #title>
          {{ item.name }}<van-badge :content="item.total"
        /></template>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="immediate"
        >
          <div
            v-for="item in dataList"
            :key="item.id"
            @click="toDetail(item)"
            class="listItem"
          >
            <div class="itemTop">
              <div>
                {{ item.pumpNo }}<span></span>{{ item.pumpNm }}<span></span
                >{{ item.region }}
              </div>
              <p>
                <span>保养时间：</span>{{ item.planTm }} 至 {{ item.plan2Tm }}
              </p>
              <p><span>保养单位：</span>{{ item.unitNm }}</p>
            </div>
            <!--<div  style="margin-left: 10px;padding-bottom: 10px">-->
            <!--<span style="font-size: 10px;">计划保养开始日期:{{item.planTm}}</span>-->
            <!--</div>-->

            <!--<div class="itemContent">-->
            <!--<p><span>计划保养结束日期：</span>{{item.plan2Tm}}</p>-->
            <!--<p><span>保养单位：</span>{{item.unitNm}}</p>-->
            <!--</div>-->
            <!--<van-cell-group>-->
            <!--<van-field label="保养单位:" v-model="item.unitNm" readonly :border="false" label-width="140"></van-field>-->
            <!--<van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false" label-width="140"></van-field>-->
            <!--<van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false" label-width="140"></van-field>-->
            <!--<van-field label="供水区域:" v-model="item.zoning" readonly :border="false" label-width="140" right-icon="arrow"></van-field>-->
            <!--<van-field label="计划保养开始日期:" v-model="item.planTm" readonly :border="false" label-width="140"></van-field>-->
            <!--<van-field label="计划保养结束日期:" v-model="item.plan2Tm" readonly :border="false" label-width="140"></van-field>-->
            <!--<van-button block style="height: 5px" color="#F3F3F3"></van-button>-->
            <!--</van-cell-group>-->
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <!--详情弹窗-->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '80%' }"
      closeable
      round
      close-icon="close"
    >
      <!--            <van-nav-bar  title="保养详情"  left-arrow  @click-left="show = false"></van-nav-bar>-->
      <van-cell-group style="margin-top: 50px">
        <van-field
          label="保养单位:"
          v-model="info.unitNm"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="泵房编号:"
          v-model="info.pumpNo"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="泵房名称:"
          v-model="info.estateNm"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="供水模式:"
          v-model="info.zoning"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="设备套数:"
          v-model="info.deviceNum"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="计划保养开始日期:"
          v-model="info.planTm"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="计划保养结束日期:"
          v-model="info.plan2Tm"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="保养人姓名:"
          v-model="info.user"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="保养完成情况:"
          v-model="info.status"
          readonly
          label-width="140"
        ></van-field>
        <van-field
          label="任务结束时间:"
          v-model="info.taskTm"
          readonly
          label-width="140"
        ></van-field>
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
          label="保养单位:"
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
          v-model="searchData.estateNm"
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
export default {
  name: "maintain",
  data() {
    return {
      info: {},
      show: false,
      searchShow: false,
      searchData: {
        unitNm: "",
        pumpNo: "",
        estateNm: "",
      },
      tabList: [
        {
          name: "待保养",
          total: 0,
        },
        {
          name: "已保养",
          total: 0,
        },
        {
          name: "逾期",
          total: 0,
        },
      ],
      tabIndex: 0,
      searchText: "",
      active: "",
      loading: false,
      pageNo: 1,
      pageSize: 10,
      dataList: [],
      immediate: false, //初始化不加载必须用变量
      finished: false,
    };
  },
  components: { myHeader },
  mounted() {
    this.getTotal();
    this.getList();
  },
  methods: {
    getTotal() {
      this.tabList.forEach((item) => {
        let qry = this.query.new();
        this.query.toW(qry, "status", item.name, "EQ");
        this.query.toP(qry, 1, 1);
        this.api
          .getMaintainTask(encodeURIComponent(this.query.toJsonStr(qry)))
          .then((res) => {
            if (res.code === 200) {
              // 加载状态结束
              item.total = res.page.total;
            }
          });
      });
    },
    search() {
      //   this.searchShow = false;
      this.pageNo = 1;
      this.dataList = [];
      this.getList();
    },
    toDetail(item) {
      this.until.href(`./maintainDtl.html?id=${item.id}&tabId=${this.tabIndex}`);
      //   this.show = true;
      //   this.info = item;
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
    getList() {
      let qry = this.query.new();
      if (this.searchData.estateNm) {
        this.query.toW(qry, "estateNm", this.searchData.estateNm, "LK");
      }
      if (this.searchData.pumpNo) {
        this.query.toW(qry, "pumpNo", this.searchData.pumpNo, "LK");
      }
      if (this.searchData.unitNm) {
        this.query.toW(qry, "unitNm", this.searchData.unitNm, "LK");
      }
      if (this.tabIndex === 0) {
        this.query.toW(qry, "status", "待保养", "EQ");
      }
      if (this.tabIndex === 1) {
        this.query.toW(qry, "status", "已保养", "EQ");
      }
      if (this.tabIndex === 2) {
        this.query.toW(qry, "status", "逾期", "EQ");
      }
      this.query.toP(qry, this.pageNo, this.pageSize);
      this.query.toO(qry, "crtTm", "desc");
      this.api
        .getMaintainTask(encodeURIComponent(this.query.toJsonStr(qry)))
        .then((res) => {
          if (res.code === 200) {
            this.dataList.push(...res.data.list);
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
#container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #f5f2f5;
    padding: 0.25rem 2%;
    box-sizing: border-box;
    > div {
      display: flex;
      align-items: center;
      border: 1px solid #d5d5d5;
      height: 0.48rem;
      border-radius: 0.24rem;
      background: #ffffff;
      width: 33.3%;
      p,
      input {
        // flex: 1;
        border: 0;
        text-indent: 0.2rem;
        background: transparent;
        width: 100%;
      }
      img {
        margin-right: 0.18rem;
        width: 0.28rem;
      }
      // &:not(:last-of-type) {
      //   width: 50%;
      //   img {
      //     width: 0.2rem;
      //   }
      // }
      // &:last-of-type {
      //   width: 50%;
      //   input {
      //     background: transparent;
      //     width: 90%;
      //   }
      //   img {
      //     width: 0.28rem;
      //   }
      // }
    }
  }
  .van-tabs::v-deep {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .van-tabs__content {
      //   margin-top: 10px;
      flex: 1;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
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
#container {
  min-height: 100vh;
  background: #f5f2f5;
}
.listItem {
  background: #ffffff;
  border-radius: 0.1rem;
  margin: 0 auto 0.15rem;
  width: 96%;
  .itemTop {
    padding: 0.1rem 0;
    width: 95%;
    margin: 0.15rem auto;
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
        width: 2rem;
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

