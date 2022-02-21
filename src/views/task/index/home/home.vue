<template>
  <!--    主页
0.1rem=10px
-->
  <div>
    <van-sticky>
      <my-header
        title="任务派单管理"
        @back="back"
        :add-status="true"
        @add="newTask"
        :searchStatus="false"
      ></my-header>
      <div class="search">
        <div @click="sourceShow = true">
          <p>
            {{ searchData.orderSource ? searchData.orderSource : "工单来源" }}
          </p>
          <img :src="arrowDown" />
        </div>
        <div @click="receiveShow = true">
          <p>
            {{ searchData.receivingNm ? searchData.receivingNm : "处理单位" }}
          </p>
          <img :src="arrowDown" />
        </div>
        <!-- <div @click="statusShow = true">
          <p>{{ searchData.status ? searchData.status : "工单状态" }}</p>
          <img :src="arrowDown" />
        </div> -->
      </div>
      <task-tab class="my-tabbar" ref="myTabber"></task-tab>
    </van-sticky>
    <!--工单来源搜索弹窗-->
    <van-popup
      v-model="sourceShow"
      position="bottom"
      :style="{ height: '40%' }"
      round
      close-icon="close"
    >
      <van-picker
        title="工单来源"
        show-toolbar
        :columns="sourceList"
        value-key="nm"
        @confirm="sourceConfirm"
        @cancel="sourceShow = false"
      />
    </van-popup>
    <!--处理单位搜索弹窗-->
    <van-popup
      v-model="receiveShow"
      position="bottom"
      :style="{ height: '40%' }"
      round
      close-icon="close"
    >
      <van-picker
        title="处理单位"
        show-toolbar
        :columns="receiveList"
        value-key="nm"
        @confirm="receiveConfirm"
        @cancel="receiveShow = false"
      />
    </van-popup>
    <!--工单状态搜索弹窗-->
    <van-popup
      v-model="statusShow"
      position="bottom"
      :style="{ height: '40%' }"
      round
      close-icon="close"
    >
      <van-picker
        title="工单状态"
        show-toolbar
        :columns="statusList"
        value-key="nm"
        @confirm="statusConfirm"
        @cancel="statusShow = false"
      />
    </van-popup>
<!--    <div style="height: 50px"></div>-->
    <router-view
      :orderSource="searchData.orderSource"
      :receivingNm="searchData.receivingNm"
    ></router-view>
  </div>
</template>

<script>
import taskTab from "../../../../components/taskTab/taskTab";
import myHeader from "../../../../components/myHeader/myHeader";
import arrowDown from "./img/arrowDown.png";

export default {
  mounted() {
    this.getSourceList();
    this.getDept();

    if (this.until.seGet("taskTab")) {
      this.$refs.myTabber.setSelect(this.until.seGet("taskTab"));
    } else {
      this.$refs.myTabber.setSelect("assign");
    }
  },
  name: "home",
  methods: {
    //返回
    back() {
      this.until.back();
    },
    //新建工单
    newTask() {
      this.until.href("./newTask.html");
    },
    //搜索
    search() {
      this.until.href("./search.html");
    },
    //工单来源
    getSourceList() {
      this.api.getDeptList(101).then((res) => {
        this.sourceList = res.data.list;
      });
    },
    //接单单位
    getDept() {
      this.api.getDeptList(3000).then((res) => {
        window.console.log("接单单位列表。。。。。");
        window.console.log(res);
        this.receiveList = res.data.list;
      });
    },
    //工单来源确定
    sourceConfirm(e) {
      console.log(e);
      this.searchData.orderSource = e.nm;
      this.sourceShow = false;
    },
    //处理单位确定
    receiveConfirm(e) {
      console.log(e);
      this.searchData.receivingNm = e.nm;
      this.receiveShow = false;
    },
    //工单状态确定
    statusConfirm(e) {
      this.searchData.status = e.status;
      this.statusShow = false;
    },
  },
  data() {
    return {
      title: "任务派单管理",
      arrowDown,
      sourceShow: false,
      receiveShow: false,
      statusShow: false,
      searchData: {
        orderSource: "",
        receivingNm: "",
        status: "",
      },
      sourceList: [],
      receiveList: [],
      statusList: [
        {
          status: 0,
          nm: "等待初次确认",
        },
        {
          status: 1,
          nm: "确认完成，等待接单",
        },
        {
          status: 2,
          nm: "已接单",
        },
        {
          status: 3,
          nm: "已处理，等待确认",
        },
        {
          status: 4,
          nm: "完成",
        },
        {
          status: 5,
          nm: "已回访",
        },
      ],
    };
  },
  components: {
    taskTab,
    myHeader,
  },
};
</script>

<style scoped lang="less">
	
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f5f2f5;
  padding: 0.15rem 2%;
  box-sizing: border-box;
  > div {
    display: flex;
    align-items: center;
    border: 1px solid #d5d5d5;
    height: 0.48rem;
    border-radius: 0.24rem;
    background: #ffffff;
    width: 50%;
    p,
    input {
      // flex: 1;
      border: 0;
      text-indent: 0.2rem;
      background: transparent;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
.right {
  /*button{*/
  /*    color: white;*/
  /*    background: none;*/
  /*    border: 1px solid white;*/
  /*    font-size: 0.07rem;*/
  /*    padding-left: 0.15rem;*/
  /*    padding-right: 0.15rem;*/
  /*    padding-top: 0.05rem;*/
  /*    padding-bottom: 0.05rem;*/
  /*    border-radius: 3px;*/
  /*}*/
  /*img{*/
  /*    width: 0.4rem;*/
  /*    height: 0.4rem;*/
  /*    margin-left: 0.3rem;*/
  /*}*/
}

/*.tabbar-place{*/
/*    width: 100%;*/
/*    height: 60px;*/
/*    background: red;*/
/*}*/
</style>

