<style lang="less" scoped>
@import "../assets/css/mobile.less";
.video {
  background: #ffffff;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  padding: 0.5rem 0.3rem;
  box-sizing: border-box;
  span {
    position: fixed;
    top: 0.1rem;
    right: 0.1rem;
    z-index: 100;
  }
}
</style>

<template>
  <div class="video">
    <span class="iconfont" @click="close">&#xe61b;</span>
    <video-player class="vjs-custom-skin" :options="playerOptions" @ready="playerReadied"></video-player>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
// videojs
import videojs from "video.js";
window.videojs = videojs;

require("videojs-contrib-hls/dist/videojs-contrib-hls.js");
export default {
  props: {
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      videoSrcPrex: "http://115.231.212.30:6713/mag/hls/",
      videoSrcSufx: "/1/live.m3u8",
      playerOptions: {
        // videojs and plugin options
        height: "360",
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: ""
          }
        ],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster: ""
      }
    };
  },
  components: { videoPlayer },
  mounted() {
    //需要替换hls跟1之前的那一串
    this.playerOptions.sources[0].src =
    this.videoSrcPrex + this.url + this.videoSrcSufx;

    console.log(this.playerOptions.sources[0].src)
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        return options;
      };
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
