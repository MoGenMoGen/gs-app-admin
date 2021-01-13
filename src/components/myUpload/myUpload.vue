<template>

<!--        我自己写的图片上传组件,图片上传其实是在android端上传的-->
        <div class="upload">
            <div class="imgbox" v-for="(item,index) in list" :key="index">
                <img class="img-show" :src="item" @click="showBig(item)">
<!--                stop阻止事件冒泡-->
                <img class="img-del" :src="del" @click.stop="deletePic(item)">
            </div>

<!--            这里要对打开相册显示这个按钮进行约束
                1、当图片数量超过可以传送的最大值的时候不显示
                2、当js在调用android的时候可以显示，但是点击无效，因为android那一段上传图片会有一个时差

-->
            <div class="imgbox" v-if="list.length<3"><img class="img-show" :src="yulan" @click="addPic"></div>

            <!--                遮罩层-->
            <div class='popContainer' v-if="preview" @click="closePop">
                <img class="img-big" :src="preImg">

            </div>

        </div>


</template>

<script>
    import yulan from "./img/yulan.png"
    import del from "./img/delete.png"
    export default {
        name: "myUpload",
        props:{
            list:{
                type:Array,
                //Type是对象/数组的PROPS必须使用工厂函数返回默认值
                default:()=>[],
            },
        },
        model:{
            //prop是父组件v-model绑定的值，event你可以理解为子组件对v-model绑定值赋值的绑定事件
            prop:'list',
            event:'revert'
        },
        data(){
            return{
                maxPic:3,//可显示的最大图片数量，
                preImg:'',//遮罩层图片
                preview:false,
                yulan,//添加图片图标
                del,//删除图标
                // list:[
                //     "https://www.zjfld.net:6143//upload/202002/caa78d98d2864f66a9043d8b3a0293ce.jpg",
                //     "https://www.zjfld.net:6143//upload/202002/38d318f7dc4d4f8aad8410f593c20b66.jpg",
                //     "https://www.zjfld.net:6143//upload/202002/26c18a928b2940deb316ccc076aead76.png",
                // ]
            }
        },
        mounted(){
            // 不能在挂载的时候注册js，要在点击的时候注册js
            // this.getAPPDate()
        },
        methods:{
            /*
            子组件中注册桥好像有问题
             */
            getAPPDate(){
                this.$bridge.registerHandler('js_image', (data, responseCallback) => {
                    this.list.push(data);
                    this.$emit('revert',this.list);
                    responseCallback("")
                })
            },

            //关闭遮罩层
            closePop(){
              this.preview=false
            },
            //放大图片
            showBig(item){
                // 就添加一个历史记录
                this.preImg=item;
                this.preview=true
            },
            //按下返回键
            onBrowserBack(){
                this.preview=false
            },
            deletePic(item){
                for(let i=0;i<this.list.length;i++){
                    if(item==this.list[i]){
                        this.list.splice(i,1);
                        break
                    }
                }
                this.$emit('revert',this.list)

            },
            addPic(){
                /*
                注册js，注意不能在挂载的时候注册，要点击的时候注册js，否则会导致数据错乱
                 */
                this.getAPPDate()
                let msg = this.maxPic-this.list.length
                this.$bridge.callHandler('h5_imagepicker',msg,(res)=>{

                })


                // this.list.push("https://www.zjfld.net:6143//upload/202002/caa78d98d2864f66a9043d8b3a0293ce.jpg")
                // this.$emit('revert',this.list)
            }
        }
    }
</script>

<style scoped lang="less">
    .upload{
        background: white;
        margin-bottom: 0.1rem;
        display: flex;
        align-items: center;
        height: 1rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        position: relative;
        color: #666666;
        /*图片的盒子*/
        .imgbox{
            position: relative;
            margin-right: 0.5rem;
            width: 1rem;
            height: 1rem;
            /*显示的图片*/
            .img-show{
                position: absolute;
                top:0;
                width: 1rem;
                height: 1rem;
            }
            /*删除图标,删除图标要超出图片一点*/
            .img-del{
                position: absolute;
                right: 0;
                top:0;
                width: 0.3rem;
            }

        }
    /*    遮罩层*/
        .popContainer{
            position: fixed;
            z-index: 201;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            /*放大的图片*/
            .img-big{
                position: absolute;
                /*绝对定位垂直居中*/
                top: 50%;
                /* 50%为自身尺寸的一半 */
                transform: translateY(-50%);
                /*只设置宽，不设置高，实现自适应*/
                width: 100%;
            }

        }

    }
</style>
