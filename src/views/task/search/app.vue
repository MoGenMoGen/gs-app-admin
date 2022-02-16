<template>
  <!--    新建工单-->
  <div>

    <my-header :title="title" @back="back">
      <!-- <van-icon name="arrow-left" slot="left" color="white" ></van-icon> -->
    </my-header>
    <div class="content">
      <div class="item1">


        <p class="label"><span></span>工单来源</p>
        <div class="option-menu">
          <el-select v-model="form.orderSource" placeholder="请选择">
            <el-option
                    v-for="item in sourceList"
                    :key="item.id"
                    :label="item.nm"
                    :value="item.nm">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="item1">

<!--接单单位-->
        <p class="label"><span></span>处理单位</p>
        <div class="option-menu">
          <el-select v-model="form.receivingNm" placeholder="请选择">
            <el-option
                    v-for="item in deptList"
                    :key="item.id"
                    :label="item.nm"
                    :value="item.nm">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item1">


        <p class="label"><span></span>工单状态</p>
        <div class="option-menu">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
                    v-for="item in statusList"
                    :key="item.status"
                    :label="item.nm"
                    :value="item.status">
            </el-option>
          </el-select>
        </div>
      </div>




      <div class="div-button">
        <button @click="search">搜索</button>

      </div>

    </div>

    <div class="content-list " :style="{height:height+'px'}">


      <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="immediate"

      >
        <div  class="block" v-for="item in list" :key="item.id" @click="toDetail(item)">
          <div class="item"><span>工单号：</span><p>{{item.id}}</p></div>
          <div class="item"><span>工单来源：</span><p>{{item.orderSource}}</p></div>
          <div class="item"><span>部门名称：</span><p>{{item.receivingNm}}</p></div>
          <div class="item"><span>泵房名称：</span><p>{{item.pump}}</p></div>
          <div class="item"><span>处理状态：</span><p>{{item.status | statusFilter}}</p></div>
          <div class="item"><span>故障现象：</span><p>{{item.fault}}</p></div>
          <div class="item"><span>派单时间：</span><p>{{item.crtTm}}</p></div>
          <img src="./img/arrow.png" >
        </div>
      </van-list>

    </div>
      <my-popup
              v-model="show"
              position="top" :styles="{height:'100%'}">
          <!--            v-if用于销毁组件，否则会有记录-->
          <detail :id="detailId"   @closeInfo="closeInfo" v-if="show"></detail>
      </my-popup>

  </div>
</template>

