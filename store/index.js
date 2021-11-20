/*
 * @Description:
 * @Author: Levine
 * @Date: 2021-11-17 17:23:37
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-20 15:55:03
 * @FilePath: /change-face/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['token', 'userInfo']

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // console.log(key,value)
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    uni.setStorageSync(key, value)
  }
}

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    token: '',
    userJwt: {},
    user: {},
    userInfo: {},
    // 自定义tabbar数据
    vuex_tabbar: [
      {
        iconPath: '/static/public/index-icon.png',
        selectedIconPath: '/static/public/index-active-icon.png',
        text: '首页',
        pagePath: '/pages/index/index'
      },
      {
        iconPath: '/static/public/upload-icon.png',
        selectedIconPath: '/static/public/upload-active-icon.png',
        text: '上传视频',
        pagePath: '/pages/upload/upload'
      },
      {
        iconPath: '/static/public/mine-icon.png',
        selectedIconPath: '/static/public/mine-active-icon.png',
        text: '我的',
        pagePath: '/pages/mine/mine'
      }
    ]
  },
  mutations: {
    $cfStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split('.')
      let saveKey = ''
      let len = nameArr.length
      if (len >= 2) {
        let obj = state[nameArr[0]]
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]]
        }
        obj[nameArr[len - 1]] = payload.value
        saveKey = nameArr[0]
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value
        saveKey = payload.name
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey])
    }
  }
})

export default store
