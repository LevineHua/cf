<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-07 11:46:06
 * @FilePath: \change-face\pages\uploadSuccess\uploadSuccess.vue
-->
<template>
  <view class="u-page u-page__success u-flex u-flex-col">
    <image src="/static/index/success-icon.png" class="success-img"></image>
    <view class="u-page__success-name"> 上传成功 </view>
    <view class="u-page__success-title"> 返回列表查看其他内容 </view>
    <!-- 按钮组 -->
    <view class="u-page__success-btns">
      <button class="open-type-button register">查看</button>
      <button class="open-type-button login" @click="back">
        <text>返回首页</text>
      </button>
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
  &__success {
    padding-top: 190rpx;
    .success-img {
      width: 750rpx;
      height: 260rpx;
      margin-bottom: 120rpx;
    }

    &-name {
      font-size: 40rpx;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
    }
    &-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #4d4d4d;
      margin-top: 20rpx;
    }
    &-btns {
      margin-top: 130rpx;
      .open-type-button {
        width: 440rpx;
        height: 78rpx;
        border-radius: 6rpx;
        margin-bottom: 40rpx;
        font-size: 24rpx;
        color: #ffffff;
        &.register {
          background: linear-gradient(78deg, #f09492, #7c16f5);
        }
        &.login {
          background: #ffffff;
          text {
            color: #658aff;
            background: linear-gradient(78deg, #f09492 0%, #7c16f5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }
}
</style>
