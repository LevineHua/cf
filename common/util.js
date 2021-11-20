function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

function formatTime2(val) {
	var date = new Date(val)
	var _format = function (number) {
		return (number < 10 ? ('0' + number) : number);
	};
	return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate()) + ' ' +
		_format(date.getHours()) + ':' + _format(date.getMinutes());
}

function formatDate(val) {
	var date = new Date(val)
	var _format = function (number) {
		return (number < 10 ? ('0' + number) : number);
	};
	return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + ' ' +
		_format(date.getHours()) + ':' + _format(date.getMinutes());
}
function formatDateZh(val) {
	var date = new Date(val)
	var _format = function (number) {
		return (number < 10 ? ('0' + number) : number);
	};
	return date.getFullYear() + '年' + _format(date.getMonth() + 1) + '月' + _format(date.getDate()) + '日' +
		_format(date.getHours()) + ':' + _format(date.getMinutes()) + ':' + _format(date.getSeconds());
}

function formatDate2(val) {
	var date = new Date(val)
	var _format = function (number) {
		return (number < 10 ? ('0' + number) : number);
	};
	return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate());
}

function formatMoney(number, places, symbol, thousand, decimal) {
	number = number || 0;
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var negative = number < 0 ? "-" : "",
		i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	//return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand);
}

// 计算经纬度间的距离
function getFlatternDistance (lat1, lng1, lat2, lng2) {
	console.log(lat1, lng1, lat2, lng2)
    const PI = Math.PI
    const EARTH_RADIUS = 6378137.0
    function getRad (d) {
        return d * PI / 180.0
    }
    let f = getRad((lat1*1 + lat2*1) / 2)
    let g = getRad((lat1*1 - lat2*1) / 2)
    let l = getRad((lng1*1 - lng2*1) / 2)
    let sg = Math.sin(g)
    let sl = Math.sin(l)
    let sf = Math.sin(f)

    let s, c, w, r, d, h1, h2
    let a = EARTH_RADIUS
    let fl = 1 / 298.257

    sg = sg * sg
    sl = sl * sl
    sf = sf * sf

    s = sg * (1 - sl) + (1 - sf) * sl
    c = (1 - sg) * (1 - sl) + sf * sl

    w = Math.atan(Math.sqrt(s / c))
    r = Math.sqrt(s * c) / w
    d = 2 * w * a
    h1 = (3 * r - 1) / 2 / c
    h2 = (3 * r + 1) / 2 / s
	
    // return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
	
	let m = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
	
	if(m<1000) {
		return Math.round(m) + 'm'
	} else {
		return (m / 1000).toFixed(1) + 'km'
	}
}

/**
 * 拼接对象为请求字符串
 * 对于需要编码的文本（比如说中文）我们要进行编码
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 **/
 function formatGetUrl(obj) {
	 const params = []
	 Object.keys(obj).forEach((key) => {
		 let value = obj[key]
		 if(typeof value !=='undefined' || value !==null) {
			 params.push([key,encodeURIComponent(value)].join('='))
		 }
	 })
	 return '?'+params.join('&')
 }
 
function formatNumber(val) {
	/* if(val) {
		let num = Math.floor(val * 100) / 100
		return num.toFixed(2)
	} else {
		return '0.00'
	} */
	if(val) {
		let d = val;
		d=Math.round(d*100)/100;
		const price = (d + "").split(".");
		price[1] = price[1] ? `${(price[1] + "000").substring(0, 2)}` : "00";
		d = price.join(".");
		return d
	} else {
		return '0.00'
	}
}

function getStartTime(val) {	// 获取该时间的初始时间
	var date = new Date(val)
	var _format = function (number) {
		return (number < 10 ? ('0' + number) : number);
	};
	return new Date(date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + ' 00:00:00').getTime()
}
function getEndTime(val) {	// 获取该时间的结束时间
	var date = new Date(val)
	var _format = function (number) {
		return (number < 10 ? ('0' + number) : number);
	};
	return new Date(date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + ' 23:59:59').getTime()
}

/*
	str:字符串
	frontLen:保留的前几位
	endLen:保留的后几位
*/
function plusXing(str,frontLen,endLen) {
	var len = str.length-frontLen-endLen;
	var xing = '';
	for (var i=0;i<len;i++) {
		xing+='*';
	}
	return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}

