<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-07 10:26:00
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-15 21:53:38
 * @FilePath: \change-face\components\share-popup\share-popup.vue
-->
<template>
  <u-popup
    v-model="show"
    mode="bottom"
    :custom-style="{ background: 'transparent' }"
    @open="open"
    @close="close"
  >
    <view class="share-popup u-rela">
      <view class="share-popup__title"> 分享给好友 </view>
      <view class="share-popup__close u-flex u-row-center" @click="close">
        <image src="/static/public/close-icon.png" class="u-w-h-14"></image>
      </view>
      <view class="share-popup__menus u-flex u-row-between">
        <view class="menu-item u-flex u-flex-col u-row-center" @click="share('wx')">
          <image src="/static/mine/wx-icon.png" class="u-w-h-92"></image>
          微信好友
        </view>
        <view class="menu-item u-flex u-flex-col u-row-center" @click="share('qq')">
          <image src="/static/mine/qq-icon.png" class="u-w-h-92"></image>
          QQ好友
        </view>
        <view class="menu-item u-flex u-flex-col u-row-center" @click="share('poster')">
          <image src="/static/mine/poster-icon.png" class="u-w-h-92"></image>
          生成海报
        </view>
        <view class="menu-item u-flex u-flex-col u-row-center" @click="share('link')">
          <image src="/static/mine/link-icon.png" class="u-w-h-92"></image>
          复制链接
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  name: 'share-popup',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  mounted() {
    // 组件渲染完成时，检查value是否为true，如果是，弹出popup
    if (this.value) {
      this.show = true
    }
  },
  methods: {
    open() {
      this.$emit('input', true)
    },
    close() {
      this.$emit('input', false)
    },
    share(type) {
      this.$emit('share', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.share-popup {
  width: 750rpx;
  height: 300rpx;
  background: #292b40;
  border-radius: 12rpx 12rpx 0 0;
  &__title {
    text-align: left;
    font-size: 30rpx;
    color: #ffffff;
    padding: 32rpx 40rpx;
  }
  &__close {
    width: 38rpx;
    height: 38rpx;
    background: #111111;
    border-radius: 50%;
    position: absolute;
    right: 28rpx;
    top: 28rpx;
  }
  &__menus {
    margin-top: 10rpx;
    padding: 0 30rpx;
    .menu-item {
      width: 308rpx;
      height: 157rpx;
      border-radius: 10rpx;
      font-size: 26rpx;
      font-family: Microsoft YaHei;
      color: #ffffff;
      image {
        margin-bottom: 13rpx;
      }
    }
  }
}
</style>
