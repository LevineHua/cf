import Request from '@/plugins/luch-request/index.js'
import store from '@/store/index.js'
import md5 from 'js-md5'
import APPCONFIG from '@/config/config.js'
import TokenApi from '@/api/token'

const getTokenStorage = () => {
  let token = ''
  try {
    token = uni.getStorageSync('token')
  } catch (e) {}
  return token
}

const http = new Request()
http.setConfig((config) => {
  /* 设置全局配置 */
  config.baseURL = APPCONFIG.url_config /* 根域名不同 */
  config.header = {
    ...config.header
  }
  return config
})

http.interceptors.request.use(
  (config) => {
    /* 请求之前拦截器。可以使用async await 做异步操作 */
    let instanceURL = config.url
    let strs = instanceURL.split('/')
    strs.splice(0, 2)
    let url = '/' + strs.join('/')
    let timestamp = Math.round(new Date().getTime() / 1000)
    let sign = ''
    let token = uni.getStorageSync('token')
    let user = uni.getStorageSync('userJwt')
    let userNp = ''
    if (user) {
      userNp = user.userId
    }
    // console.log(url + timestamp + userNp)
    if (token && url.split('/')[2] != 'public') {
      sign = md5(url + timestamp + userNp)
    } else {
      sign = md5(url + timestamp)
    }
    config.header = {
      ...config.header,
      timestamp: timestamp.toString(),
      sign: sign
    }

    if (APPCONFIG.canary) {
      config.header.canary = APPCONFIG.canary
    }

    getTokenStorage() && (config.header.token = getTokenStorage())
    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

http.interceptors.response.use(
  async (response) => {
    /* 请求之后拦截器。可以使用async await 做异步操作  */
    // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //   return Promise.reject(response)
    // }
    let config = response.config
    const {
      data,
      data: { status }
    } = response

    try {
      return await handleCode({ data, status, config })
    } catch (err) {
      return Promise.reject(err)
    }
    //return response.data
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    console.log(response)
    return Promise.reject(response)
  }
)

/**
 * 处理 http状态码
 * @param {object} o
 * @param {object} o.data 请求返回的数据
 * @param {object} o.config 本次请求的config数据
 * @param {string|number} o.status http状态码
 * @return {object|Promise<reject>}
 */
function handleCode({ data, status, config }) {
  //console.log(data,status,config)
  const STATUS = {
    '00000000'() {
      return data
    },
    10000() {
      return data
    },
    400() {
      // return { status, msg: '请求错误' };
      return Promise.reject({ status, msg: '请求错误' })
    },
    utils010() {
      // 登录被挤
      // return reset()
      store.commit('logout')
      return Promise.reject({ status, msg: data.message })
    },
    utils007() {
      // 登录超时
      return reset()
    },
    apigw002() {
      return reset()
    },
    'restart-10000'() {
      store.commit('logout')
      return Promise.reject({ status, msg: data.message })
    },
    70014() {
      store.commit('logout')
      return Promise.reject({ status, msg: data.message })
    },
    70066() {
      // code非法
      store.commit('logout')
      return Promise.reject({ status, msg: data.message })
    },
    apigw004() {
      // 未登录
      store.commit('logout')
      return Promise.reject({ status, msg: '未登录' })
    },
    403() {
      return Promise.reject({ status, msg: '拒绝请求' })
    },
    500() {
      return Promise.reject({ status, msg: '服务器错误' })
    }
  }

  function reset() {
    // 只让这个实例发送一次请求，如果status还是utils010则抛出错误
    // if (config.count === 1) {
    //     return Promise.reject({ status, msg: '请求未授权' });
    // }
    // config.count++; // count字段自增，可以用来判断请求次数，避免多次发送重复的请求
    //config.url = config.instanceURL; // 重置 config的相对地址，避免 `params` 多次添加
    return getApiToken()
      .then(saveToken)
      .then(() => {
        return http.request(config)
      })
  }

  return STATUS[status] ? STATUS[status]() : Promise.reject(data, config) // 有状态码但不在这个封装的配置里，就直接进入 `fail`
}

/**
 * 重新请求更新获取 `token`
 * @param {number} uid
 * @return {Promise}
 */
function getApiToken() {
  return TokenApi.refreshToken()
    .then((res) => {
      //console.log(res)
      //console.log(res.data.token)
      return res.data
    })
    .catch((res) => {
      //console.log(res)
      //showToast("出现了异常")
      return Promise.reject(res)
    })
}

/**
 * 保存 `token` 到  `localStorage`
 * @param {string} token token字符串
 * @return {void}
 */
function saveToken(info) {
  //console.log(token)
  //uni.setStorageSync("token",token)
  store.commit('stateLogin', info)
}

// 显示消息提示框
function showToast(data) {
  setTimeout(function () {
    uni.showToast({
      title: data,
      icon: 'none',
      duration: 1000
    })
  }, 10)
}

export { http }
