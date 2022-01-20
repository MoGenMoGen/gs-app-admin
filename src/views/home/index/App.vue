<style lang="less" scoped>
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

<template>
    <div id="container">
        <my-header></my-header>
        <div class="main">
            <section>
                <div class="title">
                    <img :src="titleImg"/>综合监控
                </div>
                <div class="item" v-for="item in monitor" @click="toPage(item.aHref)">
                    <div class="img">
                        <img :src="item.img"/>
                    </div>
                    <p>{{item.nm}}</p>
                </div>
            </section>
            <section>
                <div class="title">
                    <img :src="titleImg"/>业务管理
                </div>
                <div class="item" v-for="item in business" @click="toPage(item.aHref)">
                    <div class="img">
                        <img :src="item.img"/>
                    </div>
                    <p>{{item.nm}}</p>
                </div>
            </section>
            <section>
                <div class="title">
                    <img :src="titleImg"/>任务派单
                </div>
                <div class="item" v-for="item in mission" @click="toTask(item.aHref)">
                    <div class="img">
                        <img :src="item.img"/>
                    </div>
                    <p>{{item.nm}}</p>
                </div>
            </section>
            <section>
                <div class="title">
                    <img :src="titleImg"/>应急救援
                </div>
                <div class="item" v-for="item in rescue" @click="toPage(item.aHref)">
                    <div class="img">
                        <img :src="item.img"/>
                    </div>
                    <p>{{item.nm}}</p>
                </div>
            </section>
        </div>
        <tab cd="home"></tab>
    </div>
</template>

<script>
    import titleImg from "./img/titleImg.png";
    import monitor1 from "./img/11.png";
    import monitor2 from "./img/12.png";
    import monitor3 from "./img/13.png";
    import monitor4 from "./img/14.png";
    import monitor5 from "./img/15.png";
    import monitor6 from "./img/16.png";
    import monitor7 from "./img/17.png";
    import monitor8 from "./img/18.png";
    import monitor9 from "./img/19.png";
    import monitor10 from "./img/110.png";
    import monitor11 from "./img/111.png";
    import monitor12 from "./img/112.png";
    import business1 from "./img/21.png";
    import business2 from "./img/22.png";
    import business3 from "./img/23.png";
    import business4 from "./img/24.png";
    import business5 from "./img/25.png";
    import business6 from "./img/26.png";
    import business7 from "./img/27.png";
    import mission1 from "./img/31.png";
    import mission2 from "./img/32.png";
    import mission3 from "./img/33.png";
    import mission4 from "./img/44.png";

    import rescue1 from "./img/41.png";
    import rescue2 from "./img/42.png";

    export default {
        data() {
            return {
                titleImg,
                load: false,
                title: "二次供水加压泵站验收表",
                monitor: [
                    {
                        nm: "泵房监控",
                        img: monitor6,
                        aHref: "../monitor/screenCurve.html"
                    },
                    // {
                    //     nm: "泵房监控",
                    //     img: monitor1,
                    //     aHref: "../monitor/pump.html"
                    // },
                    {
                        nm: "视频监控",
                        img: monitor2,
                        aHref: "../monitor/video.html"
                    },
                    {
                        nm: "门禁监控",
                        img: monitor3,
                        aHref: "../door/door.html"
                    },
                    {
                        nm: "环境监控",
                        img: monitor4,
                        aHref: "../ambient/ambient.html"
                    },
                    {
                        nm: "水质监控",
                        img: monitor5,
                        aHref: "../waterQuality/waterQuality.html"
                    },

                    {
                        nm: "泵房工艺",
                        img: monitor7,
                        aHref: "../monitor/pumpTechnology.html"
                    },
                    {
                        nm: "能耗管理",
                        img: monitor8,
                        aHref: "../energyDepletion/energyDepletion.html"
                    },
                    {
                        nm: "水箱调峰",
                        img: monitor9,
                        aHref: ""
                    },
                    {
                        nm: "电子巡检",
                        img: monitor10,
                        aHref: ""
                    },
                    // {
                    //     nm: "生产报表",
                    //     img: monitor11,
                    //     aHref: "../productionReport/productionReport.html"
                    // },
                    {
                        nm: "报警信息",
                        img: monitor12,
                        aHref: "../monitor/alarm.html"
                    }
                ],
                business: [
                    {
                        nm: "前期验收",
                        img: business1,
                        aHref: "../accept/accept.html"
                    },
                    {
                        nm: "泵房档案",
                        img: business2,
                        aHref: "../pump/pump.html"
                    },
                    {
                        nm: "设备信息",
                        img: business3,
                        aHref: "../deviceInfo/deviceInfo.html"
                    },
                    // {
                    //     nm: "设备巡检",
                    //     img: business4,
                    //     aHref: "../detection/detection.html"
                    // },
                    {
                        nm: "设备保养",
                        img: business5,
                        aHref: "../maintain/maintain.html"
                    },
                    {
                        nm: "设备维修",
                        img: business6,
                        aHref: "../repair/repair.html"
                    },
                    {
                        nm: "水箱清洗",
                        img: business7,
                        aHref: "../boxWash/boxIndex.html"
                    }
                ],
                mission: [
                    {
                        nm: "工单指派",
                        img: mission1,
                        aHref: "assign"
                    },
                    {
                        nm: "工单确认",
                        img: mission2,
                        aHref: "confirm"
                    },
                    {
                        nm: "工单完成",
                        img: mission3,
                        aHref: "complete"
                    },
                    {
                        nm: "工单接单",
                        img: mission4,
                        aHref: "receipt"
                    }
                ],
                rescue: [
                    {
                        nm: "预案管理",
                        img: rescue1,
                        aHref: ""
                    },
                    {
                        nm: "预案指挥",
                        img: rescue2,
                        aHref: ""
                    }
                ]
            };
        },
        components: {},
        created() {
        },
        mounted() {
            const userInfoStr = this.until.loGet("userInfo");
            if (!userInfoStr) {
                this.until.href("./login.html");
            }
        },
        methods: {
            toTask(aHref) {
                this.until.seSave('taskTab', aHref);
                this.until.href('../task/index.html')
            },
            toPage(url) {
                this.until.href(url);
            }
        }
    };
</script>


