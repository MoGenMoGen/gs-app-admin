<template>
  <div id="container">
    <van-sticky>
      <my-header title="水箱清洗" @back="back" @search="searchShow = true"></my-header>
    </van-sticky>
    <van-tabs v-model="active" color="#1177B9" @change="tabChange">
      <van-tab v-for="item in tabList" :title='item' :key="item">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  :immediate-check="immediate">
          <div v-for="item in dataList" :key="item.id" @click="toDetail(item)">
            <van-cell-group>
              <van-field label="清洗单位:" v-model="item.unitNm" readonly :border="false"
                         label-width="120"></van-field>
              <van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"
                         label-width="120"></van-field>
              <van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"
                         label-width="120"></van-field>
              <van-field label="供水区域:" v-model="item.waterArea" readonly :border="false" label-width="120"
                         right-icon="arrow"></van-field>
              <van-field label="清洗容积:" v-model="item.washVolume" readonly :border="false"
                         label-width="120"></van-field>
              <van-field label="计划开始时间:" v-model="item.startTm" readonly :border="false"
                         label-width="120"></van-field>
              <van-field label="供水模式:" v-model="item.arg2" readonly :border="false"
                         label-width="120"></van-field>
              <!--                            <van-field label="清洗消毒人员:" v-model="item.washUser" readonly :border="false"-->
              <!--                                       label-width="120"></van-field>-->
              <van-cell v-if="item.val8 !== 1 && item.status ==='已清洗' ">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <van-tag type="warning">待设施科考评</van-tag>
                </template>
              </van-cell>

            </van-cell-group>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>

    <!--详情弹窗-->
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }" closeable round close-icon="close">

      <van-cell-group style="margin-top: 50px">
        <van-field label="清洗单位:" v-model="info.unitNm" readonly label-width="120"></van-field>
        <van-field label="泵房编号:" v-model="info.pumpNo" readonly label-width="120"></van-field>
        <van-field v-model="info.pumpNm" label="泵房名称：" readonly label-width="120"></van-field>
        <van-field v-model="info.volume" label="水箱容量（m³）:" label-width="120" readonly></van-field>
        <van-field v-model="info.disinfectTm" label="清洗消毒日期：" label-width="120" readonly></van-field>
        <van-field v-model="info.washUser" label="清洗消毒人员：" label-width="120" readonly></van-field>
        <van-field v-model="info.drainageTm" label="放水时间：" label-width="120" readonly></van-field>
        <van-field v-model="info.washTm" label="清洗消毒时间：" label-width="120" readonly></van-field>
        <van-field v-model="info.soup" label="使用药液名称：" label-width="120" readonly></van-field>
        <van-field v-model="info.concentration" label="配制浓度：" label-width="120" readonly></van-field>
        <van-field v-model="info.makeUser" label="配制人员：" label-width="120" readonly></van-field>
        <van-field v-model="info.proctor" label="监督人：" label-width="120" readonly></van-field>
        <van-field v-model="info.inletTm" label="注水时间：" label-width="120" readonly></van-field>
        <van-field v-model="info.completeTm" label="完成时间：" label-width="120" readonly></van-field>
        <van-button block style="height: 10px" color="#F3F3F3"></van-button>
        <van-field v-model="info.cleanRecord" label="清洗消毒有关记录：" type="textarea" label-width="130" rows="4"
                   readonly></van-field>
        <van-field v-model="info.recorder" label="记录人：" label-width="120" readonly></van-field>
        <van-field v-model="info.leader" label="负责人：" label-width="120" readonly></van-field>

        <van-field v-model="info.val1" label="浮球阀维护：" label-width="120" readonly></van-field>
        <van-field v-model="info.chlorine" label="余氯：" label-width="120" readonly></van-field>
        <van-field v-model="info.turbidity" label="浊度：" label-width="120" readonly></van-field>
        <van-field v-model="info.val2" label="水质快检结论：" label-width="120" readonly></van-field>
        <van-field v-model="val3" label="其他说明事项：" label-width="120" readonly></van-field>

        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span>清洗前照片:</span>
            <van-image width="80" height="80" :src="info.img1" @click="lookImg(info.img1)"/>
            <span>清洗后照片:</span>
            <van-image width="80" height="80" :src="info.img2" @click="lookImg(info.img2)"/>
          </template>
        </van-cell>


        <van-field v-if="info.cleanRecord !== null " v-model="info.cleanRecord" label="清洗消毒记录：" label-width="120"
                   readonly></van-field>
        <van-field v-model="info.recorder" label="记录人：" label-width="120" readonly></van-field>
        <van-field v-model="info.leader" label="负责人：" label-width="120" readonly></van-field>


        <van-button block style="height: 10px" color="#F3F3F3"></van-button>


        <div v-if="info.status ==='已清洗' ">
          <van-divider>设施科考评</van-divider>
          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span>清洗存在问题</span>
              <van-checkbox-group v-model="val4" direction="horizontal">
                <van-checkbox name="停水告知通知有误" shape="square" style="margin-top: 5px">停水告知通知有误
                </van-checkbox>
                <van-checkbox name="防护用品穿戴不规范" shape="square" style="margin-top: 5px">防护用品穿戴不规范
                </van-checkbox>
                <van-checkbox name="未按计划停水" shape="square" style="margin-top: 5px">未按计划停水</van-checkbox>
                <van-checkbox name="违规操作或安全事故" shape="square" style="margin-top: 5px">违规操作或安全事故
                </van-checkbox>
                <van-checkbox name="清洗完毕未通知物业" shape="square" style="margin-top: 5px">清洗完毕未通知物业
                </van-checkbox>
                <van-checkbox name="用户投诉" shape="square" style="margin-top: 5px">用户投诉</van-checkbox>
                <van-checkbox name="其他" shape="square" style="margin-top: 5px">其他</van-checkbox>
                <van-checkbox name="无" shape="square" style="margin-top: 5px">无</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-cell>

          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span>总体考评:</span>
              <van-rate style="margin-left: 20px" v-model="from.val5" :size="25" color="#ffd21e"
                        void-icon="star" void-color="#eee"/>
            </template>
          </van-cell>
          <van-field v-model="from.val6" label="其他说明事项" rows="3" type="textarea" placeholder="请输入其他说明事项"/>
          <van-field v-model="from.val7" label="项目负责人" placeholder="请输入项目负责人"/>
          <div style="height: 30px"></div>
          <van-button type="primary" @click="addEvaluation" block v-if="info.val8 !== 1">提交考评</van-button>
        </div>


      </van-cell-group>

    </van-popup>
    <!--搜索弹窗-->
    <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
      <van-form @submit="search" style="margin-top: 50px">
        <van-field label="清洗单位:" v-model="searchData.unitNm" clearable></van-field>
        <van-field label="泵房编号:" v-model="searchData.pumpNo" clearable></van-field>
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
import {Dialog, Toast, ImagePreview} from 'vant';

