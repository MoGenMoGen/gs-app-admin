<template>
    <div id="container">
        <my-header></my-header>
        <div class="main">
            <baidu-map class="map" :center="center" :scroll-wheel-zoom="true" :zoom="zoom">
                <!--点位-->
                <bml-marker-clusterer :averageCenter="true">
                    <bm-marker v-for="marker of markers" :position="{lng: marker.lng, lat: marker.lat}" :key="marker.id"
                               @click="toPumpInfo(marker)"
                               :icon="{url: 'https://www.zjfld.net:6143/img/map/bf32.png', size: {width: 32, height: 32}}">
                    </bm-marker>
                </bml-marker-clusterer>


            </baidu-map>
        </div>
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

    // import {Toast} from 'vant';

    export default {
        components: {BmlCurveLine, BmlLushu, BmlMarkerClusterer},
        data() {
            return {
                markers: [],
                pumpList: [],
                zoom: 12,
                center: {
                    lng: '121.5566711543',
                    lat: '29.8802067266'
                },
            };
        },
        mounted() {
            this.getPump();

        },
        methods: {
            toPumpInfo(val){

            },
            //获取泵房列表
            getPump() {
                let qry = this.query.new();
                this.api.getPumpList(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        let list = res.data.list;
                        this.pumpList = res.data.list;
                         for (let i = 0; i < list.length; i++) {
                             let mk = {lng: list[i].lng, lat: list[i].lat , pumpNo:list[i].no,pumpNm:list[i].nm,pumpId:list[i].id};
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
