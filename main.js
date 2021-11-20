/*
 * @Description:
 * @Author: Levine
 * @Date: 2021-11-17 17:23:37
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-20 15:52:41
 * @FilePath: /change-face/main.js
 */
import Vue from 'vue'
import App from './App'

/**
 * 路由
 */
import router from './router'
import { RouterMount } from 'uni-simple-router'
/**
 * vuex
 */
import store from './store/index.js'
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)
/**
 * 请求
 */
import config from '@/config/config.js'
import api from './api/index.js'
/**
 * filter
 */
import filter from './common/filter'
/**
 * 全局mixins
 */
let mixins = require('./mixins/mixins.js')
Vue.mixin(mixins)

import header from '@/plugins/header/index.js'
Vue.use(header)

import uView from 'uview-ui'
Vue.use(uView)

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$config = config

Vue.prototype.$cf = {}

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

/**
 * h5端使用路由自带的渲染方式
 */
// #ifdef H5
RouterMount(app, '#app')
// #endif
// #ifndef H5
app.$mount()
// #endif
