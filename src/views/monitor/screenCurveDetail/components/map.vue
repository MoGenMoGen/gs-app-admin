<style lang="less" scoped>
    @import "../../../../assets/css/mobile.less";
    .map{
        height: 90vh;
    }
    iframe{
        width: 100vw;
        height: 100%;
    }

</style>
<style>

</style>
<template>
    <div class="map">
        <iframe :src="url" frameborder="0" scrolling="auto" ></iframe>
    </div>

</template>

<script>
    import img from '../img/日期.png'
    export default {
        props:{
            url:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                img,
                // url:'http://api.map.baidu.com/marker?location=40.047669,116.313082&title=我的位置&content=百度奎科大厦&output=html&src=webapp.baidu.openAPIdemo   '
            }
        },
        mounted() {
            // this.url = 'http://www.baidu.com'
        },
        methods: {

        }
    }
</script>
