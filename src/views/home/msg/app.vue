<template>
    <div id="container">
        <my-header title="我的消息" :search-status="false" :showLeft="false"></my-header>
        <div class="main">

        </div>
        <tab cd="msg"></tab>
    </div>
</template>

<script>
    import Vue from "vue";
    import myHeader from "../../../components/myHeader/myHeader";

    // import {Toast} from 'vant';

    export default {

        data() {
            return {

            };
        },
        mounted() {


        },
        methods: {

        },
        components:{
            myHeader
        }

    };
</script>

<style scoped lang="less">
    @import "../../../assets/css/mobile.less";

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
    }
</style>
