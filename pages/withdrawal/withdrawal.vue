<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-14 11:22:36
 * @FilePath: \change-face\pages\withdrawal\withdrawal.vue
-->
<template>
  <view class="u-page">
    <!-- 顶部导航栏 -->
    <u-navbar title="提现"></u-navbar>

    <!-- 余额汇总 -->
    <view class="u-page__withdrawal-count">
      <view class="counts u-flex">
        <view class="count-item balance">
          <view>资产总额(元)</view>
          <text>￥35,254.45</text>
        </view>
        <view class="count-item withdrawal">
          <view>可提现金额(元)</view>
          <text>￥35,254.45</text>
        </view>
      </view>
      <view class="history u-flex u-row-right" @click="openPage('dealHistory')">
        <image src="/static/mine/balance-icon.png" class="u-w-30 u-h-32"></image>
        交易记录
      </view>
    </view>

    <!-- 提现申请 -->
    <view class="u-page__withdrawal-apply">
      <u-form
        :model="model"
        :rules="rules"
        ref="uForm"
        :errorType="errorType"
        :label-position="labelPosition"
        :label-width="138"
        :label-style="labelStyle"
      >
        <u-form-item
          :label-style="topLabelStyle"
          label="提现金额"
          prop="money"
          label-position="top"
        >
          <text class="unit">￥</text>
          <u-input
            :border="border"
            placeholder="请输入提现金额"
            v-model="model.money"
            type="number"
            :customStyle="redCustomStyle"
          />
          <view class="all" slot="right">全部</view>
        </u-form-item>
        <view class="tip">请根据提示填写信息，即可完成提现申请：</view>
        <u-form-item label="姓名" prop="realName">
          <u-input
            :border="border"
            placeholder="请输入您的真实姓名"
            v-model="model.realName"
            type="number"
            :customStyle="customStyle"
          />
        </u-form-item>
        <u-form-item label="身份证" prop="idCard">
          <u-input
            :border="border"
            type="number"
            v-model="model.idCard"
            placeholder="请输入身份证"
            :customStyle="customStyle"
          />
        </u-form-item>
        <view class="u-m-t-40"></view>
        <u-form-item :label-style="topLabelStyle" label="到微信" prop="wechat" label-position="top">
          <u-input
            :border="border"
            placeholder="请输入微信号"
            v-model="model.wechat"
            type="number"
            :customStyle="customStyle"
          />
        </u-form-item>
      </u-form>
      <!-- 按钮组 -->
      <button class="open-type-button">提交申请</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      errorType: ['toast'],
      labelPosition: 'left',
      codeTips: '',
      border: false,
      customStyle: { color: '#C6C6C6', fontSize: '32rpx' },
      redCustomStyle: { color: '#FF2222', fontSize: '32rpx' },
      labelStyle: { color: '#333', fontSize: '32rpx' },
      topLabelStyle: { color: '#999999', fontSize: '26rpx' },
      model: {
        money: '',
        realName: '',
        idCard: '',
        wechat: ''
      },
      rules: {
        realName: [
          {
            required: true,
            message: '请输入真实姓名',
            trigger: ['change', 'blur']
          }
        ],
        idCard: [
          {
            required: true,
            message: '请输入身份证',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.idCard(value)
            },
            message: '身份证不正确',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
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
  padding: 10rpx 24rpx 0;

  &__withdrawal {
    &-count {
      width: 100%;
      height: 206rpx;
      background-image: url('/static/mine/withdrawal-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 24rpx 30rpx;
      .counts {
        margin-bottom: 20rpx;
        .count-item {
          flex: 1;
          view {
            color: #6a410a;
            line-height: 30rpx;
            margin-bottom: 19rpx;
          }
          text {
            font-weight: bold;
            color: #6a410a;
            line-height: 1;
          }
        }
        .balance {
          view {
            font-size: 25rpx;
          }
          text {
            font-size: 42rpx;
          }
        }
        .withdrawal {
          view {
            font-size: 30rpx;
          }
          text {
            font-size: 52rpx;
          }
        }
      }
      .history {
        image {
          margin-right: 10rpx;
        }
        font-size: 30rpx;
        color: #6a410a;
      }
    }

    &-apply {
      padding: 20rpx 50rpx 0;
      .unit {
        font-size: 32rpx;
        color: #ff2222;
      }
      .all {
        font-size: 32rpx;
        color: #6d5ffe;
      }
      .tip {
        font-size: 26rpx;
        color: #999999;
        margin-top: 60rpx;
      }
      .open-type-button {
        margin-top: 100rpx;
        width: 100%;
        height: 98rpx;
        border-radius: 8rpx;
        margin-bottom: 32rpx;
        font-size: 30rpx;
        color: #ffffff;
        background: #3b2c7b;
      }
    }
  }
}
</style>
