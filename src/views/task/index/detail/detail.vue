<template>
  <!--    工单详情-->
  <div class="main">
    <my-header :title="title" :search-status="false">
      <van-icon name="arrow-left" slot="left" color="white" @click="back"></van-icon>
    </my-header>
    <div class="content2">
      <div class="block2">
        <h2>工单信息</h2>
        <div><span>工单号：</span>
          <p>{{ info.id }}</p></div>
        <div><span>工单来源：</span>
          <p>{{ info.orderSource }}</p></div>
        <div><span>行政区域：</span>
          <p>{{ info.administrativeDivision }}</p></div>
        <div><span>泵房名称：</span>
          <p>{{ info.pump }}</p></div>
        <div><span>发生地址：</span><textarea readonly="readonly" rows="3">{{info.occurrenceAddress}} </textarea></div>
        <div><span>接单单位：</span>
          <p>{{ info.receivingNm }}</p></div>
        <div><span>处理时限：</span>
          <p>{{ info.processingDeadline }}</p></div>
        <div><span>反映人：</span>
          <p>{{ info.reflecting }}</p></div>
        <div><span>联系电话：</span>
          <p>{{ info.reflectingPhone }}</p></div>
        <div><span>问题类别：</span>
          <p>{{ info.fault }}</p></div>
        <div><span>问题详情：</span><textarea readonly="readonly" rows="4">{{info.problem}} </textarea></div>
        <div><span>派单时间：</span>
          <p>{{ info.crtTm }}</p></div>
        <div><span>派单部门：</span>
          <p>{{ info.dispatchDepartment }}</p></div>
        <div><span>派单人：</span>
          <p>{{ info.sendUser }}</p></div>
        <div><span>接单备注：</span>
          <p>{{ info.remarks }}</p></div>
      </div>

      <div class="block2">
        <h2>外协处理信息</h2>
        <div><span>接单时间：</span>
          <p>{{ info.orderTm }}</p></div>
        <div><span>到场时间：</span>
          <p>{{ info.arrivalTm }}</p></div>
        <div><span>完成时间：</span>
          <p>{{ info.orderCompletionTm }}</p></div>
        <div><span>接单人员：</span>
          <p>{{ info.orderClerk }}</p></div>
        <div><span>故障类型：</span>
          <p>{{ info.faultType }}</p></div>
        <div><span>故障原因：</span>
          <p>{{ info.cause }}</p></div>
        <div><span>排查手段：</span>
          <p>{{ info.means }}</p></div>
        <div><span>处理记录：</span><textarea rows="4" readonly="readonly">{{info.processingRecords}} </textarea></div>
        <div><span>处理前：</span>
          <van-image v-if="info.img1 !== '' && info.img1 != null  " width="100" height="100"
                     v-for=" item in (info.img1 || '').split(',')" :key="item" :src="item"
                     @click="lookImg(item)"></van-image>
        </div>
        <div><span>处理后：</span>
          <van-image v-if="info.img2 !== '' && info.img2 != null " width="100" height="100"
                     v-for=" item in (info.img2 || '').split(',')" :key="item" :src="item"
                     @click="lookImg(item)"></van-image>
        </div>
      </div>

      <div class="block2">
        <h2>{{ info.deptNm }}处理信息</h2>
        <div><span>接单时间：</span>
          <p>{{ info.orderTm2 }}</p></div>
        <div><span>到场时间：</span>
          <p>{{ info.arrivalTm2 }}</p></div>
        <div><span>完成时间：</span>
          <p>{{ info.orderCompletionTm2 }}</p></div>
        <div><span>接单人员：</span>
          <p>{{ info.orderClerk2 }}</p></div>
        <div><span>故障类型：</span>
          <p>{{ info.faultType2 }}</p></div>
        <div><span>故障原因：</span>
          <p>{{ info.cause2 }}</p></div>
        <div><span>排查手段：</span>
          <p>{{ info.means2 }}</p></div>
        <div><span>处理记录：</span><textarea rows="4" readonly="readonly">{{info.processingRecords2}} </textarea></div>
        <div><span>处理前：</span>
          <van-image v-if="info.img3 !== '' && info.img3 != null  " width="100" height="100"
                     v-for=" item in (info.img3 || '').split(',')" :key="item" :src="item"
                     @click="lookImg(item)"></van-image>
        </div>
        <div><span>处理后：</span>
          <van-image v-if="info.img4 !== '' && info.img4 != null " width="100" height="100"
                     v-for=" item in (info.img4 || '').split(',')" :key="item" :src="item"
                     @click="lookImg(item)"></van-image>
        </div>
      </div>

      <div class="block2" v-if="type != 2">
        <h2>督办信息</h2>
        <div><span>确认时间：</span>
          <p>{{ info.finalConfirmationTm }}</p></div>
        <div><span>确认人员：</span>
          <p>{{ info.finalConfirmationNm }}</p></div>
        <div><span>完成时效：</span>
          <p>{{ info.completionTime }}</p></div>
        <div><span>综合评价：</span>
          <van-rate style="margin-left: -20px" readonly v-model="info.evaluation"></van-rate>
        </div>

        <div><span>故障考评：</span>
          <p v-if="info.faultCategory == 1">设备商设备故障</p>
          <p v-if="info.faultCategory == 2">片区故障</p>
          <p v-if="info.faultCategory == 3">非泵房原因</p>
        </div>
      </div>

      <div class="block2" v-if="type != 2">
        <h2>回访信息</h2>
        <div><span>回访时间：</span>
          <p>{{ info.revisitTm }}</p></div>
        <div><span>回访人员：</span>
          <p>{{ info.returnUser }}</p></div>
        <div><span>回访情况：</span>
          <p>{{ info.returnVisit }}</p></div>
        <div><span>客户满意度：</span>
          <p>{{ info.customerSatisfaction }}</p></div>
      </div>

      <div class="block2" v-if="type == 2">
        <h2>填写工单确认信息</h2>
        <div><span>评价等级：</span>
          <van-rate style="margin-left: -20px" v-model="confirmInfo.val1"/>
        </div>
        <div style="margin-bottom: 20px"><span>确认意见：</span>
          <textarea rows="1" v-model="confirmInfo.val2" placeholder="请输入确认意见"></textarea>
        </div>
        <div><span>故障考评：</span>
          <el-radio-group v-model="confirmInfo.val3" style="display:block;margin-left: -20px">
            <el-radio :label="1">设备商设备故障</el-radio>
            <el-radio :label="2">片区故障</el-radio>
            <el-radio :label="3">非泵房原因</el-radio>
          </el-radio-group>
        </div>
      </div>


    </div>


    <van-dialog v-model="show" message="是否确认工单？" show-cancel-button @confirm="submit"></van-dialog>

    <!--    <van-button v-if="info.status === 0 || info.status === 3" type="info" @click="show = true" block>工 单 确 认 </van-button>-->
    <van-button v-if="info.status === 0 || info.status === 3" type="info" @click="openShow" block>工 单 确 认</van-button>


  </div>
