import Vue from 'vue'
import store from "@/store"
import Router from 'uni-simple-router'
Vue.use(Router)

import APPCONFIG from '@/config/config.js'

// 初始化
const router = new Router({
	h5: {
		paramsToQuery: true,
		loading: false,
		vueRouterDev: false,
		useUniConfig: true,
	},
	debugger: false,
	encodeURI: false,
	routes: ROUTES // 路由表
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
	next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {

})

export default router
