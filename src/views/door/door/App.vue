<template>
    <div id="container">
        <van-sticky>
            <my-header title="门禁监控" @back="back" :search-status="false"> </my-header>
          <van-search v-model="searchData.pumpNm" placeholder="请输入门禁点名称搜索" @input="search" />
        </van-sticky>

        <van-list  v-model="loading"  :finished="finished" finished-text="没有更多了"   @load="onLoad"  :immediate-check="immediate"  style="margin-top: 0.2rem">
            <div   v-for="(item,index) in dataList" :key="index" @click="toDetail(item)" class="listItem">
                <div class="itemTop">
                    <van-tag type="success" v-if="item.pumpId !== null">已关联</van-tag>
                    <van-tag type="warning" v-if="item.pumpId === null">未关联</van-tag>
                    <p>门禁点名称：{{item.doorName}}</p>
                </div>
                <div class="itemContent">
                    <van-button  type="info" size="small" @click="operateDoor(item.doorUuid,2)">开门</van-button>
                    <van-button  type="warning" size="small" @click="operateDoor(item.doorUuid,1)">关门</van-button>
                </div>

                <!--<van-cell-group>-->
                    <!--<van-field label="门禁点名称:" v-model="item.doorName" readonly :border="false"> </van-field>-->
                    <!--<van-field label="小区名称:" v-model="item.deviceName" readonly :border="false" right-icon="arrow"> </van-field >-->
                    <!--<van-field v-if="item.pumpId !== null" label="关联状态" value="已关联" readonly :border="false">-->
                        <!--<template #button>-->

                        <!--</template>-->
                    <!--</van-field>-->
                    <!--<van-field v-if="item.pumpId === null" label="关联状态" value="未关联" readonly :border="false">   </van-field>-->
                    <!--<van-button block style="height: 5px" color="#F3F3F3"></van-button>-->
                <!--</van-cell-group>-->
            </div>
        </van-list>
      <!--搜索弹窗-->
<!--      <van-popup v-model="searchShow" position="bottom" :style="{ height: '80%' }" closeable round close-icon="close">-->
<!--        <van-form @submit="search" style="margin-top: 50px">-->
<!--          <van-field label="门禁点名称:" v-model="searchData.pumpNm" clearable></van-field>-->
<!--          <div style="margin: 16px;">-->
<!--            <van-button round block type="info" native-type="submit">-->
<!--              提 交-->
<!--            </van-button>-->
<!--          </div>-->
<!--        </van-form>-->
<!--      </van-popup>-->


    </div>
</template>

<script>
    import myHeader from "../../../components/myHeader/myHeader";
    import { Dialog ,Toast } from 'vant';
    export default {
        components: {myHeader},
        name: "door",
        data() {
            return {
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
        methods: {
            operateDoor(id, v){
                Dialog.confirm({
                    title: '注意',
                    message: '是否确认操作？'
                }).then(() => {
                    this.api.operateDoor(id,v).then(res => {
                        if (res.code === 200) {
                            Toast('操作成功')
                        }
                    })

                }).catch(() => {
                    // on cancel
                });
            },



            search() {
                //this.searchShow = false;
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
                    this.query.toW(qry, "doorName", this.searchData.pumpNm, "LK");
                }
                this.query.toP(qry, this.pageNo, this.pageSize);
                this.api.getPumpDoor(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
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

            p{
                margin-left: 0.2rem;
            }
        }

        .itemContent{
            width: 95%;
            margin: 0 auto;
            border-top:1px solid #E9E9E9;
            display: flex;
            flex-wrap: wrap;
            padding: 0.2rem 0;
           button{
               margin-right: 0.2rem;
           }
        }
    }
</style>

