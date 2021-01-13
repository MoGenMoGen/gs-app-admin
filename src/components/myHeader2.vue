<style lang="less" scoped>
    @import "../assets/css/mobile.less";

    .van-nav-bar {
        height: 74px;
        background: #1177B9;
    }
    .top-header{
        height: 0.5rem;
        width: 100%;
        background: #1177B9;
    }
    .van-nav-bar__title {
        max-width: 70%;
        margin: 0 auto;
        color: #323233;
        font-weight: 500;
        font-size: 16px;
    }
</style>

<template>
    <div>
        <div class='top-header'> </div>
        <van-nav-bar left-arrow>
            <slot slot="title"  name="title">
                <van-search style="margin-top: 20px" @input="searchPump" @focus="show = true" v-model="value" shape="round" background="#1177B9"
                            placeholder="搜索泵房名称"></van-search>
            </slot>

             <slot slot="left"  name="left">
                 <img v-if="show === false" :src="logo" style="margin-top: 15px" width="30px" alt=""/>
                 <van-icon v-if="show === true"  style="margin-top: 15px" name="arrow-left" color="#ffffff" size="30" @click="show = false"></van-icon>
             </slot>

            <slot slot="right"  name="right">
                <img :src="ma" style="margin-top: 15px" width="28px" @click="toMa" alt=""/>
            </slot>

        </van-nav-bar>
        <van-popup style="margin-top: 74px" :overlay="false" v-model="show" position="top" :style="{ height: '100%' }">
            <van-empty image="search" description="输入泵房名称" v-if="list.length === 0"></van-empty>

            <div v-for="(item,index) in list" :key="index">
                <van-cell-group>
                    <van-field label="泵房编号:" v-model="item.no" readonly :border="false">
                        <template #button>
                            <van-tag type="primary" @click="toNav(item)">去导航</van-tag>
                        </template>
                    </van-field>
                    <div @click="toDetail(item)">
                        <van-field label="泵房名称:" v-model="item.nm" readonly :border="false"></van-field>
                        <van-field label="小区名称:" v-model="item.estateNm" readonly :border="false"></van-field>
                        <van-field label="分区楼层:" v-model="item.partitionFloor" readonly :border="false"></van-field>
                        <van-field label="分区情况:" v-model="item.partitionSituation" readonly :border="false"></van-field>
                        <van-field label="供水模式:" v-model="item.arg2" readonly :border="false"></van-field>
                        <van-field label="物业电话:" v-model="item.propertyPhone" readonly :border="false"></van-field>
                        <van-field label="泵房地址:" v-model="item.pumpLocation" readonly :border="false" type="textarea" rows="2"></van-field>
                    </div>
                    <van-cell title="路线图:" center>
                        <template #default>
                            <van-row>
                                <van-col span="12">
                                    <van-image @click="showImg(item.pumpRoute)" v-if="item.pumpRoute != null && item.pumpRoute !== ''" width="80" height="80"
                                               :src="item.pumpRoute"></van-image>
                                </van-col>
                            </van-row>
                        </template>
                    </van-cell>
                    <van-button block style="height: 5px" color="#F3F3F3"></van-button>
                </van-cell-group>
            </div>


        </van-popup>

        <!--详情弹窗-->
        <van-popup v-model="show2" position="bottom" :style="{ height: '90%' }" closeable round close-icon="close">
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
                <van-field v-model="info.lng" label="经度:" readonly label-width="120"></van-field>
                <van-field v-model="info.lat" label="维度:" readonly label-width="120"></van-field>
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
        </van-popup>

    </div>
</template>
<script>
    import logo from './img/logo.png'
    import search from './img/search.png'
    import ma from './img/ma.png'

    export default {

        data() {
            return {
                info: {},
                show: false,
                show2: false,
                logo,
                search,
                value: '',
                ma,
                list:''
            }
        },
        mounted() {
        },
        methods: {
            toNav(item) {
                let temp = {
                    dlat: item.lat,
                    dlon: item.lng,
                    name: item.nm,
                };
                this.$bridge.callHandler('h5_baidumap', JSON.stringify(temp))
            },
            toDetail(item) {
                this.show2 = true;
                this.info = item;
            },
            searchPump(val) {
                if (val.length !== 0){
                    let qry = this.query.new();
                    this.query.toW(qry, "nm", this.value, "LK");
                    this.api.getPumpPage(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                        if (res.code === 200) {
                           this.list = res.data.list;

                        }
                    })

                }

            },
            toMa() {
                this.app.InterfaceName('h5_scanning', {})
                    .then(res => {
                        console.log(res)
                    }, err => {

                    });
            }
        }
    }
</script>
