// class setWx{
//   /*调用方式
//   * getWXms(interface)
//   *   .then(json=>{
//   *     调用微信接口
//   *   })
//   * */
//   IsWx(){
//     let u = navigator.userAgent.toLowerCase();
//     let isWx = u.match(/MicroMessenger/i)=="micromessenger";
//     return isWx;
//   }
//   async getWXms(url,data,interface){
//     //验证是否微信环境
//     if(!this.IsWx()){
//       return '请在微信浏览器中打开'
//     }
//     //加载微信js
//     let script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
//     document.body.appendChild(script);
//     //获取权限验证配置
//     try {
//       let app = await this.post(url,data)
//         .then(data=> data,err=>err);
//     }catch (e){
//       return '获取微信参数失败'
//     }
//     //加载微信接口
//     try {
//       let flag = await this.LoadWechatJS(app,interface);
//       return flag;
//     }catch (e){
//       return '微信config接口验证失败'
//     }
//
//   }
//   LoadWechatJS(data,arrays){
//     let $q = new Promise((resolve,reject)=>{
//       wx.config({
//         debug:false,
//         appId:data.id,
//         timestamp:data.time,
//         nonceStr:data.str,
//         signature:data.signature,
//         jsApiList:arrays//要调用的微信接口
//       });
//       wx.ready(function(){
//         resolve('ok');
//       });
//       wx.error(function(res){
//         reject(res);
//       });
//     });
//     return $q;
//   }
//   //微信随机生成字符串
//   randomString(len=32){
//     let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
//     let maxPos = $chars.length;
//     let pwd = '';
//     for (let i = 0; i < len; i++) {
//       pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
//     }
//     return pwd;
//   }
// }
// export { setWx }
