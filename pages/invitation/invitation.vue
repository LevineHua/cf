<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-15 21:54:04
 * @FilePath: \change-face\pages\invitation\invitation.vue
-->
<template>
  <view class="u-page">
    <!-- 顶部导航栏 -->
    <u-navbar title="邀请好友得收益"></u-navbar>

    <!-- 提示 -->
    <view class="u-page__invitation-tip u-flex u-row-center">
      <image src="/static/mine/invitation-left-icon.png" class="u-w-64 u-h-16"></image>
      <view class="tip">每成功邀请1位好友可获得8.88元</view>
      <image src="/static/mine/invitation-right-icon.png" class="u-w-64 u-h-16"></image>
    </view>

    <!-- 邀请码 -->
    <view class="u-page__invitation-code u-flex u-flex-col">
      <!-- <image src="https://jdc.jd.com/img/260" class="qrcode u-w-h-260"></image> -->
      <canvas id="qrcode" canvas-id="qrcode" style="width: 130px; height: 130px" />

      <view class="copy-item u-flex u-m-t-30">
        <view class="copy-item__title">邀请码</view>
        <view class="copy-item__value">QianTuWang588</view>
        <view class="copy-item__btn">复制</view>
      </view>
      <view class="copy-item u-flex">
        <view class="copy-item__title">分享链接</view>
        <view class="copy-item__value">QianTuWang588</view>
        <view class="copy-item__btn">复制</view>
      </view>
      <view class="steps u-flex">
        <view class="step-item u-flex u-flex-col u-row-center">
          <view class="step-num">1</view>
          分享给好友
        </view>
        <view class="step-hr"></view>
        <view class="step-item u-flex u-flex-col u-row-center">
          <view class="step-num">2</view>
          好友输入邀请码
        </view>
        <view class="step-hr"></view>
        <view class="step-item u-flex u-flex-col u-row-center">
          <view class="step-num">3</view>
          金币到账
        </view>
      </view>
    </view>

    <button class="open-type-button" @click="show = true">分享给好友</button>

    <!-- 分享弹框 -->
    <share-popup v-model="show" @share="share"></share-popup>

    <!-- 海报弹框 -->
    <poster-popup v-model="showPoster" :qrCode="qrCode"></poster-popup>
  </view>
</template>

<script>
import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode/common/uqrcode.js'
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
      bgColor: '#131222',
      show: false,
      showPoster: false,
      qrCode: ''
    }
  },
  onReady() {
    uQRCode
      .make({
        canvasId: 'qrcode',
        size: 130,
        text: 'uQRCode'
      })
      .then((res) => {
        console.log(res)
        this.qrCode = res.tempFilePath
      })
  },
  methods: {
    share(type) {
      this.show = false
      switch (type) {
        case 'poster':
          this.showPoster = true
          break

        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131222;
  padding: 20rpx 0;

  &__invitation {
    &-tip {
      padding: 25rpx 0;
      .tip {
        font-family: Source Han Sans CN;
        color: #ffffff;
        opacity: 0.8;
        padding: 0 20rpx;
        font-size: 20rpx;
      }
    }

    &-code {
      width: 100%;
      height: 707rpx;
      background-image: url('/static/mine/invitation-bg.png');
      background-size: 100% 100%;
      padding: 65rpx 0 55rpx;
      .qrcode {
        margin-bottom: 20rpx;
      }
      .copy-item {
        margin: 6rpx 0;
        &__title {
          font-size: 24rpx;
          font-weight: 500;
          color: #6e6e6e;
          opacity: 0.9;
          width: 130rpx;
        }
        &__value {
          width: 310rpx;
          padding-right: 10rpx;
          font-size: 32rpx;
          font-weight: bold;
          color: #3b2c7b;
          opacity: 0.9;
        }
        &__btn {
          width: 100rpx;
          height: 48rpx;
          border: 2rpx solid #3b2c7b;
          font-size: 28rpx;
          font-weight: 500;
          color: #3b2c7b;
          text-align: center;
          line-height: 48rpx;
          border-radius: 30rpx;
        }
      }
      .steps {
        margin-top: 70rpx;
        .step-item {
          font-size: 24rpx;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.72);
          .step-num {
            width: 64rpx;
            height: 64rpx;
            background: rgba(59, 44, 123, 0.4);
            border-radius: 50%;
            font-size: 32rpx;
            font-weight: bold;
            color: #3b2c7b;
            text-align: center;
            line-height: 64rpx;
            margin-bottom: 20rpx;
          }
        }
        .step-hr {
          width: 40rpx;
          height: 6rpx;
          background: #3b2c7b;
          border-radius: 4rpx;
          margin: 0 20rpx 50rpx;
        }
      }
    }
  }

  .open-type-button {
    width: 590rpx;
    height: 92rpx;
    background: #3b2c7b;
    border-radius: 8rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #ffffff;
    margin: 18rpx auto 0;
  }
}
</style>
