<style lang="less" scoped>
@import "../assets/css/mobile.less";
.tab {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  height: 0.8rem;
  align-items: center;
  background: #ffffff;
  padding-top: 0.1rem;
  border-top: 1px solid @borderColor;
  div {
    flex: 1;
    text-align: center;
    .img {
      display: flex;
      display: -webkit-flex;
      height: 0.4rem;
      margin-bottom: 0.05rem;
      img {
        margin: auto;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
    p {
      color: #999999;
    }
    p.active {
      color: @color;
    }
  }
}
</style>

<template>
  <div class="tab">
    <div v-for="item in list" @click="toPage(item.aHref)">
      <div class="img">
        <img :src="item.cd===cd ? item.imgA : item.img" />
      </div>
      <p :class="{active:item.cd===cd}">{{item.nm}}</p>
    </div>
  </div>
</template>

<script>
import home from "./img/home.png";
import homeA from "./img/homeA.png";
import map from "./img/map.png";
import mapA from "./img/map.png";
import msg from "./img/msg.png";
import msgA from "./img/msg.png";
import user from "./img/user.png";
import userA from "./img/userA.png";
export default {
  props: {
    cd: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: [
        {
          cd: "home",
          nm: "首页",
          imgA: homeA,
          img: home,
          aHref: "./index.html"
        },
        {
          cd: "map",
          nm: "地图",
          imgA: mapA,
          img: map,
          aHref: "./map.html"
        },
        {
          cd: "msg",
          nm: "消息",
          imgA: msgA,
          img: msg,
          aHref: "./msg.html"
        },
        {
          cd: "user",
          nm: "账号",
          imgA: userA,
          img: user,
          aHref: "./account.html"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    toPage(url) {
      this.until.href(url);
    }
  }
};
</script>