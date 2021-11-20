<template>
	<view class="tui-sticky-class" :id="initStickyId">
		<!--sticky 容器-->
		<view :style="{height: stickyHeight,backgroundColor:backgroundColor}" v-if="isFixed"></view>
		<view :class="{'tui-sticky-fixed':isFixed}" :style="{top:isFixed?stickyTop+'px':'auto'}">
			<slot name="header"></slot>
		</view>
		<!--sticky 容器-->
		<!--内容-->
		<slot name="content"></slot>
	</view>
</template>

<script>
	export default {
		name: "tuiSticky",
		props: {
			scrollTop: {
				type: Number
			},
			//吸顶时与顶部的距离，单位px
			stickyTop: {
				type: [Number, String]
					// #ifndef H5
					,
				default: 0
					// #endif
					// #ifdef H5
					,
				default: 44
				// #endif
			},
			//是否指定容器，即内容放置插槽content内
			container: {
				type: Boolean,
				default: false
			},
			//是否是原生自带header
			isNativeHeader: {
				type: Boolean,
				default: true
			},
			//吸顶容器 高度 rpx
			stickyHeight: {
				type: [Number,String],
				default: "auto"
			},
			//占位容器背景颜色
			backgroundColor: {
				type: String,
				default: "transparent"
			},
			//是否重新计算[有异步加载时使用,设置大于0的数]
			recalc: {
				type: Number,
				default: 0
			},
			//列表中的索引值
			index: {
				type: [Number, String],
				default: 0
			},
			// //组件唯一id
			stickyId: {
				type: String,
				default: 'sticky'
			}
		},
		watch: {
			scrollTop(newValue, oldValue) {
				// console.log(newValue, oldValue)
				if (this.initialize != 0) {
					this.updateScrollChange(() => {
						this.updateStickyChange();
						this.initialize = 0
					});
				} else {
					this.updateStickyChange();
				}
			},
			recalc(newValue, oldValue) {
				this.updateScrollChange(() => {
					this.updateStickyChange();
					this.initialize = 0;
				});
			}
		},
		created() {
			this.initialize = this.recalc
		},
		mounted() {
			setTimeout(() => {
				this.updateScrollChange();
			}, 20)
		},
		data() {
			return {
				timer: null,
				top: 0,
				height: 0,
				isFixed: false,
				initialize: 0, //重新初始化
				//stickyId:'sticky'
				initStickyId: this.stickyId
			};
		},
		methods: {
			initSticky(id) {
				this.initialize = this.uuid()	
				this.initStickyId = id
				//console.log(id,this.initStickyId)
				this.$nextTick(() => {
					this.updateScrollChange()
				})
			},
			updateStickyChange() {
				this.updateScrollChange()
				const top = this.top;
				if(!top) return
				const height = this.height;
				const scrollTop = this.scrollTop
				let stickyTop = this.stickyTop
				//console.log(scrollTop,stickyTop)
				// #ifdef H5
				if (this.isNativeHeader) {
					stickyTop = stickyTop - 44
					stickyTop = stickyTop < 0 ? 0 : stickyTop
				}
				// #endif
				// console.log('-------------------------------------------------------------------------------------------')
				// console.log('top', top)
				// console.log('height', height)
				// console.log('scrollTop', scrollTop)
				// console.log('stickyTop', stickyTop)
				if (this.container) {
					this.isFixed = (scrollTop + stickyTop >= top && scrollTop + stickyTop < top + height) ? true : false
				} else {
					// console.log(scrollTop,stickyTop,top)
					this.isFixed = scrollTop + stickyTop >= top ? true : false
					// console.log(scrollTop , stickyTop , top)
				}
				//是否吸顶
				this.$emit("sticky", {
					isFixed: this.isFixed,
					index: this.index
				})
			},
			updateScrollChange(callback) {
				if (this.timer) {
					clearTimeout(this.timer)
					this.timer = null
				}
				this.timer = setTimeout(() => {
					//const className = '.tui-sticky-class';
					const className = '#'+this.initStickyId;
					// console.log(className)
					// #ifdef MP-ALIPAY
					const query = uni.createSelectorQuery();
					// #endif
					// #ifndef MP-ALIPAY
					const query = uni.createSelectorQuery().in(this);
					// #endif
					query.select(className).boundingClientRect((res) => {
						if (res) {
							// console.log(res)
							this.top = res.top + (this.scrollTop || 0);
							// console.log('res---------------------------res', res)
							this.height = res.height;
							callback && callback();
							this.$emit("change", {
								index: Number(this.index),
								top: this.top
							})
						}
					}).exec()
				}, 0)
			}
		}
	}
</script>

<style scoped>
	.tui-sticky-fixed {
		width: 100%;
		position: fixed;
		left: 0;
		z-index: 888;
	}
</style>
