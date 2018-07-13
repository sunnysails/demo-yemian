// //app.js
// App({
//   onLaunch: function () {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })
import promiseFromWXCallback from './lib/promiseFromWXCallback';
import request from './lib/request';
import resource from './lib/resource';

const login = promiseFromWXCallback(wx.login);
const getUserInfo = promiseFromWXCallback(wx.getUserInfo);
const wxRequest = promiseFromWXCallback(wx.request);
// app.js

App({
  data : {
    token : null,
  },
  onLaunch() {
    console.log('第一次初始化');
    this.getLoginInfo();
  },
  //获取登陆用户信息
  getLoginInfo() {
    var code = null;
    var indexData = require("/data/config.js");
    this.globalData.shopInfo = indexData.configData;
    return login()
      .then((res) => { code = res.code; return getUserInfo();})
      .then(({ userInfo }) => {
        var param = userInfo;
        //code ='the code is a mock one'; //默认code
        param.code = code;
        param.app_id = this.globalData.appId;
        //向服务云拿取用户
        return resource.getUserInfo(param);
     
      }) .then((promisData) => {
        console.log(promisData);
        if(promisData.statusCode == 200) {
          
           this.globalData.userInfo = promisData.data;
           wx.setStorage({
              key:"token",
              data:promisData.data.token,
            });
            this.globalData.token = promisData.data.token;
            this.setData({token:promisData.data.token});
        } else {
          console.log(promisData);
        }
        //return  request({path:'/config?shop_id' + this.globalData.shop_id});
      },(promis) => {
        console.log(promis);
      },(p) => {
        console.log(p);
      });
     
  },
  getUserInfo() {
    return login()
      .then(() => getUserInfo())
      .then(({ userInfo }) => {
        this.globalData.userInfo = userInfo;
        return userInfo;
      });
  },
  globalData: {
    userInfo: null,
    token: null,
    shop_id: 1,
    shopInfo: {
      index_recommend_title: '优选水果',
    },
    appId:'wx3bce24d137585996',
    appSecret:'09ca5f5b8610ea7d79f5870499b368c0'
  },
});
