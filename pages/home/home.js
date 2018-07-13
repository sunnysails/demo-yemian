import Promise from '../../lib/promiseEs6Fix';
import request from '../../lib/request';
import resource from '../../lib/resource';
import serviceData from '../../data/config';
var app = getApp();
Page({
  data: {
    shop_id: app.globalData.shop_id,
    shop_info: [],
    banners: [],
    activities: [],
    features: [],
    currentPage: 1,
  },
  onLoad() {
    console.log("home-onLoad")
    this.setData({
      shop_info: app.globalData.shopInfo
    });
    this.setData({
      banners: serviceData.bannerData,
      activities: serviceData.activityData,
      features: serviceData.featureData
    });
  }
})