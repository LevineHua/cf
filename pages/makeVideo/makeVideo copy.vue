<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-07 14:15:43
 * @FilePath: \change-face\pages\makeVideo\makeVideo.vue
-->
<template>
  <view class="u-page u-flex u-flex-col">
    <!-- 顶部导航栏 -->
    <u-navbar>
      <view slot="right" class="u-p-r-20">
        <image src="/static/index/start-icon.png" class="u-w-h-38"></image>
      </view>
    </u-navbar>
    <!-- 视频 -->
    <view class="u-page__make-video u-flex-1">
      <video
        src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
        autoplay
        loop
        :controls="true"
      ></video>
    </view>
    <!-- 操作区 -->
    <view class="u-page__make-footer">
      <view class="faces u-flex">
        <view class="add-btn u-flex u-row-center" @click="chooseFace">
          <u-icon name="plus" color="#fff" size="28"></u-icon>
        </view>
        <view class="face-img u-flex u-row-center">
          <image src="https://jdc.jd.com/img/58" mode="aspectFill" class="u-w-h-58"></image>
        </view>
        <text class="u-m-l-30">添加一张人脸</text>
      </view>

      <button class="open-type-button">开始制作</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    chooseFace() {
      this.$Router.push({
        name: 'chooseFace'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  height: 100vh;
  &__make-video {
    background: #fff;
    width: 100%;
    video {
      width: 100%;
      height: 100%;
    }
  }
  &__make-footer {
    width: 100%;
    height: 280rpx;
    padding: 30rpx;
    .faces {
      font-size: 26rpx;
      font-family: Microsoft YaHei;
      color: #ffffff;
      .add-btn {
        width: 68rpx;
        height: 68rpx;
        background: #111111;
        border-radius: 50%;
      }
      .face-img {
        width: 68rpx;
        height: 68rpx;
        background: linear-gradient(78deg, #f09492, #7c16f5);
        border-radius: 50%;
        overflow: hidden;
        margin-left: 25rpx;
        image {
          border-radius: 50%;
        }
      }
    }
    .open-type-button {
      width: 100%;
      height: 90rpx;
      background: linear-gradient(78deg, #f09492, #7c16f5);
      border-radius: 5rpx;
      margin-top: 26rpx;
      font-size: 30rpx;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
