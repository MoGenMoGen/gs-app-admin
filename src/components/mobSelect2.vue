<template>
    <!--    基于vant 的弹出选择器 mobSelect升级版，可以输入文本和筛选
用法：
 <mob-select text="nm" :list="testList"
        v-model="goodsNm" @change="change"
        place="产品名称选择" :disable-input="disableInput"
 ></mob-select>
        测试的列表：
        testList:[{   id:0,nm:'非常满意',},{   id:1,nm:'比较满意',},{   id:2, nm:'一般',},{    id:3, nm:'不满意',}]

        参考例子在page4页面
        -->

    <div id="select">
        <van-row @click="showPicker = true" class="select-row" >
            <van-col span="22" >
<!--                input绑定父子组件 注意用value属性-->
                <input  :value="name" :placeholder="tmpPlace"  @input="search" :disabled="disableInput">
            </van-col>
            <van-col span="2">
                <van-icon name="arrow-down" color="#C0C4CC" />
            </van-col>
        </van-row>
        <van-popup v-model="showPicker" position="bottom":style="{ height: '40%' }">
            <van-picker
                    :value-key="text"
                    show-toolbar
                    :columns="tmpList"
                    @cancel="onCancel"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {

                showPicker: false,
                tmpList:[],//临时列表，过滤后的列表
                tmpPlace:'请选择',//临时占位符
                hasChecked:false,//标记是否已经选过

            };
        },
        props:{
            //默认值
            name:{
                type:String,
                default: ""
            },
          //  键值，需要显示的选中值的属性名
          text:{
              type:String,
          },
          //  数组选择器显示的数组
          list:{
              type:Array,

          },
            //占位提示
            place:{
                type:String,
                default:"请选择"
            },
            //是否可以输入，默认禁用
            disableInput:{
                type:Boolean,
                default:true
            }

        },
        watch:{
            list:{
                //.第一个handler：其值是一个回调函数。即监听到变化时应该执行的函数。
                handler:"filt",
                //确认是否以当前的初始值执行handler的函数。 immediate:true必须添加
                immediate:true

            },
            //深度监听
            place:{
                handler(newVal,oldVal){
                    this.tmpPlace=newVal
                },
                deep:true,//对象内部的属性监听，也叫深度监听

            },

            name(newVal){
                //如果弹框没有打开，并且内容并清空，说明是父组件修改了name的值,此时恢复tmpPlace的值
                if(!this.showPicker && newVal==''){
                    this.tmpPlace=this.place
                }
                this.tmpList=this.list.filter(item=>{
                    return item[this.text].search(newVal)!=-1
                })
            },

            showPicker(newVal,oldVal){
                //弹出弹框后清除name的值
                if(newVal && !oldVal){
                    this.$emit('revert', "")
                    if(this.name){
                        //如果一开始就有初始值，则弹出弹框后标记已经选中，否则不选取消弹框后name的值会消失
                        this.hasChecked=true
                        this.tmpPlace=this.name
                    }
                }
                //弹框关闭后
                if(!newVal && oldVal){
                    if(this.hasChecked){
                        //选中后的值由item传递给tmpPlace，再有tmpPlace传递给name
                        this.$emit('revert',this.tmpPlace)
                    }else {
                        this.$emit('revert',"")
                    }
                }


            }
        },
        model: {
            prop: 'name',
            //这个事件名可以随意写，它实际上是规定了子组件要更新父组件值需要注册的方法
            event: 'revert'
        },

        methods: {

            //过滤
            filt(newVal){
                console.log("执行过滤器。。。")
                if(newVal){
                    this.tmpList=newVal.filter(item=>{
                        return item[this.text].search(this.name)!=-1
                    })
                }

            },
            search(event){
                //首先更新name的值
                this.$emit('revert', event.target.value)
            },

            onConfirm(item) {
                //存在列表的情况下

                if(this.tmpList.length>0){

                    this.hasChecked=true
                    //this.$emit('revert',item[this.text])代替this.name = item[this.text];
                    this.tmpPlace=item[this.text]
                    // this.$emit('revert',item[this.text])
                    this.$emit("change",item)
                }
                this.showPicker = false;

            },
            //按下取消键
            onCancel(){
                this.showPicker = false
                // //回复name的值
                // this.$emit('revert',this.tmpPlace)
            }
        },

    };
</script>

<style lang="less" scoped>
    #select {
        box-sizing: border-box;
        width: 100%;
        border-radius: 5px;
        /*border: 1px solid rgba(0,0,0,0.1);*/
        padding: 0rem 0;
        /*padding: 8px 0;*/
        .select-row{
            input{
                width: 100%;
                color: #343434;
                border: none;
                background: none;
            }
            input::-webkit-input-placeholder {
                color: #B8B8B8;
            }

            input::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #B8B8B8;
            }

            input:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #B8B8B8;
            }

            input:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #B8B8B8;
            }
        }
    }
</style>
