<template>
    <div id="container">

        <my-header title="设备信息" @back="back" @search="searchShow = true"> </my-header>

        <van-list  v-model="loading"  :finished="finished" finished-text="没有更多了"   @load="onLoad"  :immediate-check="immediate" >
            <div   v-for="(item,index) in dataList" :key="index" @click="toDetail(item)" class="listItem">
                <div class="itemTop" @click="toDetail(item)" >
                    <div>{{item.pumpNo}}<span></span>{{item.pumpNm}}<span></span>{{item.region}}</div>
                </div>
                <div  style="margin-left: 10px;padding-bottom: 10px">
                    <span style="width: 180rpx;display: inline-block;">设备编号：</span>{{item.no}}
                </div>

                <div class="itemContent">
                    <p><span>设备大类：</span>{{item.typeANm}}</p>
                    <p><span>设备小类：</span>{{item.typeBNm}}</p>
                    <p><span>设备子类：</span>{{item.typeCNm}}</p>
                    <p><span>设备名称：</span>{{item.name}}</p>
                    <p><span>设备别名：</span>{{item.alias}}</p>
                </div>
                <!--<van-cell-group>-->
                    <!--<van-field label="泵房编号:" v-model="item.pumpNo" readonly :border="false"> </van-field>-->
                    <!--<van-field label="泵房名称:" v-model="item.pumpNm" readonly :border="false"> </van-field>-->
                    <!--<van-field label="设备编号:" v-model="item.no" readonly :border="false"> </van-field>-->
                    <!--<van-field label="设备大类:" v-model="item.typeANm" readonly :border="false" right-icon="arrow"> </van-field>-->
                    <!--<van-field label="设备小类:" v-model="item.typeBNm" readonly :border="false"> </van-field>-->
                    <!--<van-field label="设备子类:" v-model="item.typeCNm" readonly :border="false"> </van-field>-->
                    <!--<van-field label="设备名称:" v-model="item.name" readonly :border="false"> </van-field>-->
                    <!--<van-field label="设备别名:" v-model="item.alias" readonly :border="false"> </van-field>-->
                    <!--<van-button block style="height: 5px" color="#F3F3F3"></van-button>-->
                <!--</van-cell-group>-->
            </div>
        </van-list>

        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" closeable round close-icon="close">
            <van-cell-group style="margin-top: 50px">
                <van-field v-model="info.partitionNm" label="分区名称:" readonly label-width="120"></van-field>
                <van-field v-model="info.model" label="规格型号:" readonly label-width="120"></van-field>
                <van-field v-model="info.technicalParameter" label="技术参数:" readonly label-width="120"></van-field>
                <van-field v-model="info.devicePower" label="设备功率:" readonly label-width="120"></van-field>
                <van-field v-model="info.manufacturingUnit" label="制造单位:" readonly label-width="120"></van-field>
                <van-field v-model="info.deliveryUnit" label="供货单位:" readonly label-width="120"></van-field>
                <van-field v-model="info.specialParameter" label="专用参数:" readonly label-width="120"></van-field>
            </van-cell-group>
        </van-popup>



      <!--搜索弹窗-->
      <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">
        <van-form @submit="search" style="margin-top: 50px">
          <van-field label="泵房名称:" v-model="searchData.pumpNm" clearable></van-field>
          <van-field label="设备别名:" v-model="searchData.alias" clearable></van-field>
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
    import { Dialog ,Toast } from 'vant';
    import myHeader from "../../../components/myHeader/myHeader";
    export default {
        components: {myHeader},
        name: "deviceInfo",
        data() {
            return {
                info: {},
                searchData: {
                    pumpNm: '',
                    alias: ''

                },
                show: false,
                dataList: [],
                searchShow: false,
                loading: false,
                finished: false,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 10,
                total: 0,
                pumpNm: "",
            };
        },
        mounted() {
            this.getList()
        },
        methods: {

            search() {
                this.searchShow = false;
                this.pageNo = 1;
                this.dataList = [];
                this.getList();
            },
            back() {
                this.until.back()
            },
            onLoad() {
                this.getList()
            },
            toDetail(item) {
                this.show = true;
                this.info = item;
            },
            getList() {
                let qry = this.query.new();
                if (this.searchData.pumpNm) {
                    this.query.toW(qry, "pumpNm", this.searchData.pumpNm, "LK");
                }
                if (this.searchData.alias) {
                    this.query.toW(qry, "alias", this.searchData.alias, "LK");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.api.getPumpDevicePage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.dataList.push(...res.data.list);
                        // 加载状态结束
                        this.finished = this.dataList.length >= res.page.total;
                        this.loading = false;
                        this.pageNo++;
                    }
                })
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
    .van-cell {
        line-height: normal;
        padding: 8px 16px;
    }
    .van-list{
        margin-top: 0.15rem;
    }
    #container{
        min-height: 100vh;
        background: #F5F2F5;
    }
    .listItem{
        background: #ffffff;
        border-radius: 0.1rem;
        margin: 0 auto 0.15rem;
        width: 96%;
        .itemTop{
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
            }
        }


        .itemContent{
            width: 95%;
            margin: 0 auto;
            border-top:1px solid #E9E9E9;
            padding: 0.2rem 0;
            p{
                display: flex;
                align-items: center;
                padding: 0.1rem 0;
                >span{
                    color: #909090;
                    width: 1.3rem;
                    display: inline-block;
                    flex-shrink: 0;
                }
            }

        }
    }
</style>

