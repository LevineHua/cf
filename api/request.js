import md5 from 'js-md5'
import store from '@/store/index.js'
import config from '@/config/config.js'

import {
  http
} from '@/api/service.js'

const request = {}

request.globalRequest = (port,url,method,data) => {
	
	if (store.state.hasLogin && !data.userId) {
		data.userId = uni.getStorageSync('userJwt').userId || ''
	}
	
	data.applicationId = config.applicationId
	
	
	return http.middleware({
		method: method, // 必须大写
		url: port+url,
		data: data
	})
}

request.globalUpload = (port,url,data) => {
	if (store.state.hasLogin && !data.userId) {
		// data.extra['userId'] = uni.getStorageSync('userJwt').userId || ''
		data.extra['uploaderId'] = uni.getStorageSync('userJwt').userId || ''
	}
	return http.middleware({
		method: "UPLOAD",
		url: port+'/datacenter/v1/fileupload/image',
		filePath: data.path,
		name: 'file',
		header: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		formData: data.extra,
		getTask: (task, options) => {
			// task.onProgressUpdate((res) => {
			// 	console.log('上传进度'+res.progress)
			// })
		}
	})
}




export default request
