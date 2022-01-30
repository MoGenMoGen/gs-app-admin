
<template>
  <div id="container">
<!--    <main-header :title="title"></main-header>-->
      <van-nav-bar fixed :title="title" @click-left="back" left-arrow >
      </van-nav-bar>
      <div style="height: 75px"></div>
    <div class="tab">
      <p v-for="(item,index) in tabList" :key="index" :class="{active:current==index}" @click="current=index">{{item}}</p>
    </div>
    <div class="main">
        <div class="img">
         <img :src="t1" style="width: 40%" />
          <img :src="bp1"  style="width: 4.38%"/>
          <img :src="rp2"  style="width: 4.9%"/>
          <img :src="yp3" style="width: 4.11%"/>
          <img :src="t2" style="width: 29.9%"/>
          <img :src="reds" style="width: 2.97%"/>
          <img :src="t3" style="width: 13.71%"/>
        </div>
      <ul>
        <li>进水压力：{{currentInfo.inPressure}}</li>
        <li>出水压力：{{currentInfo.outPressure}}</li>
        <li>浊度：{{currentInfo.turbidity}}</li>
        <li>余氯：{{currentInfo.residualChlorine}}</li>
        <li>设定压力：{{currentInfo.setPressure}}</li>
        <li></li>

        <li>1#运行频率：{{currentInfo.operatingFrequency1}}</li>
        <li>1#水泵振动：{{currentInfo.vibrate1}}</li>
        <li>2#运行频率：{{currentInfo.operatingFrequency2}}</li>
        <li>2#水泵振动：{{currentInfo.vibrate2}}</li>
        <li>3#运行频率：{{currentInfo.operatingFrequency3}}</li>
        <li>3#水泵振动：{{currentInfo.vibrate3}}</li>
        <li>4#运行频率：{{currentInfo.operatingFrequency4}}</li>
        <li>4#水泵振动：{{currentInfo.vibrate4}}</li>
        <li>1#泵体温度：{{currentInfo.temperatureP1}}</li>
        <li>1#运行电流：{{currentInfo.pumpCurrent1}}</li>
        <li>2#泵体温度：{{currentInfo.temperatureP2}}</li>
        <li>2#运行电流：{{currentInfo.pumpCurrent2}}</li>
        <li>3#泵体温度：{{currentInfo.temperatureP3}}</li>
        <li>3#运行电流：{{currentInfo.pumpCurrent3}}</li>
        <li>4#泵体温度：{{currentInfo.temperatureP4}}</li>
        <li>4#运行电流：{{currentInfo.pumpCurrent4}}</li>

        <li>泵房噪音：{{currentInfo.noise}}</li>
        <li>泵房积水水位：{{currentInfo.levelJ}}</li>
        <li>泵房温度：{{currentInfo.temperature}}</li>
        <li>泵房湿度：{{currentInfo.humidity}}</li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: "monitor",
  data() {
    return {
      current:-1,
      tabList:[],
      title: "泵房工艺",
      info: [],
      currentInfo:{},
      t1:'https://www.zjfld.net:6143/img/gy/t1.png',
      t2:'https://www.zjfld.net:6143/img/gy/t2.png',
      t3:'https://www.zjfld.net:6143/img/gy/t3.png',
      bp1:'https://www.zjfld.net:6143/img/gy/bp1.png',
      bp2:'https://www.zjfld.net:6143/img/gy/bp2.png',
      bp3:'https://www.zjfld.net:6143/img/gy/bp3.png',
      rp1:'https://www.zjfld.net:6143/img/gy/rp1.png',
      rp2:'https://www.zjfld.net:6143/img/gy/rp2.png',
      rp3:'https://www.zjfld.net:6143/img/gy/rp3.png',
      yp1:'https://www.zjfld.net:6143/img/gy/yp1.png',
      yp2:'https://www.zjfld.net:6143/img/gy/yp2.png',
      yp3:'https://www.zjfld.net:6143/img/gy/yp3.png',
      bs:'https://www.zjfld.net:6143/img/gy/bs.png',
      ys:'https://www.zjfld.net:6143/img/gy/ys.png',
      reds:'https://www.zjfld.net:6143/img/gy/reds.png',
        imgList:[this.t1,this.bp1,this.rp2,this.yp3,this.t2,this.reds,this.t3],
    };
  },
  components: {

  },
    watch:{
        current(){
            this.currentInfo = this.info[this.current];
        }
    },
  created() {},
  mounted() {


    this.title = this.until.getQueryString('nm');
    this.getInfo();

  },
  methods: {
      back() {
          this.until.back()
      },
    async getInfo() {
      const qry = new this.Query();
      qry.buildWhereClause("pumpNo", this.until.getQueryString('no'), "LK");
      const param = qry.getParam();

      const res = await this.api.getPumpTechnology(param);
      const list = res.data.list;
      list.forEach(item=>{
          this.tabList.push(item.nm)
          this.info.push(item)
      })
      if(this.tabList.length>0){
          this.current = 0
      }
    },


  }
};
</script>
<style lang="less">
    .van-nav-bar {
        z-index: 999;
        background-color: #1177B9 !important;
        height: 75px;
    }

    .van-nav-bar__title {
        color: white !important;
        margin-top: 35px;
    }

    .van-nav-bar .van-icon {
        color: white !important;
    }
    .van-nav-bar__left, .van-nav-bar__right{
        top:35px
    }
</style>
<style lang="less" scoped>
@import "../../../assets/css/mobile.less";
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
#container {
  width: 100%;
  background: @bgColor;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  .tab{
    width: 100%;
    background: #ffffff;
    padding: 0.2rem;
    display: flex;
    display: -webkit-flex;
    box-sizing: border-box;
    p{
      flex: 1;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      border: 1px solid #e4e4e4;
      border-right: 0;
      &:first-of-type{
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      &:last-of-type{
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        border-right: 1px solid #e4e4e4;
      }
    }
    .active{
      background: #32a028;
      color: #ffffff;
    }
  }
  .main{
    margin-top: 0.2rem;
    flex: 1;
    background: #ffffff;
      overflow: auto;
    .img{
      overflow: hidden;
      img{
        display: block;
        float: left;
      }
    }
    ul{
      margin: 0.2rem;
      li{
        width: 49%;
        line-height: 0.6rem;
        display: inline-block;
      }
    }
  }
}

</style>

