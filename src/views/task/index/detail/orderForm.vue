<template>
    <!--    工单详情-->
    <div>
        <my-header :title="title">
            <van-icon name="arrow-left" slot="left" color="white" @click="back"></van-icon>
        </my-header>
        <div class="content2">
            <div class="block2">
                <h2>工单信息</h2>
                <div><span>工单来源：</span>
                    <p>{{info.orderSource}}</p></div>
                <div><span>部门名称：</span>
                    <p>{{info.receivingNm}}</p></div>
                <div><span>派单时间：</span>
                    <p>{{info.crtTm}}</p></div>

                <div><span>工单时间：</span>
                    <p>{{info.orderDate}}</p></div>
                <div><span>工单时段：</span>
                    <p>{{info.orderSlot}}</p></div>

                <div><span>处理时限：</span>
                    <p>{{info.processingDeadline}}小时</p></div>
                <div><span>反映人：</span>
                    <p>{{info.reflecting}}</p></div>
                <div><span>联系人电话：</span>
                    <p>{{info.reflectingPhone}}</p></div>
                <div><span>故障现象分类：</span>
                    <p>{{info.fault}}</p></div>
                <div><span>行政区域：</span>
                    <p>{{info.administrativeDivision}}</p></div>
                <div><span>泵房名称：</span>
                    <p>{{info.pump}}</p></div>
                <div><span>发生地址：</span>
                    <p>{{info.occurrenceAddress}}</p></div>
                <div><span>问题详情：</span>
                    <p>{{info.problem}}</p></div>
                <div><span>接单备注：</span>
                    <p>{{info.remarks}}</p></div>
            </div>


            <div v-if="info.status2 === 2">
                <van-field v-model="info.arrivalTm2" center clearable readonly label="到场时间:">
                    <template #button>
                        <van-button size="small" type="primary" @click="getNewDate">获取当前时间</van-button>
                    </template>
                </van-field>

                <van-field readonly clickable label="故障类型"   :value="info.faultType2"  placeholder="选择故障类型"   @click="showPicker = true"></van-field>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker  show-toolbar    :columns="zList"  @cancel="showPicker = false"  @confirm="onConfirm"></van-picker>
                </van-popup>

                <van-field readonly clickable label="故障原因"   :value="info.cause2"  placeholder="选择故障原因"   @click="showPicker2 = true"></van-field>
                <van-popup v-model="showPicker2" position="bottom">
                    <van-picker  show-toolbar    :columns="yList"  @cancel="showPicker2 = false"  @confirm="onConfirm2"></van-picker>
                </van-popup>

                <van-field v-model="info.means2" label="排查手段:"  placeholder="请输入排查手段" type="textarea"  rows="2"></van-field>
                <van-field v-model="info.processingRecords2" label="处理记录:"  placeholder="请输入处理记录" type="textarea"  rows="3"></van-field>
                <van-field name="uploader" label="处理前照片">
                    <template #input>
                        <my-upload v-model="imgList1"></my-upload>
                    </template>
                </van-field>
                <van-field name="uploader" label="处理后照片">
                    <template #input>
                        <my-upload v-model="imgList2"></my-upload>
                    </template>
                </van-field>
            </div>






            <van-button type="info" block @click="acceptTask" v-if="info.status2 === 1">接单</van-button>
            <van-button type="primary" block @click="submit" v-if="info.status2 === 2">提交</van-button>

        </div>
    </div>
</template>

<script>
    import {Dialog, Toast, ImagePreview,Notify } from 'vant';
    import myUpload from "../../../../components/myUpload/myUpload";
    import myHeader from "../../../../components/myHeader/myHeader";
    export default {
        name: "orderForm",
        props: ["id", "type"],
        data() {
            return {
                showPicker: false,
                showPicker2: false,

                imgList1: [],
                imgList2: [],//处理后图片集合
                uploader: [],
                uploader2: [],
                imgUrl: '',
                fileList: [],
                show: false,
                imgShow: false,
                title: '工单详情',
                info: {},
                zList:[],
                yList:[],

            }
        },
        components: {
            myHeader, Dialog, Toast, myUpload
        },
        mounted() {
            this.getInfo(this.id);
            this.getInit()
        },
        methods: {
            onConfirm(value) {
                this.info.faultType2 = value;
                this.showPicker = false;
            },
            onConfirm2(value) {
                this.info.cause2 = value;
                this.showPicker2 = false;
            },
            //获取故障类型和故障原因
            getInit(){
                this.api.getDeptList(110).then(res => {
                    if (res.code === 200) {
                        let list = res.data.list;
                        for (let i = 0; i <list.length ; i++) {
                            this.zList.push(list[i].nm)
                        }

                    }
                });
                this.api.getDeptList(111).then(res => {
                    if (res.code === 200) {
                        let list = res.data.list;
                        for (let i = 0; i <list.length ; i++) {
                            this.yList.push(list[i].nm)
                        }
                    }
                })
            },



            //接单
            acceptTask() {
                this.api.orderReceipt(this.id).then(res => {
                    if (res.code === 200) {
                        this.info.status2 = 2;
                    }
                })
            },
            getNewDate() {
                this.info.arrivalTm2 = this.until.dateFormat(new Date());
            },

            lookImg(item) {
                ImagePreview([
                    item
                ]);
            },
            //数组转字符串，逗号隔开
            changeArray(list){
                if(list){
                    let str='';
                    if(list.length>=1){
                        list.forEach(item=>{
                            str=str+item+","
                        })
                    }
                    if(str){
                        str = str.substring(0,str.length - 1)
                    }
                    return str
                }
                return  list
            },



            //工单提交
            submit() {

                if (this.info.faultType2 == null){
                    return Toast('请输入故障类型');
                }
                if (this.info.cause2 == null){
                    return Toast('请输入故障原因');
                }
                if (this.info.processingRecords2 == null){
                    return Toast('请输入处理记录');
                }
                if (this.info.arrivalTm2 == null){
                    return Toast('请输入到场时间');
                }
                this.info.img3 = this.changeArray(this.imgList1);
                this.info.img4 = this.changeArray(this.imgList2);


                Dialog.confirm({
                    title: '标题',
                    message: '确认提交？'
                }).then(() => {
                    this.api.submissionOrder(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success("提交成功");
                            this.back();
                            //调用父组件刷新列表方法
                            //this.$emit('getList');
                        } else {
                            Notify('提交失败');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });



            },


            search() {

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

    /*
        弹框，内容区域
         */
    .content2 {
        /*每一个循环块*/
        background: #F0F0F0;
        height: 100%;

        .block2 {
            background: white;
            border-bottom: 0.25rem solid #F0F0F0;
            /*顺序为上右下左（顺时针）。*/
            padding-top: 0.3rem;
            padding-bottom: 0.2rem;
            position: relative;

            /*每一条数据
            不包括最后一条*/

            div {
                font-size: 14px;
                padding-bottom: 0.2rem;
                padding-left: 0.4rem;
                padding-right: 0.4rem;
                display: flex;
                /*左侧label*/

                span {
                    /*flex: 6;*/
                    color: #999999;


                }

                /*右侧内容*/

                p {
                    color: #333333;


                    /*flex: 14;*/


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
