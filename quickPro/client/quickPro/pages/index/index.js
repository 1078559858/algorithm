// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '随机数',
    random:{
      min:0,
      max:100,
      value:null
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    wx.showShareMenu();// 开启分享
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setRandomMin(e){
    this.setData({
      "random.min": e.detail.value,
    })
  },
  setRandomMax(e){
    this.setData({
      "random.max": e.detail.value,
    })
  },
  clickSure(){
    var maxNum = this.data.random.max;
    var minNum = this.data.random.min;

    if(minNum > maxNum){
      wx.showToast({
        title: '最大值比最小值大，请重新输入！',
        icon: 'none',
        duration: 1000,
        mask:true
      })
      return;
    }
    else if(maxNum === minNum){
      this.setData({
        "random.value": maxNum
      })
    }
    else{
      this.setData({
        "random.value" : parseInt(Math.random()*(maxNum-minNum+1)+minNum,10),
      })
    }

    app.globalData.randomCurr = this.data.random.value;
  },
  onShareAppMessage:(res) => {
    let str = `我随到了数字${app.globalData.randomCurr},快来来寻找你的随机数吧！`
    return {
      title:str,
      imageUrl:'/pages/share/shuzi.png'
    }
  }
})
