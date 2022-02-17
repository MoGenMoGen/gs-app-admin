<template>
  <div id="container">
    <!--<van-sticky>-->
      <my-header title="水箱清洗" @back="back" :searchStatus='false'></my-header>
	  <div class="searchBox">
	  	<div class="div-search">
	  	        <input placeholder="搜索清洗单位" v-model="searchTxt1" />
	  	</div>
	  	<div class="div-search">
	  	        <input placeholder="搜索泵房编号" v-model="searchTxt2" />
	  	</div>
	  	<div class="div-search">
	  	        <input placeholder="搜索泵房名称" v-model="searchTxt3" />
	  	</div>
	  </div>
	  
    <!--</van-sticky>-->
    <van-tabs v-model="active" color="#1177B9" @change="tabChange">
      <van-tab v-for="item in tabList" :title='item' :key="item">
		   <template #title> {{item}} <p>11</p></template>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  :immediate-check="immediate">
          <div v-for="item in dataList" :key="item.id"  class="listItem">
            <div class="itemTop">
              <div>{{item.pumpNo}}<span></span>{{item.pumpNm}}<span></span>{{item.waterArea}}
              </div>
			  <img
			    :src="arrowDownBlue"
			    :class="{ showMore:item.showMore}"
			    @click.stop="toShowMore(item,index)"
			  />

              <!--<img :src="arrowDownBlue" :class="{showMore:item.showMore}"/>-->
            </div>
            <div  style="margin-left: 10px;padding-bottom: 10px">
              <span style="font-size: 10px;">计划清洗时间:{{item.startTm}}</span>
            </div>
			

            <div class="itemContent" @click="toDetail(item)" v-if="item.showMore==true">
              <p><span>分区楼层：</span>{{item.partitionFloor}}</p>
              <p><span>供水模式：</span>{{item.arg2}}</p>
              <p><span>清洗单位：</span>{{item.unitNm}}</p>
              <p><span>清洗容积：</span>{{item.washVolume}}</p>
              <p><span>受限空间状态：</span>{{item.confinedStatus == '2' ? '审核通过' : item.confinedStatus == '1' ? '审核中': '未提交'}}</p>
            </div>
            <van-cell-group style="width: 95%;margin: 0 auto">
              <!--<van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"-->
                         <!--label-width="120"></van-field>-->
              <!--<van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"-->
                         <!--label-width="120"></van-field>-->
              <!--<van-field label="供水区域:" v-model="item.waterArea" readonly :border="false" label-width="120" ></van-field>-->


              <!--<van-field label="分区楼层:" v-model="item.partitionFloor" readonly :border="false" label-width="120"-->
                         <!--right-icon="arrow"></van-field>-->

              <!--<van-field label="供水模式:" v-model="item.arg2" readonly :border="false"-->
                         <!--label-width="120"></van-field>-->
              <!--<van-field label="清洗单位:" v-model="item.unitNm" readonly :border="false"-->
                         <!--label-width="120"></van-field>-->

              <!--<van-field label="清洗容积:" v-model="item.washVolume" readonly :border="false"-->
                         <!--label-width="120"></van-field>-->
              <!--<van-field label="计划清洗时间:" v-model="item.startTm" readonly :border="false"-->
                         <!--label-width="120"></van-field>-->

              <!--<van-field label="受限空间状态:" v-model=" item.confinedStatus == '2' ? '审核通过' : item.confinedStatus == '1' ? '审核中': '未提交'" readonly :border="false"-->
                         <!--label-width="120"></van-field>-->


              <!--         item.confinedStatus == '2'?'审核通过':'审核中'                   <van-field label="清洗消毒人员:" v-model="item.washUser" readonly :border="false"-->
              <!--                                       label-width="120"></van-field>-->
              <van-cell v-if="item.val8 !== 1 && item.status ==='已清洗' ">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <van-tag type="warning">待设施科考评</van-tag>
                </template>
              </van-cell>

              <van-row gutter="5" v-if="tabIndex === 1">
                <van-col span="12">
                  <van-button type="primary" size="small" block @click.stop="audit(item,'已审批')">同意</van-button>
                </van-col>
                <van-col span="12">
                  <van-button type="danger" size="small" block @click.stop="audit(item,'未通过')">撤回</van-button>
                </van-col>
              </van-row>


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
            <div>
              <span>清洗前照片:</span>
              <van-image width="80" height="80" :src="info.img1" @click="lookImg(info.img1)"/>
            </div>
            <div>
              <span>清洗后照片:</span>
              <van-image width="80" height="80" :src="info.img2" @click="lookImg(info.img2)"/>
            </div>
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
              {{info.val8}}
              <van-checkbox-group v-model="val4" direction="horizontal"  :disabled="info.val8 === 1">
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
              <van-rate style="margin-left: 20px" v-model="from.val5" :size="25" color="#ffd21e" void-icon="star" :disabled="info.val8 === 1"
                        void-color="#eee"/>
            </template>
          </van-cell>
          <van-field v-model="from.val6" label="其他说明事项" rows="3" type="textarea" :disabled="info.val8 === 1" placeholder="请输入其他说明事项"/>
          <van-field v-model="from.val7" label="项目负责人" placeholder="请输入项目负责人" :disabled="info.val8 === 1"/>
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
	import arrowDownBlue from "./img/向下.png";
