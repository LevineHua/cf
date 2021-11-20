import Vue from 'vue'
import {
	date,
	formatDistance
} from '@/common/util'


Vue.filter('date', (timeStamp, format='Y-m-d H:i')=>{
	if(!timeStamp) return '';
	return date(format, timeStamp);
})

Vue.filter('friendDate', (timeStamp, format='Y-m-d H:i')=>{
	if(!timeStamp) return '';
	return date(format, timeStamp);
})

Vue.filter('price', (price, fixed=0)=>{
	if(!price || isNaN(price)){
		return 0
	}
	return fixed > 0 ? parseFloat(price).toFixed(fixed) : + parseFloat(price).toFixed(2);
})

Vue.filter('secdtoday', (second) => {
	const days = Math.floor(second / 86400);
	const hours = Math.floor((second % 86400) / 3600);
	const minutes = Math.floor(((second % 86400) % 3600) / 60);
	const seconds = Math.floor(((second % 86400) % 3600) % 60);
	return days+'天'+hours+'小时'+minutes+'分钟'+seconds+'秒';
})

Vue.filter('city', (city)=>{
	if(!city){
		return '定位中'
	}
	return city.replace(/省|市|自治区|特别行政区|区|壮族|回族|维吾尔/g,"");
})

Vue.filter('messageNumber', (num)=>{
	if(num>99){
		return '99+'
	} else {
		return num
	}
})

Vue.filter('formatDistance',(num) => {
	if(!num) return '';
	return formatDistance(num);
})