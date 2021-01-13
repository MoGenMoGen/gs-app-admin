<template>
    <div class="itemWarp flex_mid" :class="{active:sel==page}" @click='changePage'>
		<span v-show='!bol'>
			<slot name='normalImg'></slot>
		</span>
        <span v-show='bol'>
			<slot name='activeImg'></slot>
		</span>
        <span v-text='txt'></span>
    </div>

</template>

<script>
    export default {
        name: "item",
        props:{
            //文本
            txt:{
                type:String
            },
            //页码，是指每一个item标记
            page:{
                type:String
            },
            //选中
            sel:{
                type:String
            }
        },
        computed:{
            bol: function(){
                if(this.sel == this.page){
                    return true;
                }
                return false;
            }
        },
        methods:{
            changePage:function(){
                /*
                点击跳转对应的页面，如果是点击已经选中的路由，那么不跳转，否则报错，“/”代表首页
                */
				 if(this.sel != this.page) {
					this.$router.replace({
                        path:'/'+this.page,
                    });
				 }
                /*
                为使用$ emit触发父组件的自定义事件change，将this.page作为参数传递到父组件中。父组件点击获取到传递过来的参数。
                再props传递给item.vue组件。在computed计算属性中。返回不同的布尔值。来做底部图片的显示隐藏。
                 */
                this.$emit('change',this.page)

            }
        }

    }
</script>

<style scoped lang="less">
    .itemWarp{
		height: 100%;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
		color: #999999;
    }
    .itemWarp span{

        font-size: 0.32rem;
    }
	.active{
		color: #106FB8;
		border-bottom: 2px solid #106FB8;
	}


</style>