export default {
  components: {myHeader},
  name: "boxWash",
  data() {
    return {
		arrowDownBlue,
		searchTxt1:'',
		searchTxt2:'',
		searchTxt3:'',
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
  watch: {
    searchTxt1(newVal, oldVal) {
      this.finished = false;
      this.pageNo = 1;
      this.dataList = [];
      this.getList();
    },
	searchTxt2(newVal, oldVal) {
	  this.finished = false;
	  this.pageNo = 1;
	  this.dataList = [];
	  this.getList();
	},searchTxt3(newVal, oldVal) {
      this.finished = false;
      this.pageNo = 1;
      this.dataList = [];
      this.getList();
    },
  },
  mounted() {
    this.getList()
  },

  methods: {
	toShowMore(item,index){
		item.showMore=!item.showMore
	},
    //审核通过与否
    audit(item,status) {
      Dialog.confirm({
        title: '提交审核',
        message: '确认提交审核？',
      })
          .then(() => {
            // on confirm
            this.api.auditBoxWash(item.id, status).then(res => {
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

    lookImg(val) {
      ImagePreview([val]);
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
      this.api.getBoxWashDtl(item.id).then(res => {
        this.info = res.data;
        this.show = true;
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
      if (this.searchTxt3) {
        this.query.toW(qry, "pumpNm", this.searchTxt3, "LK");
      }
      if (this.searchTxt2) {
        this.query.toW(qry, "pumpNo", this.searchTxt2, "LK");
      }
      if (this.searchTxt1) {
        this.query.toW(qry, "unitNm", this.searchTxt1, "LK");
      }
      if (this.tabIndex === 0) {
        this.query.toW(qry, 'status', '待清洗', "EQ");
        this.query.toWNull(qry, 'auditStatus')
        this.query.toO(qry, "boxNum", "desc");
      }
      if (this.tabIndex === 1) {
        this.query.toW(qry, 'status', '待清洗', "EQ");
        this.query.toW(qry, 'auditStatus', '未审批', "EQ");
        // this.query.toW(qry, 'val8', 0, "EQ");
      }
      if (this.tabIndex === 2) {
        // this.query.toW(qry, 'val8', 1, "EQ");
        this.query.toW(qry, 'status', '待清洗', "EQ");
        this.query.toW(qry, 'auditStatus', '已审批', "EQ");

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
		  this.dataList.forEach(item=>{
		  	this.$set(item,'showMore',false)
		  })
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
}
;
</script>

<style lang="less" >
.van-cell {
  line-height: normal;

}

	/deep/.van-tab__text--ellipsis{
		display: flex !important;
		overflow: visible !important;
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

<style lang="less">
  #container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    .van-tabs{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      .van-tabs__content{
        margin-top: 10px;
        flex: 1;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
  #container{
    min-height: 100vh;
    background: #F5F2F5;
  }
  .searchBox{
	  display: flex;
	  box-sizing: border-box;
	  justify-content: space-between;
	  padding: 0.2rem 0.2rem;
	  width: 100%;
	 .div-search {
	 	width:30%;
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
  }
 
  .listItem{
    background: #ffffff;
    border-radius: 0.1rem;
    margin: 0 auto 0.15rem;
    width: 96%;
    .itemTop{
		position: relative;
      display: flex;
      align-items: center;
      height: 1rem;
      width: 95%;
      margin: 0 auto;
      div:first-of-type{
        flex: 1;
        display: flex;
        align-items: center;
        span{
          display: inline-block;
          width: 1px;
          height: 0.1rem;
          background: #000000;
          opacity: 0.2;
          margin: 0 0.2rem;
        }
        p{
          height: 0.45rem;
          line-height: 0.45rem;
          padding: 0 0.1rem;
          border-radius: 3px;
          color: #ffffff;
          margin-left: 0.2rem;
        }
        .red{
          background: red;
        }
        .green{
          background: green;
        }
      }

      img{
        width: 0.35rem;
		position: absolute;
		top: 0.3rem;
		right: 0.2rem;
      }
      .showMore{
        transform:rotate(180deg);
        -ms-transform:rotate(180deg); 	/* IE 9 */
        -moz-transform:rotate(180deg); 	/* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg); 	/* Opera */
      }
    }
    .itemMore{

    }

    .itemContent{
      width: 95%;
      margin: 0 auto;
      border-top:1px solid #E9E9E9;
      display: flex;
      flex-wrap: wrap;
      padding: 0.2rem 0;

      p{
        width: 100%;
        display: flex;
        align-items: center;
        height: 0.5rem;
        span{
          color: #909090;
          width: 1.6rem;
          display: inline-block;
          flex-shrink: 0;
        }
        img{
          width: 0.45rem;
        }
      }

    }
  }
</style>