export default {
  components: {myHeader},
  name: "boxWash",
  data() {
    return {
      info: {},
      val4: [],
      val3: [],
      // val5:'',
      from: {
        id: '',
        val4: '',
        val5: 0,
        val6: '',
        val7: '',
        val8: '',
      },
      show: false,
      searchShow: false,
      searchData: {
        unitNm: '',
        pumpNo: '',
        pumpNm: ''
      },
      tabList: ['清洗计划', '清洗审核', '清洗任务', '清洗报表'],
      tabIndex: 0,
      active: '',
      loading: false,
      pageNo: 1,
      pageSize: 5,
      dataList: [],
      immediate: false,//初始化不加载必须用变量
      finished: false,
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    lookImg(val) {
      // let split = val.split(',');
      // console.log(split)
      // //console.log(val)
      ImagePreview([val]);
      // ImagePreview({images: split, startPosition: 0});//this.images为图片资源
    },
    //提交考评
    addEvaluation() {
      this.from.id = this.info.id;
      this.from.val4 = this.val4.toString()
      this.from.val8 = 1;
      Dialog.confirm({
        title: '提交考评',
        message: '一旦提交将无法修改，确认提交？',
      })
          .then(() => {
            // on confirm
            this.api.updWash(JSON.stringify(this.from)).then(res => {
              console.log(res)
              if (res.code === 200) {
                Toast.success('操作成功');
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
                this.show = false;
              }
            })
          })
          .catch(() => {
            // on cancel
          });
    },


    search() {
      this.searchShow = false;
      this.pageNo = 1;
      this.dataList = [];
      this.getList();
    },
    toDetail(item) {

      this.api.getBoxWashDtl(item.id).then(res=>{
        this.info = res.data;
        console.log(this.info)
        this.show = true;
        // if (this.info.val8 === 1) {
        //   if (this.info.val4) {
        //     this.val4 = this.info.val4.split(",");
        //   }
        //   if (this.info.val3) {
        //     this.val3 = this.info.val3.split(",");
        //   }
        //   this.from.val5 = Number(this.info.val5);
        //   this.from.val6 = this.info.val6;
        //   this.from.val7 = this.info.val7;
        //   this.from.val8 = this.info.val8;
        // }
      })

    },
    //0待保养 1已保养 2逾期
    tabChange(val) {
      this.dataList = [];
      this.pageNo = 1;
      this.tabIndex = val;
      this.getList()
    },
    onLoad() {
      this.getList()
    },
    getList() {
      let qry = this.query.new();
      if (this.searchData.pumpNm) {
        this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
      }
      if (this.searchData.pumpNo) {
        this.query.toW(qry, "pumpNo", this.searchData.pumpNo, "LK");
      }
      if (this.searchData.unitNm) {
        this.query.toW(qry, "unitNm", this.searchData.unitNm, "LK");
      }
      if (this.tabIndex === 0) {
        this.query.toW(qry, 'status', '待清洗', "EQ");
        this.query.toWNull(qry, 'auditStatus')
        this.query.toO(qry, "boxNum", "desc");
      }
      if (this.tabIndex === 1) {
        this.query.toW(qry, 'status', '待清洗', "LK");
        this.query.toW(qry, 'auditStatus', '未审批', "IN");
        // this.query.toW(qry, 'val8', 0, "EQ");
      }
      if (this.tabIndex === 2) {
        // this.query.toW(qry, 'val8', 1, "EQ");
        this.query.toW(qry, 'status', '待清洗', "LK");
        this.query.toW(qry, 'auditStatus', '已审批', "LK");

      }
      if (this.tabIndex === 3) {
        // this.query.toW(qry, 'status', '逾期', "EQ");
        this.query.toW(qry, 'status', '已清洗', "LK");
        this.query.toO(qry, "startTm", "desc");
        this.query.toO(qry, "completeTm", "desc");

      }
      this.query.toP(qry, this.pageNo, this.pageSize);
      // this.query.toO(qry, "crtTm", "desc");
      this.api.getBoxWashList2(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
        if (res.code === 200) {
          this.dataList.push(...res.data.list);
          // 加载状态结束
          this.finished = this.dataList.length >= res.page.total;
          this.loading = false;
          this.pageNo++;
        }
      })
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

