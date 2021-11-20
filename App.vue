<script>
	export default {
		onLaunch: function() {
			
		},
		onShow() {
			console.log('App Show')
		}
	}
</script>


<style lang="scss">
	/* #ifndef APP-NVUE */
	@import "uview-ui/index.scss";
	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none!important;
	}
	/* #endif */
</style>

