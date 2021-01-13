<template>
    <div id="container">
        <van-sticky>
            <my-header title="泵房试压记录表" @back="back" :search-status="false"> </my-header>
        </van-sticky>
        <van-cell-group>
            <van-button block style="height: 10px" color="#F3F3F3"></van-button>
            <van-cell>泵房试压记录表</van-cell>
            <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" :preview-size="120"></van-uploader>
            <van-row gutter="2"  v-if="info.status !== '已提交'">
                <van-col span="12">
                    <van-button type="primary" color="#00CED1" block @click="keep">保存</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="primary" color="#008B8B" block @click="submit">提交</van-button>
                </van-col>
            </van-row>
        </van-cell-group>



    </div>
</template>

<script>
    import myUpload from "../../../components/myUpload/myUpload";
    import myHeader from "../../../components/myHeader/myHeader";
    import { Toast,Dialog } from 'vant';
    export default {
        name: "e3",
        components: {myHeader,myUpload},
        data() {
            return {
                fileList: [

                ],
                showPicker: false,
                showPicker2: false,
                showSign:false,
                showSign2:false,
                currentDate: new Date(),
                imgList: [],
                info:{
                    img:'',
                    val4:'',
                    val8:'',
                    status:''
                }
            };
        },
        mounted() {
            this.getInfo(this.id)
        },
        props: ["id"],
        methods: {
            afterRead(item) {
                // 此时可以自行将文件上传至服务器
                let param = new FormData();
                param.append("file", item.file);
                this.until.postImg("/general/oss/upload", param).then(
                    res => {
                        if (res.code === 200){
                            Toast.success('上传成功');
                            this.info.img = res.data;

                        }
                    }
                );

            },
            getInfo(id){
                let qry = this.query.new();
                this.query.toW(qry, 'earlyId', id, "EQ");
                this.api.getE3(encodeURIComponent(this.query.toJsonStr(qry))).then(res => {
                    if (res.code === 200) {
                        this.info = res.data.list[0];
                        if (this.info.img != null){
                            let url = {
                                url: this.info.img
                            };
                            this.fileList.push(url)
                        }



                    }
                })
            },
            //提交
            submit(){
                // this.info.img = this.changeArray(this.imgList);
                Dialog.confirm({
                    title: '注意',
                    message: '确定提交？'
                }).then(() => {
                    this.info.status = '已提交';
                    this.api.updE3(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('提交成功');
                            this.$emit('closeInfo')
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            //保存
            keep(){
                this.info.status = '保存';
                Dialog.confirm({
                    title: '注意',
                    message: '确定保存？'
                }).then(() => {
                    this.api.updE3(JSON.stringify(this.info)).then(res => {
                        if (res.code === 200) {
                            Toast.success('保存成功');
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },

            back() {
                this.$emit('closeInfo')
            },
        }
    };
</script>

<style lang="less" scoped>
    .van-cell{
        font-size: 10px;
    }
    .span{
        color: #999999;
        font-size: 10px;
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

