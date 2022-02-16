<template>
    <div id="container">
        <van-sticky>
            <my-header title="泵房档案" :searchStatus='false' @back="back"> </my-header>
        </van-sticky>
		<div class="div-search">
		        <input placeholder="搜索泵房名称" v-model="searchTxt" />
		</div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="immediate">
            <div v-for="(item,index) in dataList" :key="index" class="listItem">
                <div class="itemTop" @click="toDetail(item)" >
                    <div>{{item.no}}<span></span>{{item.nm}}<span></span>{{item.region}}</div>
                    <p><span>分区情况：</span>{{item.partitionSituation}}</p>
                    <p><span>供水模式：</span>{{item.arg2}}<van-button  size="mini" type="info" @click.stop="toNav(item)" style="margin-left: auto;">去导航</van-button></p>
                </div>
                <div class="itemContent">
                    <!--<p><span>小区名称：</span>{{item.estateNm}}</p>-->
                    <p><span>分区楼层：</span>{{item.partitionFloor}}</p>
                    <p><span>物业电话：</span>{{item.propertyPhone}}</p>
                    <p><span>泵房地址：</span>{{item.pumpLocation}}</p>
                    <p><span>路线图：</span><img :src="item.pumpRoute" @click.stop="showImg(item.pumpRoute)" v-if="item.pumpRoute != null && item.pumpRoute !== ''"  width="80" height="80"/></p>
                    <!--<p><span></span><van-button  size="mini" type="info" @click="toNav(item)">去导航</van-button></p>-->
                </div>
                <!--<van-cell-group>-->
<!--&lt;!&ndash;                    <van-field label="泵房编号:" v-model="item.no" readonly :border="false">&ndash;&gt;-->
<!--&lt;!&ndash;                        <template #default>&ndash;&gt;-->
<!--&lt;!&ndash;                            <van-button  size="mini" type="info" @click="toNav(item)">去导航</van-button>&ndash;&gt;-->
<!--&lt;!&ndash;                        </template>&ndash;&gt;-->
<!--&lt;!&ndash;                    </van-field>&ndash;&gt;-->
                    <!--<div @click="toDetail(item)">-->
                        <!--<van-field label="泵房编号:" v-model="item.no" readonly :border="false"></van-field>-->
                        <!--<van-field label="泵房名称:" v-model="item.nm" readonly :border="false"></van-field>-->
                        <!--<van-field label="小区名称:" v-model="item.estateNm" readonly :border="false"></van-field>-->
                        <!--<van-field label="分区楼层:" v-model="item.partitionFloor" readonly :border="false"></van-field>-->
                        <!--<van-field label="分区情况:" v-model="item.partitionSituation" readonly :border="false"></van-field>-->
                        <!--<van-field label="供水模式:" v-model="item.arg2" readonly :border="false"></van-field>-->
                        <!--<van-field label="物业电话:" v-model="item.propertyPhone" readonly :border="false"></van-field>-->
                        <!--<van-field label="广角监控数量:"  label-width="140" v-model="item.wideVideo" readonly :border="false"></van-field>-->
                        <!--<van-field label="泵房地址:" v-model="item.pumpLocation" readonly :border="false" type="textarea" rows="2"></van-field>-->
                    <!--</div>-->
                    <!--<van-cell title="路线图:" center :border="false">-->
                        <!--<template #default>-->
                            <!--<van-row>-->
                                <!--<van-col span="12">-->
                                    <!--<van-image @click="showImg(item.pumpRoute)" v-if="item.pumpRoute != null && item.pumpRoute !== ''" width="80" height="80"-->
                                               <!--:src="item.pumpRoute"></van-image>-->
                                <!--</van-col>-->
                            <!--</van-row>-->
                        <!--</template>-->
                    <!--</van-cell>-->
                  <!--<van-cell  center>-->
                    <!--<template #default>-->
                      <!--<van-button  size="mini" type="info" @click="toNav(item)">去导航</van-button>-->
                    <!--</template>-->
                  <!--</van-cell>-->
                    <!--<van-button block style="height: 5px" color="#F3F3F3"></van-button>-->
                <!--</van-cell-group>-->
            </div>
        </van-list>
        <!--详情弹窗-->
        <van-popup v-model="show" position="bottom" :style="{ height: '90%' }" closeable round close-icon="close">
            <van-cell-group style="margin-top: 50px">
                <van-field v-model="info.no" label="泵房编号:" readonly label-width="120"></van-field>
                <van-field v-model="info.nm" label="泵房名称:" readonly label-width="120"></van-field>
                <van-field v-model="info.guarantee" label="是否过保:" readonly label-width="120"></van-field>
                <van-field v-model="info.region" label="行政区域:" readonly label-width="120"></van-field>
                <van-field v-model="info.waterArea" label="供水区域:" readonly label-width="120"></van-field>