// 是否是今天
function isToday(str) {
	let today;
    if (new Date(str).toDateString() === new Date().toDateString()) {
        //今天
        today = true
    } else if (new Date(str) < new Date()){
        //之前
        today = false
    }
	return today
}

let _debounceTimeout = null,
	_throttleRunning = false

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const debounce = (fn, delay=500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn, delay=500) => {
	if(_throttleRunning){
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
	    _throttleRunning = false;
	}, delay);
}
/**
 * toast
 */
export const msg = (title = '', param={}) => {
	if(!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}
/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options={}) => {
	const token = uni.getStorageSync('uniIdToken');
	if(token){
		return true;
	}
	if(options.nav !== false){
		uni.navigateTo({
			url: '/pages/auth/login'
		})
	}
	return false;
}
/**
 * 获取页面栈
 * @param {Number} preIndex为1时获取上一页
 * @return {Object} 
 */
export const prePage = (preIndex = 1) => {
	const pages = getCurrentPages();
	const prePage = pages[pages.length - (preIndex + 1)];

	return prePage.$vm;
}
/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
export const date = (format, timeStamp) => {
	if('' + timeStamp.toString().length <= 10){
		timeStamp = + timeStamp * 1000;
	}else{
		timeStamp = + timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key=>{
		return {Y,m,d,H,i,s}[key];
	});
}
//二维数组去重
export const getUnique = array => {
	let obj = {}
    return array.filter((item, index) => {
		let newItem = item + JSON.stringify(item)
		return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
	})
}
// 判断类型集合
export const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'mob': //座机
			return /^0\d{2,3}-\d{7,8}$|^0085[23]-[1-9]\d{7}$|^00886-[1-9]\d{7-8}$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'bankCard': //银行卡号
			return /^([1-9]{1})(\d{14}|\d{18})$/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字
			return /^([0-9a-zA-Z]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'nickname': //昵称：中文，英文
			return /^([\u4e00-\u9fa5]|[a-zA-Z]){2,20}$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}

// 银行卡校验
export const checkBankCard = bankno => {
	console.log(bankno)
	var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
	var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
	var newArr = new Array();
	for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
		newArr.push(first15Num.substr(i, 1));
	}
	var arrJiShu = new Array(); //奇数位*2的积 <9
	var arrJiShu2 = new Array(); //奇数位*2的积 >9
	var arrOuShu = new Array(); //偶数位数组
	for (var j = 0; j < newArr.length; j++) {
		if ((j + 1) % 2 == 1) { //奇数位
			if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
			else arrJiShu2.push(parseInt(newArr[j]) * 2);
		} else //偶数位
		arrOuShu.push(newArr[j]);
	}
	var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
	for (var h = 0; h < arrJiShu2.length; h++) {
		jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
		jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}
	var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	var sumOuShu = 0; //偶数位数组之和
	var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal = 0;
	for (var m = 0; m < arrJiShu.length; m++) {
		sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	}
	for (var n = 0; n < arrOuShu.length; n++) {
		sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}
	for (var p = 0; p < jishu_child1.length; p++) {
		sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
		sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	//计算总和
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
	//计算luhn值
	var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	var luhn = 10 - k;
	if (lastNum == luhn) {
		return true;
	} else {
		return false;
	}
}

// 税号校验
// export const checkTaxpayerId = taxpayerId => {
// 	if(taxpayerId!="" && taxpayerId.length===15){
// 		var addressCode = taxpayerId.substring(0,6);
// 		// 校验地址码
// 		var check = checkAddressCode(addressCode);
// 		if(!check){
// 			return false;
// 		}
// 		// 校验组织机构代码
// 		var orgCode = taxpayerId.substring(6,9);
// 		check = isValidOrgCode(orgCode);
// 		if(!check){
// 			return false;
// 		}
// 		return true;
// 	}else{
// 		return false;
// 	}
// }

//距离换算
export const formatDistance = num => {
	if(num>999) {
		return (num / 1000).toFixed(1) + 'km'
	} else {
		return num.toFixed(0)+'m'
	}
}


export default {
	formatTime,
	formatLocation,
	dateUtils,
	formatDate,
	formatMoney,
	getFlatternDistance,
	formatDate2:formatDate2,
	formatTime2:formatTime2,
	formatGetUrl:formatGetUrl,
	formatNumber:formatNumber,
	getStartTime:getStartTime,
	getEndTime:getEndTime,
	formatDateZh:formatDateZh,
	plusXing:plusXing,
	isToday:isToday
}
