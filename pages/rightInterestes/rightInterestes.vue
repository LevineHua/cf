<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-14 11:33:15
 * @FilePath: \change-face\pages\rightInterestes\rightInterestes.vue
-->
<template>
  <view class="u-page">
    <!-- 顶部导航栏 -->
    <u-navbar title="会员权益"></u-navbar>

    <!-- 用户信息 -->
    <view class="u-page__interestes-user u-flex u-col-top">
      <view class="user-info__avatar">
        <image src="https://jdc.jd.com/img/170" mode="aspectFill" class="avatar"></image>
        <view class="vip-tip u-flex u-row-center">
          <image src="/static/mine/vip-icon.png" class="u-w-h-16"></image>
        </view>
      </view>
      <view class="user-info__context u-flex u-flex-col u-col-top">
        <view class="name">西域公主</view>
        <view class="other">会员总时长：<text>2022-08-24</text>到期</view>
      </view>
    </view>

    <!-- 会员特长 -->
    <view class="u-page__interestes-power u-flex">
      <view class="power-item u-flex u-flex-col u-row-center u-flex-1">
        <image src="/static/mine/power-spmb.png" mode="aspectFill" class="u-w-h-90"></image>
        视频模板
      </view>
      <view class="power-item u-flex u-flex-col u-row-center u-flex-1">
        <image src="/static/mine/power-hybs.png" mode="aspectFill" class="u-w-h-90"></image>
        会员标识
      </view>
      <view class="power-item u-flex u-flex-col u-row-center u-flex-1">
        <image src="/static/mine/power-mftx.png" mode="aspectFill" class="u-w-h-90"></image>
        免费提现
      </view>
      <view class="power-item u-flex u-flex-col u-row-center u-flex-1">
        <image src="/static/mine/power-mdgg.png" mode="aspectFill" class="u-w-h-90"></image>
        免等广告
      </view>
    </view>

    <!-- 提示 -->
    <view class="u-page__interestes-tip u-flex u-col-bottom u-row-center">
      根据风格、名称、热度等条件检索平台提供的视频模板
    </view>

    <!-- 优惠 -->
    <view class="u-page__interestes-coupon">
      <view class="coupon-item u-flex">
        <view class="coupon-info u-flex u-flex-col u-col-top">
          <view class="money u-flex">
            <text>￥</text>
            <view>88</view>
            <text>/月</text>
          </view>
          已享受7折优惠
        </view>
        <button class="open-type-button">立即开通</button>
      </view>
    </view>

    <!-- footer -->
    <view class="u-page__interestes-footer">
      <view class="footer-plocholder"></view>
      <view class="footer-plocholder footer-view u-flex">
        <view class="footer-content">老用户续费限时享优惠</view>
        <view class="footer-btn"> 前往续费 </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131222;
  padding: 20rpx 24rpx;
  &__interestes {
    &-user {
      height: 250rpx;
      background: linear-gradient(225deg, #dec99e, #b09361);
      box-shadow: 0px 11rpx 62rpx 0px rgba(21, 21, 34, 0.67);
      border-radius: 30rpx;
      padding: 26rpx 40rpx;
      margin: 0 20rpx;
      .user-info {
        &__avatar {
          width: 82rpx;
          height: 82rpx;
          position: relative;
          .avatar {
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
          .vip-tip {
            position: absolute;
            bottom: 0;
            right: 3rpx;
            background: rgb(255, 191, 81);
            border-radius: 50%;
            width: 21rpx;
            height: 21rpx;
          }
        }
        &__context {
          width: calc(100% - 94rpx);
          padding-left: 12rpx;
          .name {
            font-size: 33rpx;
            color: #ffffff;
            margin-bottom: 8rpx;
          }
          .other {
            font-size: 24rpx;
            color: #fff9d3;
            text {
              color: #fff;
              margin-right: 13rpx;
            }
          }
        }
      }
    }

    &-power {
      height: 194rpx;
      background: linear-gradient(90deg, #303145, #44495e);
      box-shadow: 0px 11rpx 62rpx 0px rgba(21, 21, 34, 0.67);
      border-radius: 30rpx;
      margin-top: -124rpx;
      z-index: 2;
      position: relative;
      .power-item {
        font-size: 24rpx;
        color: #ffffff;
        image {
          margin-bottom: 23rpx;
        }
      }
    }

    &-tip {
      font-size: 24rpx;
      color: #ffffff;
      padding: 40rpx 10rpx;
      height: 207rpx;
      background: #41455a;
      box-shadow: 0px 11rpx 62rpx 0px rgba(21, 21, 34, 0.67);
      border-radius: 30rpx;
      margin: -114rpx 20rpx 0;
    }

    &-coupon {
      .coupon-item {
        width: 100%;
        height: 295rpx;
        background-image: url('/static/mine/coupon-bg.png');
        background-size: 100% 100%;
        padding-left: 86rpx;
        .coupon-info {
          font-size: 30rpx;
          color: #5d5f76;
          line-height: 60rpx;
          width: 280rpx;
          .money {
            align-items: flex-end;
            text {
              font-size: 30rpx;
              color: #fff9d3;
              line-height: 50rpx;
            }
            view {
              font-size: 60rpx;
              color: #ffffff;
              line-height: 1;
            }
          }
        }
        .open-type-button {
          width: 200rpx;
          height: 59rpx;
          background: linear-gradient(90deg, #f8d9ad, #ecbd83);
          box-shadow: 0px 6rpx 10rpx 0px rgba(27, 27, 40, 0.5);
          border-radius: 30rpx;
          font-size: 30rpx;
          font-weight: bold;
          color: #c48333;
        }
      }
    }

    &-footer {
      .footer-plocholder {
        width: 100%;
        height: 136rpx;
        &.footer-view {
          position: fixed;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, #303145, #44495e);
          box-shadow: 0px 11rpx 62rpx 0px rgba(21, 21, 34, 0.67);
          view {
            line-height: 136rpx;
            height: 100%;
            text-align: center;
          }
          .footer-content {
            flex: 1;
            font-size: 30rpx;
            color: #fff9d3;
          }
          .footer-btn {
            width: 261rpx;
            background: linear-gradient(90deg, #f8d9ad, #ecbd83);
            box-shadow: 0px 6rpx 10rpx 0px rgba(27, 27, 40, 0.5);
            font-size: 36rpx;
            font-weight: bold;
            color: #c48333;
          }
        }
      }
    }
  }
}
</style>
