<template>
  <div class="tabberWarp">

    <div class="tab">
      <ul>
        <li v-for="item in tabbarDes" :key="item.page" @click="selected=item.page">
          <p :class="{ active: selected == item.page }">
            {{ item.txt }}
              <span :class="{actice_border: selected == item.page }"></span>
          </p>
          <van-tag class="span" round type="danger">{{ item.total }}</van-tag>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
export default {
  name: "taskTab",
  data() {
    return {
      selected: '',//默认选中第一个tab
      tabbarDes: [
        {
          id: 1,
          txt: '工单指派',
          page: 'assign',
          total: 0
        },
        {
          id: 2,
          txt: '工单确认',
          page: 'confirm',
          total: 0
        },
        {
          id: 3,
          txt: '完成工单',
          page: 'complete',
          total: 0
        },
        {
          id: 4,
          txt: '工单接单',
          page: 'receipt',
          total: 0
        },

      ]
    }
  },
  watch: {
    selected(newVal) {
      this.$router.replace({
        path: '/' + newVal,
      });
    }
  },
  mounted() {
    this.getTotal()
  },
  methods: {
    getTotal() {

      for (let i = 0; i < this.tabbarDes.length; i++) {
        let tabbarDe = this.tabbarDes[i];
        let qry = this.query.new();
        //工单指派
        if (tabbarDe.id == 1) {

          this.query.toW(qry, "status", "2,1", "IN");
        }
        //完成工单
        if (tabbarDe.id == 3){
          this.query.toW(qry, "status", "4,5", "IN");
        }
        //工单接单
        if (tabbarDe.id == 4){
          this.query.toW(qry, "status2", "2,1", "IN");
        }
        if (tabbarDe.id == 1|| tabbarDe.id == 3 || tabbarDe.id == 4){
          this.query.toP(qry, 1, 1);
          this.api.getTaskOrder(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
            this.tabbarDes[i].total = res.page.total
          })
        }
        if (tabbarDe.id == 2){
          this.query.toP(qry, 1, 999);
          this.api.getTaskOrder2(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
            this.tabbarDes[i].total = res.list.length
          })
        }

      }


      // this.tabbarDes.map(res => {
      //   let qry = this.query.new();
      //   //工单指派
      //   if (res.id == 1) {
      //
      //     this.query.toW(qry, "status", "2,1", "IN");
      //   }
      //   //完成工单
      //   if (res.id == 3){
      //     this.query.toW(qry, "status", "4,5", "IN");
      //   }
      //   //工单接单
      //   if (res.id == 4){
      //     this.query.toW(qry, "status2", "2,1", "IN");
      //   }
      //   if (res.id == 1|| res.id == 3 || res.id == 4){
      //     this.query.toP(qry, 1, 1);
      //     this.api.getTaskOrder(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
      //       res.total = res.page.total
      //     })
      //   }
      //   if (res.id == 2){
      //     this.query.toP(qry, 1, 999);
      //     this.api.getTaskOrder2(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
      //       res.total = res.list.length
      //     })
      //   }
      // })
    },

    setSelect(s) {
      this.selected = s
    }

  }
}
</script>

<style scoped lang="less">
.tabberWarp {
  //position: fixed;
  //z-index: 600;
  //height: 50px;
  //background: #fff;
  //display: flex;
  //align-items: center;
  //justify-content: space-around;
  ////border-bottom: 1px solid #DAD7DB;
  //color: #999999;
  //width: 100%;
  //
  //div {
  //  //height: 100%;
  //  //flex-grow: 1;
  //  //display: flex;
  //  //align-items: center;
  //  //justify-content: center;
  //  //flex-direction: column;
  //  //
  //  //font-size: 0.32rem;
  //}

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
      margin: 0 0.15rem;
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

      .span {
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

.active {
    color: #1177b9;
    position: relative;
    // border-bottom: 1rpx solid #1177b9;
    .actice_border {
      display: inline-block;
      position: absolute;
      bottom: 0.04rem;
      left: 0;
      // transform: translateX(-50%);
      width: 100%;
      height: 0.06rem;
      background: #1177b9;
      opacity: 1;
      border-radius: 0.06rem;
    }
  }
</style>
