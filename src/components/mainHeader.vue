<style lang="less" scoped>
    @import "../assets/css/mobile.less";
    .header{
        width: 100%;
    }
</style>
<style>
    .mint-header{
        width: 100%;
        background-color: #1177B9 !important;
    }
</style>
<template>
    <div class="header">
        <mt-header :title="title">
            <div slot="left"  @click="back">
                <mt-button icon="back"></mt-button>
            </div>

        </mt-header>
    </div>
</template>

<script>

  export default {
    props:{
        title:{
            type:String,
            default:''
        }
    },
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
        back(){
            this.until.back()
        }
    }
  }
</script>
