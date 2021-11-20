/*
 * @Description:
 * @Author: Levine
 * @Date: 2021-11-04 21:09:34
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-05 22:16:44
 * @FilePath: \change-face\plugins\header\index.js
 */
const install = (Vue) => {
  let system = uni.getSystemInfoSync()
  console.log('systemsystem', system)
  if (system.platform == 'android') {
    Vue.prototype.isAndroid = true
  } else {
    Vue.prototype.isAndroid = false
  }
  Vue.prototype.system = system
  console.log(system)
  // #ifndef MP
  Vue.prototype.StatusBar = system.statusBarHeight
  if (system.platform == 'android') {
    Vue.prototype.CustomBar = system.statusBarHeight + 48
  } else {
    Vue.prototype.CustomBar = system.statusBarHeight + 44
  }
  // #endif

  // #ifdef MP-WEIXIN
  Vue.prototype.StatusBar = system.statusBarHeight
  let custom = wx.getMenuButtonBoundingClientRect()
  Vue.prototype.Custom = custom
  Vue.prototype.CustomBar = custom.bottom + custom.top - system.statusBarHeight
  // #endif

  // #ifdef MP-ALIPAY
  Vue.prototype.StatusBar = system.statusBarHeight
  Vue.prototype.CustomBar = system.statusBarHeight + system.titleBarHeight
  // #endif

  // #ifdef APP-PLUS
  Vue.prototype.systemName = plus.os.name
  // #endif

  let modelmes = system.model
  if (
    modelmes &&
    (modelmes.indexOf('iPhone X') >= 0 ||
      modelmes.indexOf('iPhone XR') >= 0 ||
      modelmes.indexOf('iPhone XS') >= 0 ||
      modelmes.indexOf('iPhone 12') >= 0 ||
      modelmes.indexOf('iPhone 11') >= 0 ||
      modelmes.indexOf('iPhone11') >= 0 ||
      modelmes.indexOf('iPhone12') >= 0 ||
      modelmes.indexOf('iPhoneXR') >= 0 ||
      modelmes.indexOf('iPhoneX') >= 0)
  ) {
    Vue.prototype.$is_bang = true
  } else {
    Vue.prototype.$is_bang = false
  }
}

export default {
  install
}
