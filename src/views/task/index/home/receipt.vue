<template>
  <!--    接单-->
  <div class="main">
    <div class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了"
                @load="onLoad" :immediate-check="immediate">
        <div v-for="item in list" :key="item.id" class="listItem">
          <div class="itemTop">
            <div>{{ item.pumpNo }}<span></span>{{ item.pump }}<span></span>{{ item.administrativeDivision }}</div>
            <img :src="arrowDownBlue" :class="{ showMore:item.showMore}" @click.stop="toShowMore(item)"/>
          </div>
          <div style="margin-left: 10px;padding-bottom: 10px">
            <span>派单时间: {{ item.crtTm }}</span>
          </div>
          <div style="margin-left: 10px;padding-bottom: 10px">
            <span>问题类别: {{ item.fault }}</span>
          </div>
          <div style="margin-left: 10px;padding-bottom: 10px">
            <span>接单单位: {{ item.receivingNm }}</span>
          </div>
          <div style="margin-left: 10px;padding-bottom: 10px">
            <span>接单部门: {{ item.deptNm }}</span>
          </div>
          <div class="itemContent" @click="toDetail(item)" v-if="item.showMore==true">
            <p><span>工单编号：</span>{{ item.id }}</p>
            <p><span>工单来源：</span>{{ item.orderSource }}</p>
            <p><span>发生地址：</span>{{ item.occurrenceAddress }}</p>
            <p><span>处理时限：</span>{{ item.processingDeadline }}</p>
            <p><span>反映人：</span>{{ item.reflecting }}</p>
            <p><span>联系电话：</span>{{ item.reflectingPhone }}</p>
            <p><span>问题详情：</span>{{ item.problem }}</p>
            <p><span>派单部门：</span>{{ item.dispatchDepartment }}</p>
            <p><span>派单人：</span>{{ item.sendUser }}</p>
            <p><span>接单备注：</span>{{ item.remarks }}</p>
          </div>
        </div>
      </van-list>

    </div>

    <van-popup v-model="show" position="top" :style="{ height: '100%', width: '100%' }">
      <orderForm :id="detailId" :type="type" @closeInfo="closeInfo" v-if="show" @reLoad="reLoad"></orderForm>
    </van-popup>

  </div>
</template>

<script>
import orderForm from "../detail/orderForm";
import arrowDownBlue from "./img/down.png";

export default {
  name: "complete",
  components: {
    orderForm,
  },
  mounted() {
    this.getList()
  },
  filters: {
    statusFilter(val) {
      switch (val) {
        case 0:
          return '等待初次确认';
        case 1:
          return '等待接单';
        case 2:
          return '已接单';
        case 3:
          return '已处理，等待确认';
        case 4:
          return '完成';
        case 5:
          return '已回访';
        default:
      }
    }
  },
  methods: {
    toShowMore(item) {
      item.showMore = !item.showMore
    },
    acceptTask() {

    },
    closeInfo() {
      this.show = false;
      this.pageNo = 1;
      this.list = [];
      this.getList();

    },
    toDetail(item) {
      this.show = true;
      this.detailId = item.id
    },
    onLoad() {
      this.getList()
    },

    reLoad(){
      this.until.seSave('taskTab', "receipt");
      this.until.href('../task/index.html')
    },


    getList() {
      let qry = this.query.new();
      this.query.toO(qry, "crtTm", "desc");
      this.query.toW(qry, "status2", "2,1", "IN");
      this.query.toP(qry, this.pageNo, this.pageSize);
      this.api.getTaskOrder(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
        this.list.push(...res.data.list);
        this.list.forEach(item => {
          this.$set(item, 'showMore', false)
        })
        //  加载状态结束
        this.finished = this.list.length >= res.page.total;
        this.loading = false;
        this.pageNo++
        // 数据全部加载完成

      })
    }
  },
  data() {
    return {
      arrowDownBlue,

      type: 3,
      detailId: '',
      immediate: false,//初始化不加载必须用变量
      pageNo: 1,
      pageSize: 3,
      loading: false,
      finished: false,
      show: false,
      list: []
    }
  }
}
</script>

<style scoped lang="less">
.van-list {
  margin-top: 0.15rem;
}
.van-popup{
	.content2{
		overflow: scroll;
		max-height: 100%;
	}
}
.main {
  min-height: 100vh;
  background: #F5F2F5;
}

.listItem {
  background: #ffffff;
  border-radius: 0.1rem;
  margin: 0 auto 0.15rem;
  width: 96%;

  .itemTop {
    display: flex;
    position: relative;

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


  .itemContent {
    width: 95%;
    margin: 0 auto;
    border-top: 1px solid #E9E9E9;
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

/*
    内容区域
     */
.content {

  /*每一个循环块*/

  .block {
    font-size: 14px;
    background: white;
    border-bottom: 1px solid #F5F2F5;
    /*顺序为上右下左（顺时针）。*/
    padding: 0.3rem 0.4rem 0.3rem 0.4rem;
    position: relative;
    /*每一条数据
   */

    .item {
      padding-top: 0.13rem;
      padding-bottom: 0.13em;
      display: flex;
      /*左侧label*/

      span {
        flex: 4;
        color: #999999;
      }

      /*右侧内容*/

      p {
        flex: 14;
        color: #333333;

      }
    }

    /*箭头符号*/

    img {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
    }
  }
}

</style>
