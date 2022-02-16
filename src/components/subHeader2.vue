<template>
<!--  子标题,用于新闻分类标题-->
    <div class="subHeader">
        <p>
          <span></span>
          <span>{{name}}</span>
        </p>
        <p>
<!-- 
          <span>更多</span>
          <img :src="icArrowRight"> -->
        </p>
    </div>
</template>

<script>
    export default {
        name: "subHeader",
        props:{
            name:{
                type:String,
                defalut:"标签"
            },
        },
        data(){
            return{
                icArrowRight:'https://hsyxxcx.oss-cn-hangzhou.aliyuncs.com/398115b10cc64945822063d9b7257d16.png',
            }
        },
        methods:{
            toDetail(){
                this.$emit('detail')
            }

        }
    }
</script>

<style scoped lang="less">
    .subHeader{
      background: white;
      border-top-left-radius: .10rem;
      border-top-right-radius: .10rem;
      padding: .30rem .20rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        display: flex;
        align-items: center;
      }
      p:nth-of-type(1){
        span:nth-of-type(1){
          height: .30rem;
          width: .10rem;
          margin-right: .15rem;
          display: block;
          background: #0B62B1;
        }
        span:nth-of-type(2){
          color: #303030;
          font-size: .30rem;
        }
      }
      p:nth-of-type(2){
        span{
          color: #909090;
          font-size: .24rem;
        }
        img{
          margin-left: .10rem;
          width: .13rem;
          height: .23rem;
        }
      }
    }
</style>