<!--                <van-field v-model="info.estateNm" label="小区名称:" readonly label-width="120"></van-field>-->
                <van-field v-model="info.recordNm" label="备案名:" readonly label-width="120"></van-field>
                <van-field v-model="info.sxNum" label="水箱个数:" readonly label-width="120"></van-field>
                <van-field v-model="info.volume" label="总容积:" readonly label-width="120"></van-field>
                <van-field v-model="info.transferTm" label="移交时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.enableTm" label="启用时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.warrantyTm" label="质保时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.maintainTm" label="保养调整时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.maintainStartTm" label="保养开始时间:" readonly label-width="120"></van-field>
                <van-field v-model="info.houseNum" label="小区户数:" readonly label-width="120"></van-field>
                <van-field v-model="info.estateNum" label="小区栋数:" readonly label-width="120"></van-field>
                <van-field v-model="info.partitionFloor" label="分区楼层:" readonly label-width="120"></van-field>
                <van-field v-model="info.partitionSituation" label="分区情况:" readonly label-width="120"></van-field>
                <van-field v-model="info.propertyPhone" label="物业电话:" readonly label-width="120"></van-field>
                <van-field v-model="info.community" label="所属社区:" readonly label-width="120"></van-field>
                <van-field v-model="info.communityPhone" label="社区电话:" readonly label-width="120"></van-field>
                <van-field v-model="info.sxsffk" label="生消分开:" readonly label-width="120"></van-field>

                <van-field v-model="info.serverAddress" label="服务器地址:" readonly label-width="120"></van-field>
                <van-field v-model="info.ip" label="IP地址:" readonly label-width="120"></van-field>
                <van-field v-model="info.broadbandAccount" label="网关:" readonly label-width="120"></van-field>
                <van-field v-model="info.broadbandPassword" label="子网掩码:" readonly label-width="120"></van-field>
                <van-field v-model="info.broadbandOperator" label="宽带运营商:" readonly label-width="120"></van-field>
                <van-field v-model="info.networkType" label="网络类型:" readonly label-width="120"></van-field>
                <van-field v-model="info.lng" label="经度:" readonly label-width="120">
                    <template #button>
                        <van-button size="small" type="primary" @click="getGps">获取当前定位</van-button>
                    </template>
                </van-field>
                <van-field v-model="info.lat" label="维度:" readonly label-width="120">
                    <template #button>
                        <van-button size="small" type="info" @click="saveGps">保存当前定位</van-button>
                    </template>
                </van-field>
                <van-field v-model="info.pumpLocation" label="泵房位置:" readonly label-width="120" type="textarea" rows="2"></van-field>
                <van-field v-model="info.bigEvent" label="泵房大事件:" readonly label-width="120" type="textarea" rows="2"></van-field>
                <van-field v-model="info.wideVideo" label="广角监控数量:" readonly label-width="120" ></van-field>



                <van-field  label="泵房图片路线图:" readonly label-width="120" ></van-field>
                <van-image width="100" height="100" :src="info.pumpImg1" @click="showImg(info.pumpImg1)"></van-image>
                <van-image width="100" height="100" :src="info.pumpImg2" @click="showImg(info.pumpImg2)"></van-image>
                <van-image width="100" height="100" :src="info.pumpRoute" @click="showImg(info.pumpRoute)"></van-image>
                <van-field v-model="info.equipmentNm" label="设备供应商:" readonly label-width="120"></van-field>
                <van-field v-model="info.equipmentPhone" label="设备联系人及电话:" readonly label-width="150"></van-field>
                <van-field v-model="info.lnspectionNm" label="巡检单位:" readonly label-width="120"></van-field>
                <van-field v-model="info.lnspectionPhone" label="巡检联系人及电话:" readonly label-width="120"></van-field>
                <van-field v-model="info.maintenanceNm" label="保养单位:" readonly label-width="120"></van-field>
                <van-field v-model="info.maintenancePhone" label="保养联系人及电话:" readonly label-width="120"></van-field>
                <van-field v-model="info.maintenanceMethod" label="维护方式:" readonly label-width="120"></van-field>
            </van-cell-group>
        </van-popup>


        <!--搜索弹窗-->
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
    import {ImagePreview,Toast} from 'vant';
    import myHeader from "../../../components/myHeader/myHeader";
    export default {
        components: {myHeader},
        name: "pump",
        data() {
            return {
				searchTxt:'',
                info: {},
                searchData: {
                    pumpNm: ''
                },
                show: false,
                activeNames: ['1'],
                dataList: [],
                searchShow: false,
                loading: false,
                finished: false,
                immediate: false,//初始化不加载必须用变量
                pageNo: 1,
                pageSize: 10,
                total: 0,
                title: "",
                pumpNm: "",
            };
        },
        mounted() {
            this.getList()
        },
		watch: {
		  searchTxt(newVal, oldVal) {
		    console.log("首次观测");
		    this.finished = false;
		    this.pageNo = 1;
		    this.dataList = [];
		    this.getList();
		  },
		},
        methods: {
            getGps(){
                this.$bridge.callHandler('h5_up_location', "", (res) => {
                    let parse = JSON.parse(res);
                    this.info.lng = parse.dlon;
                    this.info.lat = parse.dlat;
                })
            },
            saveGps(){
                this.api.updPump(JSON.stringify(this.info)).then(res => {
                    Toast("修改成功")
                });
            },

            toNav(item) {
                let temp = {
                    dlat: item.lat,
                    dlon: item.lng,
                    name: item.nm,
                };
                this.$bridge.callHandler('h5_baidumap', JSON.stringify(temp))
            },

            showImg(val) {
                ImagePreview([val]);
            },

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
                if (this.info.sxsffk === '1'){
                  this.info.sxsffk = '是'
                }
              if (this.info.sxsffk === '0'){
                this.info.sxsffk = '否'
              }

            },
            getList() {
                let qry = this.query.new();
                if (this.searchTxt) {
                    this.query.toW(qry, "nm", this.searchTxt, "LK");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.query.toO(qry, "no", "asc");
                this.api.getPumpPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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
	.div-search {
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
    .listItem{
        background: #ffffff;
        border-radius: 0.1rem;
        margin: 0 auto 0.15rem;
        width: 96%;
        overflow: hidden;
        .itemTop{
            padding: 0.1rem 0;
            width: 95%;
            margin: 0.15rem auto;
            >div:first-of-type{
                display: flex;
                align-items: center;
                padding: 0.1rem 0;
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
            >p{
                width: 100%;
                display: flex;
                align-items: center;
                padding: 0.1rem 0;
                >span{
                    width: 1.3rem;
                    display: inline-block;
                    flex-shrink: 0;
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

