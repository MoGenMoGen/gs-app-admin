<template>
    <div id="container">
<!--        <van-nav-bar   title="泵房档案"   fixed   left-arrow  @click-left="back"/>-->

        <van-sticky>
            <my-header title="泵房档案" @back="back"  :searchStatus="false"> </my-header>
        </van-sticky>
        <!--详情弹窗-->
            <van-cell-group style="margin-top: 50px">
                <van-field v-model="info.no" label="泵房编号:" readonly label-width="120"></van-field>
                <van-field v-model="info.nm" label="泵房名称:" readonly label-width="120"></van-field>
                <van-field v-model="info.guarantee" label="是否过保:" readonly label-width="120"></van-field>
                <van-field v-model="info.region" label="行政区域:" readonly label-width="120"></van-field>
                <van-field v-model="info.waterArea" label="供水区域:" readonly label-width="120"></van-field>
                <van-field v-model="info.estateNm" label="小区名称:" readonly label-width="120"></van-field>
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
                <van-field v-model="info.broadbandAccount" label="宽带账号:" readonly label-width="120"></van-field>
                <van-field v-model="info.broadbandPassword" label="宽带密码:" readonly label-width="120"></van-field>
                <van-field v-model="info.broadbandOperator" label="宽带运营商:" readonly label-width="120"></van-field>
                <van-field v-model="info.networkType" label="网络类型:" readonly label-width="120"></van-field>
                <van-field v-model="info.lng" label="经度:" readonly label-width="120">
                </van-field>
                <van-field v-model="info.lat" label="维度:" readonly label-width="120">
                </van-field>
                <van-field v-model="info.pumpLocation" label="泵房位置:" readonly label-width="120" type="textarea" rows="2"></van-field>
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
        <van-empty description="未找到对应的泵房信息" v-if="show"  />

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
                info: {},
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
            this.getInfo();
        },
        methods: {
            getInfo(){
                let pumpNo = this.getQueryString("pumpNo");
                this.api.getPumpQrInfo(pumpNo).then(res => {
                    if (res.code === 200) {
                        if (res.data === null){
                            this.show = true;
                        }else {
                            this.info = res.data;
                        }
                    }
                })
            },
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
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
                this.$bridge.callHandler('h5_baidumap', JSON.stringify(temp),res=>{

                })
            },

            showImg(val) {
                ImagePreview([val]);
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

</style>

