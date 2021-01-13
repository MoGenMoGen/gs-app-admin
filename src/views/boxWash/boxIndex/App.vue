<template>
    <div id="container">
        <my-header title="水箱清洗" @back="back" > </my-header>
        <van-cell title="水箱清洗" icon="shop-o" center is-link style="height: 80px" @click="toPage(1)">
            <van-icon size="1rem" slot="icon"   :name="img"   style="line-height: inherit;margin-right: 20px"></van-icon>
        </van-cell>
        <van-cell class="van-hairline--bottom" title="有限空间审批" icon="shop-o"  @click="toPage(2)" center is-link style="height: 80px">
            <van-icon size="1rem" slot="icon"   :name="img2"   style="line-height: inherit;margin-right: 20px"></van-icon>
        </van-cell>


    </div>
</template>

<script>
    import img from '../../../assets/img/sx.png'
    import img2 from '../../../assets/img/sx2.png'
    import myHeader from "../../../components/myHeader/myHeader";
    export default {
        name: "boxIndex",
        data() {
            return {
                info: {},
                show: false,
                img:img,
                img2:img2,
            };
        },
        components: {img,img2,myHeader},
        mounted() {

        },
        methods: {
            toPage(val) {
                if (val === 1){
                    this.until.href("../boxWash/boxWash.html");
                }
                if (val === 2){
                    this.until.href("../boxWash/boxSpace.html");
                }

            },

            back() {
                this.until.back()
            },
        }
    };
</script>

<style lang="less" scoped>


    .van-cell {
        line-height: normal;

    }

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
</style>

