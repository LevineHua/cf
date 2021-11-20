<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-08 21:36:42
 * @FilePath: \change-face\pages\setting\setting.vue
-->
<template>
  <view class="u-page">
    <!-- 顶部导航栏 -->
    <u-navbar title="用户协议"></u-navbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      titleStyle: {
        color: '#fff',
        fontSize: '34rpx'
      },
      valueStyle: {
        color: '#fff',
        fontSize: '34rpx'
      },
      bgColor: '#131222'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131222;
}
</style>
