<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-08 22:51:40
 * @FilePath: \change-face\pages\updatePhone\updatePhone.vue
-->
<template>
  <view class="u-page">
    <!-- 顶部导航栏 -->
    <u-navbar :title="typeStr"></u-navbar>

    <!-- 输入手机号 -->
    <view class="u-page__phone" v-if="mode === 'phone'">
      <u-form
        :model="model"
        :rules="rules"
        ref="uForm"
        :errorType="errorType"
        :label-position="labelPosition"
      >
        <u-form-item prop="phone">
          <u-input
            :border="border"
            placeholder="新手机号"
            v-model="model.phone"
            type="number"
            :customStyle="customStyle"
          />
        </u-form-item>
        <button class="open-type-button" @click="getCode">获取验证码</button>
      </u-form>
    </view>

    <!-- 输入验证码 -->
    <view class="u-page__code" v-else-if="mode === 'code'">
      <view class="title">输入验证码</view>
      <view class="tip">短信验证码已发送至+86 {{ model.phone }}</view>
      <view class="code">
        <u-message-input
          mode="box"
          :breathe="false"
          inactive-color="#F6F6F6"
          active-color="#7C16F5"
          width="128"
          v-model="model.code"
          @finish="finish"
        ></u-message-input>
      </view>
      <view class="time" @click="getCodeRef">{{ codeTips }}</view>
    </view>

    <!-- 输入密码 -->
    <view class="u-page__phone" v-else-if="mode === 'password'">
      <u-form
        :model="model"
        :rules="rules"
        ref="pwdForm"
        :errorType="errorType"
        :label-position="labelPosition"
      >
        <u-form-item
          left-icon="/static/mine/password-icon.png"
          :leftIconStyle="leftIconStyle"
          prop="password"
        >
          <u-input
            :password-icon="false"
            :border="border"
            type="password"
            v-model="model.password"
            placeholder="请输入您的密码"
            :customStyle="customStyle"
          />
        </u-form-item>
        <u-form-item
          left-icon="/static/mine/password-icon.png"
          :leftIconStyle="leftIconStyle"
          prop="rePassword"
        >
          <u-input
            :border="border"
            type="password"
            v-model="model.rePassword"
            placeholder="请确认您的密码"
            :password-icon="false"
            :customStyle="customStyle"
          />
        </u-form-item>
        <button class="open-type-button" style="margin-top: 120rpx" @click="updatePwd">
          修改密码
        </button>
      </u-form>
    </view>

    <!-- 验证码组件 -->
    <u-verification-code
      seconds="60"
      start-text="点击获取"
      change-text="xs后将重新获取"
      ref="uCode"
      @change="codeChange"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      errorType: ['toast'],
      labelPosition: 'left',
      border: false,
      leftIconStyle: { width: '36rpx', height: '33rpx', marginRight: '26rpx' },
      customStyle: { color: '#9F9F9F', fontSize: '28rpx' },
      model: {
        phone: '',
        code: '',
        password: '',
        rePassword: ''
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            trigger: ['change', 'blur']
          }
        ]
      },
      mode: 'password', // phone：手机号输入界面；code：验证码输入界面；password：密码输入界面
      codeTips: '',

      type: 1, // 1 修改手机号，2修改密码
      typeStr: '修改手机号'
    }
  },
  onLoad() {
    const options = this.$Route.query

    if (options.type) {
      this.type = parseInt(options.type)
    }

    switch (this.type) {
      case 2:
        this.typeStr = '修改密码'
        this.mode = 'code'
        this.$nextTick(() => {
          this.getCodeRef()
        })
        break
      default:
        this.typeStr = '修改手机号'
        this.mode = 'phone'
        break
    }
  },
  onReady() {
    if (this.type === 1) {
      this.$refs.uForm.setRules(this.rules)
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.getCodeRef()
        } else {
          console.log('验证失败')
        }
      })
    },
    getCodeRef() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码',
          mask: true
        })
        setTimeout(() => {
          uni.hideLoading()
          this.inputCode = true
          // 这里此提示会被this.start()方法中的提示覆盖
          this.$u.toast('验证码已发送')
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start()
        }, 2000)
      } else {
        this.$u.toast('倒计时结束后再发送')
      }
    },
    codeChange(text) {
      this.codeTips = text
    },
    finish(e) {
      console.log(this.type)
      // 如果是修改密码界面，输入完验证码则打开修改密码输入框
      if (this.type == 2) {
        this.mode = 'password'
        this.$nextTick(() => {
          this.$refs.pwdForm.setRules(this.rules)
        })
      }
    },
    // 提交修改密码
    updatePwd() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          console.log('验证成功')
        } else {
          console.log('验证失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131222;
  padding: 30rpx 50rpx;
  &__phone {
    padding: 0 30rpx;
    .open-type-button {
      width: 100%;
      height: 92rpx;
      border-radius: 8rpx;
      margin-top: 54rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #ffffff;
      background: #3b2c7b;
    }
  }
  &__code {
    color: #ffffff;
    .title {
      font-size: 48rpx;
      font-weight: 500;
      margin-bottom: 20rpx;
    }
    .tip {
      font-size: 24rpx;
      font-weight: 500;
    }
    .code {
      margin-top: 50rpx;
    }
    .time {
      text-align: center;
      font-size: 24rpx;
      font-weight: 500;
      color: #999999;
      margin-top: 30rpx;
    }
  }
}
</style>
