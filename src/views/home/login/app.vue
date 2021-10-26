<template>
    <div class="login">
        <div class="form">
            <div style="height: 200px"></div>
            <van-row gutter="10">
                <van-col span="3">
                    <van-icon :name="logo" size="20"></van-icon>
                </van-col>
                <van-col span="21"><p class="p" style="white-space: nowrap">宁波二次供水智慧管理</p></van-col>
            </van-row>
            <div style="height: 50px"></div>
            <van-field left-icon="contact" v-model="form.username" label="|" placeholder="请输入用户名" label-width="20"></van-field>
            <div style="height: 10px"></div>
            <van-field left-icon="closed-eye" v-model="form.password" label="|" type="password" placeholder="请输入密码" label-width="20"></van-field>
            <div style="height: 30px"></div>
            <van-button type="info" round block @click="login">登录</van-button>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import userIcon from "./img/user-icon.png";
    import pwdIcon from "./img/pwd-icon.png";
    import logo from "./img/logo.png";
    import {Toast} from 'vant';

    export default {
        data() {
            return {
                userIcon,
                pwdIcon,
                logo,
                form: {
                    username: "",
                    password: ""
                }
            };
        },
        mounted(){
            this.getForm();
        },
        methods: {
            getForm(){
                if (JSON.parse( this.until.loGet("pass")) != null){
                    this.form.username = JSON.parse( this.until.loGet("pass")).username;
                    this.form.password = JSON.parse( this.until.loGet("pass")).password;
                }
            },

            login2(){
                this.form.imei="60b55be1ac54a468"
                this.form.username="huyimin"
                this.form.password="Julianhym@123"
                this.api.getSysLogin(this.form).then(res => {
                    if (res.code === 200) {
                        Toast('登录成功');
                        this.until.loSave("userInfo", JSON.stringify(res.data.userInfo));
                        this.until.loSave("pass", JSON.stringify(this.form));
                        let temp = {
                            userId: res.data.userInfo.userId,
                            token: res.data.token,
                        };

                        this.app.InterfaceName('h5_userinfo',temp);
                        this.until.replace("./index.html");
                    } else {
                        Toast.fail(res.msg);
                    }
                });
            },


            login() {
                this.$bridge.callHandler("h5_androidId","",androidId=> {
                    console.log('androidId：', androidId)
                    this.form.imei=androidId
                    this.api.getSysLogin(this.form).then(res => {
                        if (res.code === 200) {
                            Toast('登录成功');
                            this.until.loSave("userInfo", JSON.stringify(res.data.userInfo));
                            this.until.loSave("pass", JSON.stringify(this.form));
                            let temp = {
                                userId: res.data.userInfo.userId,
                                token: res.data.token,
                            };

                            this.app.InterfaceName('h5_userinfo',temp);
                            this.until.replace("./index.html");
                        } else {
                            Toast(res.msg);
                        }
                    });

                })


            }
        },
        components: {}
    };
</script>

<style scoped lang="less">
    .van-cell {
        border-radius: 6px;
    }
    .form {
        width: 70%;
        margin-left: 15%;
        z-index: 999;
    }
    .p {
        font-size: 20px;
        color: white;
        //text-shadow: black 0.1em 0.1em 0.2em
    }
    .login {
        background: url("./img/bg.png") no-repeat;
        height: calc(100vh);
        background-size: cover;
    }
</style>
