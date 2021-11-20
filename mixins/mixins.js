module.exports = {
	data() {
		return {}
	},
	onLoad() {
		
	},
	methods: {
		// 查询节点信息
		// 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
		// 解决办法为在组件根部再套一个没有任何作用的view元素
		$getRect(selector, all) {
			return new Promise(resolve => {
				uni.createSelectorQuery().
				in(this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect)
						}
						if (!all && rect) {
							resolve(rect)
						}
					})
					.exec()
			})
		}
	}
}
