<template>
  <div class="monitorList">
    <div class="list" v-for="(item,index) in list" :key="index">
      <div class="nm">
        <p @click="videoPlay(item.cameraUuid)" v-if="canPlayer">{{item.cameraName}}</p>
        <p v-else>{{item.pumpNm+item.nm}}</p>
        <span>{{item.datetimes}}</span>
        <span class="iconfont" v-if="canPlayer"></span>
        <span class="iconfont" v-else @click="toCheck(index)">&#xe822;</span>
      </div>
      <!-- 默认展示的明细数据 -->
      <div class="data">
        <div v-for="(v,ii) in item.dataList" :key="ii*(ii+1)">
          <p>{{v.key}}：{{v.value}}</p>
        </div>
      </div>
      <!-- 默认隐藏的明细数据 -->
      <div class="data">
        <div v-for="(v,i) in item.list" :key="i+1" v-if="item.check">
          <p>{{v.key}}：{{v.value}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    canPlayer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toCheck(index) {
      if (this.list[index].check) {
        this.list[index].check = false;
      } else {
        this.list.forEach((item, i) => {
          if (item.check) {
            item.check = false;
            this.$set(this.list, i, this.list[i]);
          }
        });
        this.list[index].check = true;
      }
      this.$set(this.list, index, this.list[index]);
    },
    videoPlay(uuid) {
      this.$emit("videoPlay", uuid);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/mobile.less";
.monitorList {
  width: 100%;
  .list {
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    padding: 0 0.3rem 0.2rem;
    background: #ffffff;
  }
  .nm {
    border-bottom: 1px dashed @borderColor;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    height: 1rem;
    margin-bottom: 0.2rem;
    p {
      flex: 1;
      color: @color;
      font-size: 1.2em;
    }
    span:first-of-type {
      margin-right: 0.4rem;
    }
  }
  .data {
    width: 100%;
    overflow: hidden;
    line-height: 0.6rem;
    > div {
      width: 50%;
      float: left;
    }
  }
}
</style>