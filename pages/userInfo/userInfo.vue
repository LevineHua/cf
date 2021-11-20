<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-14 13:54:25
 * @FilePath: \change-face\pages\userInfo\userInfo.vue
-->
<template>
  <view class="u-page u-flex u-flex-col u-row-left">
    <!-- 顶部导航栏 -->
    <u-navbar title="个人资料"></u-navbar>

    <!-- 头像 -->
    <u-upload :custom-btn="true" :max-count="1" :show-upload-list="false">
      <view class="u-page__user-avatar" slot="addBtn">
        <image src="https://jdc.jd.com/img/200" mode="aspectFill" class="avatar"></image>

        <view class="avatar-photo u-flex u-row-center">
          <image src="/static/mine/camera.png"></image>
        </view>
      </view>
    </u-upload>

    <view class="u-page_user-items">
      <view class="item u-flex u-row-between">
        姓名
        <text>西域公主</text>
      </view>
      <view class="item u-flex u-row-between">
        微信号
        <text>11111</text>
      </view>
      <view class="item u-flex u-row-between" @click="openPage('updatePhone')">
        电话号码
        <text>172****1111</text>
      </view>
      <view class="item u-flex u-row-between">
        出生年月
        <text>1999-09-09</text>
      </view>
      <view class="item u-flex u-row-between">
        地址
        <text>xx省xx市</text>
      </view>
    </view>
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
  methods: {
    openPage(page) {
      this.$Router.push({
        name: page
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131222;
  padding: 30rpx 45rpx;
  &__user-avatar {
    width: 200rpx;
    height: 200rpx;
    position: relative;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .avatar-photo {
      width: 62rpx;
      height: 62rpx;
      background: #79d0bf;
      box-shadow: 0px 4rpx 109rpx 0px rgba(124, 124, 124, 0.29);
      border-radius: 50%;
      position: absolute;
      bottom: 5rpx;
      right: -9rpx;
      image {
        width: 29rpx;
        height: 27rpx;
      }
    }
  }
  &_user-items {
    margin-top: 50rpx;
    .item {
      font-size: 30rpx;
      color: #d6d6d6;
      width: 660rpx;
      height: 125rpx;
      border-bottom: solid 1rpx #c6c6c6;
      padding-left: 14rpx;
      text {
        font-size: 33rpx;
        color: #fefefe;
        text-align: right;
        width: 450rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
