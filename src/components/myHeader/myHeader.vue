<template>
    <div class="myHeader">
        <div class='top-header'> </div>
        <van-nav-bar  :placeholder="true">
            <slot slot="title"  name="title">
                <span style="color: white">{{title}}</span>
            </slot>
            <slot slot="left"  name="left">
                <van-icon  name="arrow-left" color="#ffffff" size="25" @click="back"></van-icon>
            </slot>
            <slot slot="right"  name="right">
                <van-icon v-if="addStatus" style="margin-right: 20px"  name="plus" color="#ffffff" size="25" @click="add"></van-icon>
                <van-icon v-if="searchStatus"  name="search" color="#ffffff" size="25" @click="search"></van-icon>
            </slot>
        </van-nav-bar>

    </div>
</template>
<script>
export default {
  name: 'wt-header',
  props: {
      title: {
          type: String,
          default: () => {
              return '';
          }
      },
      addStatus:{
          type: Boolean,
          default: false
      },
      searchStatus:{
          type: Boolean,
          default: true
      },
      showLeft:{
          type: Boolean,
          default: true
      }
  },
  data () {
    return {
    };
  },
  methods: {
      back(){
          this.$emit('back')
      },
      search(){
          this.$emit('search')
      },
      add(){
          this.$emit('add')
      }
  }
};
</script>
<style lang='less'  >
    /*.myHeader{*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
    /*}*/
    .top-header{
        height: 0.5rem;
        width: 100%;
        background: #1177B9;
    }
    .van-nav-bar {
        height: 54px !important;
        background: #1177B9;
    }

    .van-nav-bar__title {
        max-width: 70%;
        margin: 0 auto;
        margin-top:0px !important;  
        color: #323233;
        font-weight: 500;
        font-size: 16px;
    }
    /*透明状态栏占位*/
    /*.top-header2{*/
    /*    z-index: 100;*/
    /*    height: 0.4rem;*/
    /*    position: fixed;*/
    /*    top:0;*/
    /*    width: 100%;*/
    /*    background: #106FB8;*/
    /*}*/
</style>
