<template>
  <div id="container">
<!--    <my-header></my-header>-->
    <div class='top-header'> </div>

<!--    <van-nav-bar  :placeholder="true">-->
<!--      <slot slot="title"  name="title">-->
<!--        <span style="color: white;font-size: 15px">地图</span>-->
<!--      </slot>-->

<!--    </van-nav-bar>-->
    <van-search   background="#1177B9"  shape="round"  @input="searchPump" @focus="show = true"  show-action
                  @cancel="onCancel" v-model="value" placeholder="请输入泵房名称" />


    <van-popup style="margin-top: 74px" :overlay="false" v-model="show" position="top" :style="{ height: '100%' }">
      <van-empty image="search" description="输入泵房名称" v-if="list.length === 0"></van-empty>
      <div v-for="(item,index) in list" :key="index">
        <van-cell-group>
          <div  @click="toPumpInfo(item)">
            <van-field label="泵房编号:" v-model="item.no" readonly :border="false"></van-field>
            <van-field label="泵房名称:" v-model="item.nm" readonly :border="false"></van-field>
            <van-field label="小区名称:" v-model="item.estateNm" readonly :border="false"></van-field>
            <van-field label="分区楼层:" v-model="item.partitionFloor" readonly :border="false"></van-field>
            <van-field label="分区情况:" v-model="item.partitionSituation" readonly :border="false"></van-field>
            <van-field label="供水模式:" v-model="item.arg2" readonly :border="false"></van-field>
            <van-field label="物业电话:" v-model="item.propertyPhone" readonly :border="false"></van-field>
          </div>
          <van-button block style="height: 5px" color="#F3F3F3"></van-button>
        </van-cell-group>
      </div>
    </van-popup>


    <div class="main">
      <baidu-map class="map" :center="center" :scroll-wheel-zoom="true" :zoom="zoom">
        <!--点位 :icon="{url: 'https://www.zjfld.net:6143/img/map/bf32.png', size: {width: 32, height: 32}}"-->
        <bml-marker-clusterer :averageCenter="true">
          <bm-marker v-for="marker of markers" :position="{lng: marker.lng, lat: marker.lat}" :key="marker.id" >


          </bm-marker>
        </bml-marker-clusterer>


      </baidu-map>



    </div>
    <van-cell v-if="pumpShow" center :title="pumpInfo.nm"  :label="pumpInfo.pumpLocation" />

    <van-cell v-if="pumpShow" title="去导航" @click="toNav" icon="location-o" is-link />

    <tab cd="map"></tab>
  </div>
</template>

<script>
import Vue from "vue";
import BaiduMap from "vue-baidu-map";
import {BmlLushu, BmlMarkerClusterer, BmlCurveLine} from "vue-baidu-map";

Vue.use(BaiduMap, {
  ak: "hKosSsrAcdMkt2lcjYkwLrDA83qfoBvk"
});

import {Toast} from 'vant';

export default {
  components: {BmlCurveLine, BmlLushu, BmlMarkerClusterer},
  data() {
    return {
      markers: [],
      pumpList: [],
      zoom: 12,
      show: false,
      list:'',
      value:'',
      center: {
        lng: '121.5566711543',
        lat: '29.8802067266'
      },
      pumpInfo:{},
      pumpShow:false
    };
  },
  mounted() {
    this.getPump();

  },
  methods: {
    toNav(){
      let temp = {
        dlat: this.pumpInfo.lat,
        dlon: this.pumpInfo.lng,
        name: this.pumpInfo.nm,
      };
      this.$bridge.callHandler('h5_baidumap', JSON.stringify(temp),res=>{
        console.log("返回的结果。。")
      })
    },

    toPumpInfo(val) {
      this.pumpInfo = val

      // this.markers = []
      this.zoom = 24
      this.center.lng = val.lng
      this.center.lat = val.lat
      // let mk = {lng: val.lng, lat: val.lat, pumpNo: val.no, pumpNm: val.nm, pumpId: val.id};
      // this.markers.push(mk)

      this.show=false
      this.pumpShow = true
    },
    loading(){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
    },


    onCancel(){

      //this.loading()
      this.pumpShow = false
      this.show=false
      this.zoom = 12
      this.center.lng = '121.5566711543'
      this.center.lat = '29.8802067266'

    },

    searchPump(val) {
      if (val.length !== 0){
        let qry = this.query.new();
        this.query.toW(qry, "nm", this.value, "LK");
        this.api.getPumpPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
          if (res.code === 200) {
            this.list = res.data.list;

          }
        })

      }

    },
    //获取泵房列表
    getPump() {
      let qry = this.query.new();
      this.api.getPumpList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
        if (res.code === 200) {
          let list = res.data.list;
          this.pumpList = res.data.list;
          for (let i = 0; i < list.length; i++) {
            let mk = {lng: list[i].lng, lat: list[i].lat, pumpNo: list[i].no, pumpNm: list[i].nm, pumpId: list[i].id};
            this.markers.push(mk)
          }
        }
      })

    }

  },

};
</script>

<style scoped lang="less">
@import "../../../assets/css/mobile.less";
/* 地图容器必须设置宽和高属性 */
.map {
  width: 100%;
  height: calc(100%);
}
.top-header{
  height: 0.5rem;
  width: 100%;
  background: #1177B9;
}
.van-nav-bar {
  height: 54px;
  background: #1177B9;
}

.van-nav-bar__title {
  max-width: 70%;
  margin: 0 auto;
  color: #323233;
  font-weight: 500;
  font-size: 16px;
}
#container {
  width: 100%;
  background: @bgColor;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
}

.main {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .title {
    background: #fafcfe;
    height: 0.8rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    border-bottom: 1px solid @borderColor;
    border-top: 1px solid @borderColor;
    color: #303030;
    font-weight: bold;
    font-size: 1.1em;

    img {
      width: 0.12rem;
      margin-left: 0.3rem;
      margin-right: 0.2rem;
    }
  }

  > section {
    overflow: hidden;
    background: #ffffff;
    border-bottom: 1px solid @borderColor;
    margin-bottom: 0.2rem;

    .title {
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .item {
      width: 25%;
      float: left;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 0.5rem;

      .img {
        width: 0.5rem;
        height: 0.5rem;
        display: flex;
        display: -webkit-flex;
        margin-bottom: 0.2rem;

        img {
          margin: auto;
          width: auto;
          height: auto;
          max-height: 100%;
          max-width: 100%;
        }
      }
    }
  }
}
</style>
