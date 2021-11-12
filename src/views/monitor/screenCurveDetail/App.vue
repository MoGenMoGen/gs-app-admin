<template>
    <div id="container">
        <van-sticky>
            <my-header :title="title" @back="back"  :searchStatus="false"> </my-header>
        </van-sticky>
        <div class="main">
            <!--实时-->
            <real-time v-if="activeId==1"></real-time>
            <!--报表-->
            <report-form v-if="activeId==2"></report-form>
            <!--报警-->
            <alarm v-if="activeId==3"></alarm>
            <!--地图-->
            <my-map v-if="activeId==4"></my-map>
        </div>
        <div class="tab">
            <p @click="activeId = item.id" v-for="item in tabList" :key="item.id" :class="{active:item.id==activeId}">
                <img :src="item.id==activeId ? item.imgActive : item.img"/>{{item.nm}}
            </p>
        </div>
    </div>
</template>

<script>

    import myHeader from "../../../components/myHeader/myHeader";
    import echartsShow from "../components/echartsShow";

    import realTime from "./components/realTime";
    import reportForm from "./components/reportForm";
    import alarm from "./components/alarm";
    import myMap from "./components/map";

    import tab1 from './img/实时-灰.png'
    import tab1Blue from './img/实时.png'
    import tab2 from './img/报表-灰.png'
    import tab2Blue from './img/报表.png'
    import tab3 from './img/报警-灰.png'
    import tab3Blue from './img/报警.png'
    import tab4 from './img/地图-灰.png'
    import tab4Blue from './img/地图.png'
    export default {
        components: {
            myHeader,
            echartsShow,
            realTime,
            reportForm,
            alarm,
            myMap
        },
        name: "monitor",
        data() {
            return {
                title:'泵房监控',
                info: {},
                activeId:1,
                tabList:[{
                    nm:'实时',
                    id:1,
                    img:tab1,
                    imgActive:tab1Blue
                },{
                    nm:'报表',
                    id:2,
                    img:tab2,
                    imgActive:tab2Blue
                },{
                    nm:'报警',
                    id:3,
                    img:tab3,
                    imgActive:tab3Blue
                },{
                    nm:'地图',
                    id:4,
                    img:tab4,
                    imgActive:tab4Blue
                }]
            };
        },
        mounted() {
        },
        methods: {
            back() {
                this.until.back()
            },
        },
        filters: {
            filter: function (val) {
                if (val === 0) {
                    return '离线'
                } else if (val === 1) {
                    return '在线'
                }
                return val
            }
        },
    };
</script>

<style lang="less" scoped>
    #container{
        background: #F5F2F5;
        min-height: 100%;
        .main{}
        padding-bottom: 1.2rem;
    }
    .tab{
        display: flex;
        align-items: center;
        position: fixed;
        width: 100vw;
        height: 1rem;
        bottom: 0;
        left: 0;
        z-index: 10;
        background: #ffffff;
        p{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #999999;
            img{
                width: 0.4rem;
                margin-bottom: 0.05rem;
            }
        }
        p.active{
            color: #106FB8;
            font-weight: bold;
        }
    }
</style>

