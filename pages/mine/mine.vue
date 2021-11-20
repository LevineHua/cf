<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-05 22:09:56
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-14 11:36:16
 * @FilePath: \change-face\pages\mine\mine.vue
-->
<template>
  <view class="u-page">
    <view class="u-page__index">
      <!-- 用户信息 -->
      <view class="u-page__index-header">
        <view class="header-setting u-flex u-row-right">
          <view class="invitation-code">填写邀请码</view>
          <image
            src="/static/mine/setting-icon.png"
            @click="openPage('setting')"
            class="u-w-45 u-h-34 u-m-l-16"
          ></image>
        </view>

        <view class="user-info u-flex">
          <view class="user-info__avatar">
            <image src="https://jdc.jd.com/img/170" mode="aspectFill" class="avatar"></image>
            <view class="vip-tip">
              <image src="/static/mine/vip-icon.png" class="u-w-h-37"></image>
            </view>
          </view>
          <view class="user-info__context u-flex u-row-between">
            <view class="info">
              <view class="name">西域公主</view>
              <view class="other">ID:1077542</view>
              <view class="other">2022-08-24到期</view>
            </view>
            <view class="info-btn" @click="openPage('userInfo')">个人资料</view>
          </view>
        </view>

        <view class="buy-vip u-flex" @click="openPage('rightInterestes')">
          <view class="name">购买会员</view>
          <view class="context"> 根据风格、名称、热度等条件检索平台提供的视频模板 </view>
          <view class="more">查看特权></view>
        </view>
      </view>

      <!-- 我的收益 -->
      <view class="u-page__index-money u-flex" @click="openPage('withdrawal')">
        <view class="money-item u-flex u-flex-col u-row-center">
          <text>368</text>
          我的收益
        </view>
        <view class="money-item-hr"></view>
        <view class="money-item u-flex u-flex-col u-row-center">
          <text>300</text>
          可提现
        </view>
      </view>

      <!-- 菜单 -->
      <view class="u-page__index-menu">
        <u-cell-item
          :border-bottom="false"
          bg-color="#292B40"
          icon="/static/mine/share-icon.png"
          :icon-style="iconStyle"
          title="邀请分享"
          :title-style="titleStyle"
          value="成功分享或邀请增加收益88.8元"
          :value-style="valueStyle"
          @click="openPage('invitation')"
        ></u-cell-item>
        <u-cell-item
          :border-bottom="false"
          bg-color="#292B40"
          icon="/static/mine/pwd-icon.png"
          :icon-style="iconStyle"
          title="修改密码"
          :title-style="titleStyle"
          @click="editPassword"
        ></u-cell-item>
      </view>

      <!-- 作品 -->
      <view class="u-page__index-tabs">
        <u-tabs
          bg-color="transparent"
          inactive-color="rgba(255, 255, 255, 0.7)"
          active-color="#fff"
          :bold="false"
          :font-size="30"
          :list="tabList"
          :is-scroll="true"
          :current="current"
          :bar-width="100"
          :bar-style="{
            height: '7rpx',
            width: '100rpx',
            bottom: '0rpx',
            background: 'linear-gradient(90deg, #72AAE6 0%, #CB65B1 100%)'
          }"
          @change="change"
        ></u-tabs>
        <view v-show="current === 0">
          <view class="list u-flex u-flex-wrap">
            <view class="list-item" v-for="(item, index) in 10" :key="index">
              <image
                src="https://jdc.jd.com/img/220x343"
                class="item-cover"
                mode="aspectFill"
              ></image>
              <view class="list-item__name u-flex u-row-between">
                <text class="u-single-line">西域公主</text>
                <!-- <u-icon name="more-dot-fill" color="#fff"></u-icon> -->
                <view>换脸中...</view>
              </view>
            </view>
          </view>
        </view>
        <view v-show="current === 1">
          <u-empty
            src="/static/mine/null-img.png"
            :imgWidth="750"
            :imgHeight="134"
            :marginTop="70"
            color="#9F9EAD"
            text="亲，你还没有收藏哦~"
            mode="list"
          ></u-empty>
        </view>
      </view>
    </view>

    <!-- 选择上传视频弹框 -->
    <upload-popup v-model="show" @success="openPage('uploadSuccess')"></upload-popup>

    <u-tabbar :list="vuex_tabbar" :before-switch="beforeSwitch" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      iconStyle: { width: '40rpx', height: '40rpx' },
      titleStyle: {
        color: '#fff',
        fontSize: '32rpx'
      },
      valueStyle: {
        color: '#FFBE0A',
        fontSize: '24rpx'
      },
      tabList: [
        {
          name: '我的作品'
        },
        {
          name: '我的收藏'
        }
      ],
      current: 0,
      show: false
    }
  },
  methods: {
    change(index) {
      this.current = index
    },
    openPage(page) {
      this.$Router.push({
        name: page
      })
    },
    // 切换 tabbar 前回调
    beforeSwitch(index) {
      // 只能切换偶数项
      if (index == 1) {
        this.show = true
        return false
      } else {
        return true
      }
    },
    editPassword() {
      this.$Router.push({
        name: 'updatePhone',
        params: {
          type: 2
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131221;
  &__index {
    &-header {
      padding: 76rpx 30rpx 0;
      background: linear-gradient(60deg, #45218d 0%, #41218c 100%);
      .header-setting {
        .invitation-code {
          height: 41rpx;
          background: #58399b;
          border: 2rpx solid #e78b99;
          border-radius: 21rpx;
          padding: 0 20rpx;
          line-height: 41rpx;
          font-size: 20rpx;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .user-info {
        margin-bottom: 66rpx;
        &__avatar {
          width: 170rpx;
          height: 170rpx;
          position: relative;
          .avatar {
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
          .vip-tip {
            position: absolute;
            bottom: 0;
            right: 10rpx;
            background: rgb(255, 191, 81);
            border-radius: 50%;
            width: 37rpx;
            height: 37rpx;
          }
        }
        &__context {
          width: calc(100% - 170rpx);
          padding-left: 20rpx;
          padding-top: 20rpx;
          .info {
            .name {
              font-size: 35rpx;
              font-weight: bold;
              color: #ffffff;
              margin-bottom: 20rpx;
            }
            .other {
              font-size: 25rpx;
              color: #a79ab7;
              margin-bottom: 10rpx;
            }
          }
          .info-btn {
            width: 159rpx;
            height: 70rpx;
            background: #58399b;
            border-radius: 35rpx;
            font-size: 26rpx;
            font-weight: 400;
            color: #ffffff;
            line-height: 70rpx;
            text-align: center;
          }
        }
      }
      .buy-vip {
        height: 85rpx;
        background: linear-gradient(90deg, #f7d7c4 0%, #d9b5a1 100%);
        border-radius: 30rpx 30rpx 0 0;
        padding: 0 50rpx;
        .name {
          font-size: 35rpx;
          font-weight: bold;
          color: #74523e;
        }
        .context {
          flex: 1;
          font-size: 20rpx;
          color: #74523e;
          padding: 0 40rpx;
        }
        .more {
          font-size: 12rpx;
          color: #74523e;
        }
      }
    }
    &-money {
      height: 110rpx;
      border-bottom: solid 5rpx rgba($color: #000000, $alpha: 0.8);
      padding: 0 30rpx;
      .money-item {
        width: 50%;
        height: 100%;
        font-size: 25rpx;
        color: #9f9ead;
        text {
          font-size: 33rpx;
          margin-bottom: 10rpx;
        }
        &-hr {
          width: 3rpx;
          height: 28rpx;
          background: #9f9ead;
        }
      }
    }
    &-menu {
      margin: 22rpx 30rpx;
      background: #292b40;
      border-radius: 12rpx;
      overflow: hidden;
    }
    &-tabs {
      padding: 0 20rpx;
      .list {
        padding-top: 10rpx;
        margin-right: -22rpx;
        .list-item {
          width: 220rpx;
          // height: 412rpx;
          border-radius: 10rpx;
          overflow: hidden;
          margin-bottom: 22rpx;
          margin-right: 22rpx;
          position: relative;
          .item-cover {
            width: 220rpx;
            height: 343rpx;
            display: block;
          }
          &__name {
            width: 100%;
            height: 70rpx;
            background: #ed716f;
            padding: 0 14rpx;
            text {
              font-size: 18rpx;
              color: #fefeff;
              // width: calc(100% - 50rpx);
              flex: 1;
            }
            view {
              font-size: 18rpx;
              color: #fefeff;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
