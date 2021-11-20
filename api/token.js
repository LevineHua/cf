import md5 from 'js-md5'
import APPCONFIG from '@/config/config.js'

import { http } from '@/api/service.js'

export default {
  // 刷新token
  refreshToken() {
    let refreshToken = uni.getStorageSync('userJwt').refreshToken

    let url = '/user/public/v1/user/login'
    let datas = {
      applicationId: APPCONFIG.applicationId,
      applicationType: APPCONFIG.applicationType,
      terminal: APPCONFIG.terminal,
      uuid: ''
    }
    // #ifdef APP-PLUS
    datas.uuid = this.uuid
    // #endif
    return http.middleware({
      url: '/apigw' + url,
      method: 'POST',
      data: datas
      //params: params,
      // custom: {
      // 	auth: true
      // }
    })
  }
}
