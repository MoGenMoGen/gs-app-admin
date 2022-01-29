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
      <van-field left-icon="contact" v-model="form.username" label="|" placeholder="请输入用户名"
                 label-width="20"></van-field>
      <div style="height: 10px"></div>
      <van-field left-icon="setting-o"   v-model="form.password" label="|" :type="passwordType?'password':'text'" placeholder="请输入密码"
                 label-width="20">
        <van-icon  slot="button"  :name="passwordType ? 'closed-eye' : 'eye-o'" @click="passwordType=!passwordType"/>
      </van-field>
      <div style="height: 10px"></div>
      <van-field left-icon="other-pay" v-model="form.code" label="|" placeholder="请输入验证码"
                 label-width="20"></van-field>
      <div style="height: 10px"></div>
      <div @click="refreshCode">
        <sidentify :identifyCode="identifyCode"></sidentify>
      </div>
      <div style="height: 10px"></div>

      <van-button type="info" round block @click="login">登录</van-button>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import userIcon from "./img/user-icon.png";
import pwdIcon from "./img/pwd-icon.png";
import logo from "./img/logo.png";
import {Toast} from 'vant';
import CryptoJS from 'crypto-js'
import sidentify from "./sidentify";

export default {
  data() {
    return {
      userIcon,
      pwdIcon,
      logo,
        passwordType:true,
      identifyCode: '',
      form: {
        username: "",
        password: "",
        code: "",
        userCode: ''
      },
    };
  },
  mounted() {
    this.refreshCode()
    this.getForm();
  },
  methods: {

    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.form.userCode = this.randomNum(10000, 99999)
      this.api.getUrl('/general/access/getCode?userCode=' + this.form.userCode).then(res => {
        this.identifyCode = res.data
      })
    },


    // 加密函數
    encrypt(word) {
      let keyStr = '4cc36760803f4b39aa60dcae1dca161a'
      if (word instanceof Object) {
        //JSON.stringify
        word = JSON.stringify(word)
      }
      var key = CryptoJS.enc.Utf8.parse(keyStr)
      var encryptedObj = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(word), key,
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          },
      )
      return encryptedObj.toString()
    },
    //解密
    decrypt(word) {
      //解密
      let keyStr = '4cc36760803f4b39aa60dcae1dca161a';
      var key = CryptoJS.enc.Utf8.parse(keyStr);
      var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },


    getForm() {
      console.log(13123123)
      if (JSON.parse(this.until.loGet("pass")) != null) {
        this.form.username = JSON.parse(this.until.loGet("pass")).username;
        this.form.username = this.decrypt(this.form.username)
        this.form.password = JSON.parse(this.until.loGet("pass")).password;
        this.form.password = this.decrypt(this.form.password)
      }
    },

    login2() {
      if (!this.form.code) {
        return Toast.fail("请输入验证码!")
      }
      if (this.form.code != this.identifyCode) {
        this.refreshCode()
        return Toast.fail("验证码错误!")
      }
      let param = JSON.parse(JSON.stringify(this.form))
      param.imei = "60b55be1ac54a468"
      param.password = this.encrypt(this.form.password)
      param.username = this.encrypt(this.form.username)
      this.api.getSysLogin(param).then(res => {
        if (res.code === 200) {
          Toast('登录成功');
          this.until.loSave("userInfo", JSON.stringify(res.data.userInfo));
          this.until.loSave("pass", JSON.stringify(this.form));
          let temp = {
            userId: res.data.userInfo.userId,
            token: res.data.token,
          };

          this.app.InterfaceName('h5_userinfo', temp);
          this.until.replace("./index.html");
        } else {
          Toast.fail(res.msg);
        }
      });
    },


    login() {

      if (!this.form.code) {
        return Toast.fail("请输入验证码!")
      }
      if (this.form.code != this.identifyCode) {
        this.refreshCode()
        return Toast.fail("验证码错误!")
      }
      this.$bridge.callHandler("h5_androidId", "", androidId => {
        this.form.imei = androidId
        this.form.password = this.encrypt(this.form.password)
        this.form.username = this.encrypt(this.form.username)
        this.api.getSysLogin(this.form).then(res => {
          if (res.code === 400) {
            this.refreshCode()
            this.form.username = ''
            this.form.password = ''
            this.form.code = ''
            Toast(res.msg);
          }
          if (res.code === 200) {
            Toast('登录成功');
            this.until.loSave("userInfo", JSON.stringify(res.data.userInfo));
            this.until.loSave("pass", JSON.stringify(this.form));
            let temp = {
              userId: res.data.userInfo.userId,
              token: res.data.token,
            };
            this.app.InterfaceName('h5_userinfo', temp);
            this.until.replace("./index.html");
          }
        });
      })


    }
  },
  components: {sidentify}
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
