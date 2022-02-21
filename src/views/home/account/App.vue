<template>
  <div id="container">
<!--    <van-nav-bar  title="个人中心"  />-->
    <my-header title="个人中心" :search-status="false" :showLeft="false">    </my-header>
<!--      <van-icon name="arrow-left" ></van-icon>-->

    <div class="account">
      <div class="avatar-info">
        <div class="avatar-img">
          <img :src="avatar" alt />
        </div>
        <div class="user-info">
          <div>
            <p>
              <span>姓名：</span>
              <span>{{info.nickname}}</span>
            </p>
            <p>
              <span>手机：</span>
              <span>{{info.mob}}</span>
            </p>
            <p>
              <span>部门：</span>
              <span>{{info.arg2}}</span>
            </p>
          </div>
<!--          <img :src="arrow" alt />-->
        </div>
      </div>
      <div class="change-pwd">
        <img :src="changePwd" alt />
        <div @click="show = true">
          <p>修改密码</p>
          <img :src="arrow" alt  />
        </div>
      </div>
      <div class="about-us">
        <img :src="aboutUs" alt />
        <div>
          <p>关于我们</p>
          <img :src="arrow" alt />
        </div>
      </div>
      <div class="operate">
        <button @click="quit">退出</button>
      </div>
<!--      <div >-->
<!--        <button @click="test">测试</button>-->
<!--      </div>-->
    </div>
    <tab cd="user"></tab>

    <van-dialog v-model="show" title="修改密码" show-cancel-button @confirm="updPassword">
      <van-form >
        <van-field   v-model="passInfo.password"  name="原始密码"
                     label="原始密码"   placeholder="原始密码"
            :rules="[{ required: true, message: '请填写原始密码' }]"
        />
        <van-field   v-model="passInfo.newPassword"  name="新密码"
                     label="新密码"   placeholder="新密码"
                     :rules="[{ required: true, message: '请填写新密码' }]"
        />

      </van-form>

    </van-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast } from 'vant';
import aboutUs from "./img/about-us.png";
import arrow from "./img/arrow-right.png";
import avatar from "./img/avatar.png";
import changePwd from "./img/change-pwd.png";
  import myHeader from "../../../components/myHeader/myHeader";
export default {
  data() {
    return {
      title: "账号",
      aboutUs,
      arrow,
      avatar,
      changePwd,
      info:'',
      show:false,
      passInfo:{
        password:'',
        newPassword:'',
      },
    };
  },
  mounted(){
    this.getUserInfo();
  },
  methods: {
    test(){
      this.$bridge.callHandler('h5_up_location', "", (res) => {
        let parse = JSON.parse(res);
        Toast(parse.dlat+"***"+parse.dlon)

      })
    },
    getUserInfo(){
      let userId = JSON.parse( this.until.loGet("userInfo")).userId;
      this.api.getUserInfo(userId).then(res => {
        if (res.code === 200) {
          this.info = res.data;
        }
      });
    },
    updPassword(){
      if (this.passInfo.newPassword !== '') {
        if (!this.passwordValid(this.passInfo.newPassword)) {
          return
        }
      }


      this.api.updPassword(JSON.stringify(this.passInfo)).then(res => {
        if (res.code === 200) {
          Toast("修改成功");
          this.quit()
        }else {
          Toast(res.msg);
        }

      });

    },
    passwordValid (pass) {
      if (pass == null || pass.length < 8 || pass.length > 20 || pass.length === '') {
        this.$message.error('密码位数不对，长度最少8位，最大20位。')
        return false
      }
      // 是数字
      let isDigit = /^.*[0-9]+.*/
      // isLowerCase 小写字母
      let isLowerCase = /^.*[a-z]+.*/
      // isUpperCase 大写字母
      let isUpperCase = /^.*[A-Z]+.*/
      // 特殊字符
      let regEx = /^.*[^a-zA-Z0-9]+.*/
      // 记录匹配的次数
      let num = 0
      if (isDigit.test(pass)) {
        num = num + 1
      }
      if (isLowerCase.test(pass)) {
        num = num + 1
      }
      if (isUpperCase.test(pass)) {
        num = num + 1
      }
      if (regEx.test(pass)) {
        num = num + 1
      }
      if (num <= 3) {
        Toast('密码复杂度不足,\n(1)大写字母\n(2)小写字母\n(3)数字\n(4)特殊符号\n密码至少需包含上述情形中的三种')
        return false
      }
      return true
    },

    quit() {
      this.api.getSysLoginOut().then(res => {
        if (res.code === 200) {
          Toast("退出成功");
          setTimeout(() => {
            this.until.href("./login.html");
          }, 1500);
        }
      });
    }
  },
  components: {myHeader}
};
</script>

<style scoped lang="less">
@import "../../../assets/css/mobile.less";
#container {
  width: 100%;
  background: @bgColor;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  .account {
    width: 100%;
    height: 100%;
    > div {
      background-color: #fff;
    }
    .avatar-info {
      padding: 0.5rem 0.35rem 0.7rem;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      align-items: center;
      .avatar-img {
        width: 1.5rem;
        border: 0;
        border-radius: 50%;
        img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          vertical-align: middle;
        }
      }
      .user-info {
        margin-left: 0.3rem;
        flex: 1;
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        align-items: center;
        div {
          p {
            &:not(:nth-of-type(1)) {
              margin-top: 0.1rem;
            }
          }
        }
        img {
          margin-left: 0.3rem;
          width: 0.12rem;
          height: 0.22rem;
        }
      }
    }
    .change-pwd,
    .about-us {
      margin-top: 0.1rem;
      padding: 0.4rem;
      display: flex;
      display: -webkit-flex;
      flex-flow: row nowrap;
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      div {
        flex: 1;
        margin-left: 0.3rem;
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        align-items: center;
        p {
          flex: 1;
        }
        img {
          width: 0.12rem;
          height: 0.22rem;
        }
      }
    }
    .operate {
      width: 60%;
      margin: 50% auto 0;
      background-color: #f2f3f7;
      button {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        border: 1px solid #ddd;
        border-radius: 0.2rem;
        color: #999;
        font-size: 16px;
      }
    }
  }
}
</style>
