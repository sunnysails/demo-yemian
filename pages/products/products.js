import request from '../../lib/request';
import WxParse from '../../wxParse/wxParse';
import serviceData from '../../data/config';
Page({
    data: {
        product: "",
        current: 1
    },
    onLoad: function (e) {
        console.log("products-onLoad")
        var id = e.id;
        var product = serviceData.productData
        product.goods_price = product.goods_price.toFixed(2);
        this.setData({
            product,
            wxParseData: WxParse('html', product.goods_detail),
            cartNum: 2
        })
    },
    currentChange(e) {
        // console.log(e)
        this.setData({
            current: e.detail.current + 1
        })
    }
})