<script>
  import myHeader from "../../../components/myHeader/myHeader";
  import detail from "./detail/detail";
  export default {
    name: "newTask",
    components:{
      myHeader,
        detail
    },
    mounted(){
      this.getSize()
      this.getSourceList();
      this.getDept();
    },
      filters:{
        statusFilter(val){
            switch(val) {
                case 0:
                    return '等待初次确认'

                case 1:
                    return '确认完成，等待接单'
                case 2:
                    return '已接单'
                case 3:
                    return '已处理，等待确认'
                case 4:
                    return '完成'
                case 5:
                    return '已回访'

                default:

            }
        }
      },
    data(){
      return{

        form:{
          orderSource:'',//工单来源
          receivingNm:'',//接单单位
          status:'',//处理状态
        },
          detailId:'',
          show:false,

        deptList:[],//接单单位
        sourceList:[],//工单来源
        height:'',//屏幕高度
        immediate:false,//初始化不加载必须用变量
        pageNo:1,
        pageSize:10,
        loading:false,
        finished:false,
        title:'任务派单管理',
        source:'',//工单来源
        jiedanbumen:'',//接单单位
        paidanbumen:'',//派单部门
        paidanDate:'',//派单日期
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        showDate:false,
        list:[],//查询出来的工单列表
        statusList:[
          {
            status:0,
            nm:'等待初次确认',
          },
          {
            status:1,
            nm:'确认完成，等待接单',
          },
          {
            status:2,
            nm:'已接单',
          },
          {
            status:3,
            nm:'已处理，等待确认',
          },
          {
            status:4,
            nm:'完成',
          },
          {
            status:5,
            nm:'已回访',
          },

        ],

        list2:[
          {
            source:'123063清泉热线',
            time:'2018-05-01 12:25:25',
            level:'18小时',
            problem:'停水',
            region:'鄞州区',
            addr:'浙江省宁波市镇海区骆驼街道'
          },
          {
            source:'123063清泉热线',
            time:'2018-05-01 12:25:25',
            level:'18小时',
            problem:'停水',
            region:'鄞州区',
            addr:'浙江省宁波市镇海区骆驼街道'
          },
          {
            source:'123063清泉热线',
            time:'2018-05-01 12:25:25',
            level:'18小时',
            problem:'停水',
            region:'鄞州区',
            addr:'浙江省宁波市镇海区骆驼街道'
          },
          {
            source:'123063清泉热线',
            time:'2018-05-01 12:25:25',
            level:'18小时',
            problem:'停水',
            region:'鄞州区',
            addr:'浙江省宁波市镇海区骆驼街道'
          },

        ]
      }
    },
    methods:{
        closeInfo(){
            this.show=false
        },
        toDetail(item){
            this.show=true
            this.detailId=item.id
        },
      search(){
        this.list=[]
        this.pageNo=1;
        this.getList()
      },
      getList(){
        let qry = this.query.new();
        this.query.toO(qry, "crtTm",  "desc");

        this.query.toW(qry, "status", this.form.status, "EQ");
        this.query.toW(qry, "orderSource", this.form.orderSource, "EQ");
        this.query.toW(qry, "receivingNm", this.form.receivingNm, "EQ");
        this.query.toP(qry, this.pageNo, this.pageSize);
        this.api.getTaskOrder(encodeURIComponent(this.query.toJsonStr(qry))).then(res=>{
          window.console.log("55555555555555555555")
          window.console.log(res)
          this.list.push(...res.data.list)
          // 加载状态结束
          if (this.list.length >= res.page.total) {
            this.finished = true;
          }else{
            //这里要将finished的值变回false，
            this.finished=false
          }
          this.loading = false;

          this.pageNo++
          // 数据全部加载完成

        })
      },

      //接单单位
      getDept(){
        this.api.getDeptList(3000).then(res=>{
          window.console.log("接单单位列表。。。。。")
          window.console.log(res)
          this.deptList=res.data.list
        })
      },

      //工单来源
      getSourceList(){
        this.api.getDeptList(101).then(res=>{
          this.sourceList=res.data.list
        })
      },
      onLoad(){
        this.getList()
      },
      getSize(){
        this.height=window.innerHeight-314
        console.log(1111,this.height);
      },
      changeDate(){
        // window.console.log(this.currentDate)

      },
      closePop(){
        //不显示的时候要将组件销毁

        this.showDate=false
      },
      showDatePop(){
        this.showDate=true
      },
      back(){
        console.log(111);
        this.until.back()
      },

    }

  }
</script>

<style scoped lang="less">
//引入外部css文件

  .content{
    box-sizing: border-box;
    border-bottom: 1px solid #DAD7DB;
    padding-top: 10px;
  }
  .item1{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #DAD7DB;
    font-size: 14px;
    height:50px ;

    .label{
      white-space: nowrap;
      width: 60px;
      margin-right: 20px;
      span{
        display: inline-block;
        width: 10px;
        color: #FF3000;
      }
    }
    .option-menu{
      flex: 1;
      input{
        width: 100%;
        border: none;
        outline: none;
        color: #999999;

      }
      /*place holder颜色*/
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #999999;;

      }

    }
  }


  .div-button{

    padding-top: 25px;
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    button{
      width: 50%;
      background: #106FB8;
      color: white;
      border: none;
      border-radius: 5px;
      margin-left: 20px;
      margin-right: 10px;
      height: 40px;
    }

  }


/*
     内容区域
      */
.content-list{
  overflow-y: scroll;

  /*每一个循环块*/
  .block{
    font-size: 14px;
    background: white;
    border-bottom: 1px solid #F5F2F5;
    /*顺序为上右下左（顺时针）。*/
    padding: 0.3rem 0.4rem 0.3rem 0.4rem;
    position: relative;
    /*每一条数据
   */
    .item{
      padding-top: 0.13rem;
      padding-bottom: 0.13em;
      display: flex;
      /*左侧label*/
      span{
        flex: 4;
        color: #999999;
      }
      /*右侧内容*/
      p{
        flex: 14;
        color: #333333;

      }
    }
    /*箭头符号*/
    img{
      position: absolute;
      width: 20px;
      height: 20px;
      top:50%;
      transform: translateY(-50%);
      right: 15px;
    }

  }
}
</style>
<style>
  .el-select{
    width: 100%;

  }
  .el-input__inner{
    border: none;
    padding: 0;
    color: #999999;

  }

</style>
