import request from '@/api/request.js'
const api = {}

const PORT1 = '/api.php'

// ---------------------------- 登录 ----------------------------
// - 密码登录
api.loginPAS = (datas) => request.globalRequest(PORT1, `/user/login`, 'POST', datas)
