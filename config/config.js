let APPCONFIG = {
  process: 'dev', // 环境：如果填了参数，即使手动切换环境；未填参数，根据网站url自动切换环境
  url_config: '' // 域名
}

/**
 * dev开发模式
 * prod生产模式
 * 默认生产模式
 */
let url_config = ''
let process = APPCONFIG.process // 如果填了参数，即使手动切换环境；未填参数，根据网站url自动切换环境

switch (process) {
  case 'dev':
    url_config = 'http://qingyunhuanlian.blogdog.cn'
    break
  default:
    url_config = 'http://qingyunhuanlian.blogdog.cn'
}

APPCONFIG.url_config = url_config

export default APPCONFIG