</template>

<script>
import {Dialog, Toast, ImagePreview} from 'vant';
import myHeader from "../../../../components/myHeader/myHeader";

export default {
  name: "detail",
  props: ["id", "type"],
  data() {
    return {
      imgUrl: '',
      fileList: [],
      show: false,
      imgShow: false,
      title: '工单详情',
      info: {},
      confirmInfo: {
        val1: 0,
        val2: '',
        val3: '',
      }

    }
  },
  components: {
    myHeader, Dialog, Toast
  },
  mounted() {
    this.getInfo(this.id);
  },
  methods: {
    lookImg(item) {
      ImagePreview([
        item
      ]);
    },
    openShow() {
      //Toast.success('自动保存成功');

      if (!this.confirmInfo.val2){
        return  Toast('请输入确认意见');
      }
      if (!this.confirmInfo.val3){
        return  Toast('请选择故障考评');
      }
      Dialog.confirm({title: '提交工单确认信息', message: '是否确认提交工单确认信息？'})
          .then(() => {
            // on confirm
            this.api.getUrl('/gs/order/confirm?id=' + this.id + '&num=' + this.confirmInfo.val1 + '&op=' + this.confirmInfo.val2 + '&f=' + this.confirmInfo.val3).then(res => {
              Toast('提示内容');
              if (res.code === 200) {
                Toast.success("确认成功");
                this.back();
                // //调用父组件刷新列表方法
                this.$emit('reList', this.info.id);


              } else {
                Toast("确认失败")
              }
            })
          })
          .catch(() => {
            // on cancel
          });


      },

    //工单确认提交
    submit() {
      let type;
      //二次确认
      if (this.info.status === 3) {
        type = 2;
      } else {
        type = 1
      }
      this.api.getTaskConfirm(this.info.id, type).then(res => {
        Toast('提示内容');
        if (res.code === 200) {
          Toast.success("确认成功");
          this.back();
          //调用父组件刷新列表方法
          this.$emit('reList', this.info.id);
        } else {
          Toast.fail("确认失败")
        }
      })
    },
    getInfo(id) {
      this.api.getTaskInfo(id).then(res => {
        this.info = res.data;
      })
    },
    back() {
      this.$emit('closeInfo');
    }
  },
  watch: {
    type(newVal) {
      if (newVal == 1) {
        this.title = "工单指派详情"
      } else if (newVal == 2) {
        this.title = "工单确认详情"
      } else if (newVal == 3) {
        this.title = "工单完成详情"
      }
    }
  }
}
</script>

<style scoped lang="less">

.main {
  //height: 100%;
  //width: 100%;
}

.myHeader {
  position: sticky;
  top: 0;
  z-index: 100;
}

/*
    弹框，内容区域
     */
.content2 {
  /*每一个循环块*/
  background: #F0F0F0;
  //height: 100%;
  //overflow-y: scroll;
  max-height: 100%;

  .block2 {
    background: white;
    border-bottom: 0.25rem solid #F0F0F0;
    /*顺序为上右下左（顺时针）。*/
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    position: relative;

    div {
      font-size: 14px;
      padding-bottom: 0.2rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      display: flex;

      span {
        color: #999999;
        width: 90px;
        flex-shrink: 0;
      }

      p {
        color: #333333;
      }

      textarea {
        color: #333333;
        flex: 1;
        border: none;
        resize: none;
        cursor: pointer;
      }
    }

    h2 {
      padding-top: 0.1rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      padding-bottom: 0.2rem;
      color: #1B1B1B;
      font-size: 0.31rem;
      margin-bottom: 0.21rem;
      border-bottom: 1px solid #DADADA;

    }

  }

}

.right {
  button {
    /*占位隐藏，保证搜索框位置不变*/
    visibility: hidden;
    color: white;
    background: none;
    border: 1px solid white;
    font-size: 0.07rem;
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
    border-radius: 3px;
  }

  img {
    visibility: hidden;
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.3rem;
  }

}

</style>
