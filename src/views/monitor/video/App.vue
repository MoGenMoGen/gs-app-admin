<template>
    <div id="container">
        <van-sticky>
            <my-header title="视频监控" @back="back" :searchStatus='false'></my-header>
        </van-sticky>
		<div class="div-search">
		        <input placeholder="搜索摄像头名称" v-model="searchTxt" />
		</div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  :immediate-check="immediate">
            <div v-for="item in dataList" :key="item.id" @click="toDetail(item)">

                <van-cell center :title="item.cameraName" is-link>

                </van-cell>
            </div>
        </van-list>

        <van-overlay :show="videoShow" @click="videoShow = false">
            <div class="wrapper" @click.stop>
                <van-loading size="24px" vertical>加载中...</van-loading>
            </div>
        </van-overlay>



        <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
            <van-form @submit="search" style="margin-top: 50px">
                <van-field label="泵房名称:" v-model="searchData.pumpNm" clearable></van-field>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提 交
                    </van-button>
                </div>
            </van-form>
        </van-popup>

    </div>
</template>

<script>





    import myHeader from "../../../components/myHeader/myHeader";
    // let Hls = require('hls.js');
    export default {

        data() {
            return {
                hls: null,
				searchTxt:'',//搜索字段
                videoUrl: "",
                cameraName: "",
                canPlay: true,
                videoShow: false,
                info: {},
                searchData: {
                    pumpNm: ''
                },
                show: false,
                activeNames: ['1'],
                dataList: [],
                searchShow: false,
                loading: false,
                vLoading: false,
                finished: false,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 25,
                total: 0,
                title: "",
                pumpNm: "",
            };
        },
        components: {myHeader},
        watch: {
          searchTxt(newVal, oldVal) {
            this.finished = false;
            this.pageNo = 1;
            this.dataList = [];
            // this.getList();
          },
        },
        computed: {

        },
        created() {

        },
        mounted() {
            this.getList();
            //this.getStream('http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8')
        },
        beforeDestroy() {

        },
        methods: {
            // getStream(source) {
            //     if (Hls.isSupported()) {
            //         this.hls = new Hls();
            //         this.hls.loadSource(source);
            //         this.hls.attachMedia(this.$refs.video);
            //
            //         this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            //             console.log("加载成功");
            //             this.$refs.video.play();
            //         });
            //         this.hls.on(Hls.Events.ERROR, (event, data) => {
            //             // console.log(event, data);
            //             // 监听出错事件
            //             console.log("加载失败");
            //         });
            //     } else if (this.$refs.video.canPlayType('application/vnd.apple.mpegurl')) {
            //         this.$refs.video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
            //         this.$refs.video.addEventListener('loadedmetadata',function() {
            //             this.$refs.video.play();
            //         });
            //     }
            // },
            // 停止流
            videoPause() {
                if (this.hls) {
                    this.$refs.video.pause();
                    this.hls.destroy();
                    this.hls = null;
                }
            },

            // getVideo(url) {
            //     var _this = this
            //     this.videoShow = true;
            //     this.vLoading = true;
            //     var video = document.getElementById('video');
            //     var videoSrc = "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8";
            //     if (Hls.isSupported()) {
            //         var hls = new Hls();
            //         hls.loadSource(videoSrc);
            //         hls.attachMedia(video);
            //         hls.on(Hls.Events.MANIFEST_PARSED, function () {
            //             video.play();
            //             //_this.vLoading = false;
            //         });
            //     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            //         video.src = videoSrc;
            //         video.addEventListener('loadedmetadata', function () {
            //             video.play();
            //             //console.log(2222)
            //             _this.vLoading = false;
            //         });
            //     }
            // },

            search() {
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            onLoad() {
                this.getList()
            },
            toDetail(item) {

                this.api.getCameraUrl(item.cameraUuid).then(res => {
                    if (res.code === 200) {
                        //console.log(res.data.data.url)
                        //this.info = res.data;
                        //  window.open(res.data.data.url)
                        this.videoUrl = res.data.data.url;
                        // window.open(this.videoUrl)
                        // this.videoShow = true;
                        this.$bridge.callHandler('h5_video', this.videoUrl, (res) => {

                        })


                    }
                });

            },
            getList() {
                let qry = this.query.new();
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "cameraName", this.searchTxt, "LK");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.api.getSysPumpCameraPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.dataList.push(...res.data.list);
                        // 加载状态结束
                        this.finished = this.dataList.length >= res.page.total;
                        this.loading = false;
                        this.pageNo++;
                    }
                })
            },
            close() {
                this.videoShow = false;
            },
            back() {
                this.until.back()
            },


        }
    };
</script>
<style lang="less" scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
	.div-search{
		width:100%;
		padding: 0.2rem 0rem;
		background-color: #f4f6f8;
		text-align: center;
		input{
			width: 80%;
			height: 0.54rem;
			border: 0.02rem solid #e5e5e5;
			border-radius: 0.3rem;
			padding: 0rem 0.2rem;
			font-size: 0.22rem;
		}
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


