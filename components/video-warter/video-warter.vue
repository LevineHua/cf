<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-07 10:26:00
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-07 11:52:30
 * @FilePath: \change-face\components\video-warter\video-warter.vue
-->
<template>
  <view class="video-warter" @click="toClick">
    <u-lazy-load threshold="-450" border-radius="0" :image="item.image"></u-lazy-load>
    <view class="video-warter__name u-flex u-row-between">
      <text class="u-single-line">{{ item.title }}</text>
      <image src="/static/index/start-icon.png" class="u-w-h-38"></image>
    </view>
    <view class="video-warter__vip">VIP</view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  name: 'video-warter',
  props: {
    item: {
      default: () => {
        return {}
      }
    }
  },
  methods: {
    toClick() {
      this.$emit('makeVideo')
    }
  }
}
</script>

<style lang="scss" scoped>
.video-warter {
  width: 330rpx;
  border-radius: 10rpx;
  overflow: hidden;
  margin-bottom: 22rpx;
  position: relative;
  &__name {
    width: 100%;
    height: 105rpx;
    background: #ed716f;
    padding: 0 20rpx;
    text {
      font-size: 26rpx;
      color: #fefeff;
      width: calc(100% - 50rpx);
    }
  }
  &__vip {
    width: 160rpx;
    height: 50rpx;
    background: linear-gradient(90deg, #f7d7c4 0%, #d9b5a1 100%);
    border-radius: 10rpx;
    font-size: 30rpx;
    font-family: Microsoft YaHei;
    color: #74523e;
    line-height: 50rpx;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(45deg);
    right: -50rpx;
    top: 12rpx;
  }
}
</style>
