<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-07 16:36:03
 * @FilePath: \change-face\pages\making\making.vue
-->
<template>
  <view class="u-page u-page__making u-flex u-flex-col">
    <!-- 顶部导航栏 -->
    <u-navbar :isBack="false">
      <view slot="right" class="u-p-r-30" @click="back">
        <image src="/static/public/back-icon.png" class="u-w-h-41"></image>
      </view>
    </u-navbar>
    <image src="https://jdc.jd.com/img/438x589" class="making-img"></image>
    <view class="u-page__making-name"> 换脸中... </view>
    <!-- 按钮组 -->
    <view class="u-page__making-btns">
      <button class="open-type-button register">查看</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    back() {
      this.$Router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  &__making {
    padding-top: 190rpx;
    .making-img {
      width: 438rpx;
      height: 589rpx;
      border-radius: 20rpx;
      margin-bottom: 58rpx;
    }

    &-name {
      font-size: 35rpx;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
    }
    &-btns {
      margin-top: 60rpx;
      .open-type-button {
        width: 690rpx;
        height: 90rpx;
        border-radius: 6rpx;
        font-size: 30rpx;
        color: #ffffff;
        font-weight: bold;
        &.register {
          background: linear-gradient(78deg, #f09492, #7c16f5);
        }
      }
    }
  }
}
</style>
