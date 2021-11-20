<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-05 22:09:56
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-07 09:31:22
 * @FilePath: \change-face\pages\login\login.vue
-->
<template>
  <view class="u-page">
    <view class="u-page-body u-flex u-flex-col">
      <!-- logo -->
      <image src="/static/public/logo.png" class="logo" />
      <!-- 登录表单 -->
      <view class="u-page__login-form">
        <u-form
          :model="model"
          :rules="rules"
          ref="uForm"
          :errorType="errorType"
          :label-position="labelPosition"
        >
          <u-form-item
            left-icon="/static/login/phone-icon.png"
            :leftIconStyle="leftIconStyle"
            prop="phone"
          >
            <u-input
              :border="border"
              placeholder="请输入手机号"
              v-model="model.phone"
              type="number"
              :customStyle="customStyle"
            />
          </u-form-item>
          <u-form-item
            left-icon="/static/login/pwd-icon.png"
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
            left-icon="/static/login/pwd-icon.png"
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
          <u-form-item
            left-icon="/static/login/code-icon.png"
            :leftIconStyle="leftIconStyle"
            prop="code"
          >
            <u-input
              :border="border"
              placeholder="请输入验证码"
              v-model="model.code"
              type="text"
              :customStyle="customStyle"
            />
            <view class="get-code" @click="getCode"> {{ codeTips }} </view>
          </u-form-item>
        </u-form>
      </view>
      <!-- 按钮组 -->
      <view class="u-page__login-btns">
        <button class="open-type-button register" @click="submit">注册</button>
        <button class="open-type-button login" @click="otherLogin(2)">已有账号登录</button>
      </view>
      <!-- 协议 -->
      <view class="u-page__login-agreement u-flex" @click="model.agreement = !model.agreement">
        <image src="/static/login/selected-icon.png" class="u-w-h-32" v-if="model.agreement" />
        <image src="/static/login/select-icon.png" class="u-w-h-32" v-else />
        登录即表示您同意
        <text>AI换脸用户协议</text>
      </view>
      <!-- 其它登录方式 -->
      <view class="u-page__login-other u-flex">
        <image src="/static/login/weixin-login.png" class="u-w-h-94" @click="otherLogin(3)" />
        <image src="/static/login/phone-login.png" class="u-w-h-94" @click="otherLogin(2)" />
      </view>
    </view>

    <!-- 验证码组件 -->
    <u-verification-code seconds="60" start-text="点击获取" ref="uCode" @change="codeChange" />
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
      leftIconStyle: { width: '26rpx', height: '32rpx', marginLeft: '26rpx' },
      customStyle: { color: '#fff', fontSize: '20rpx' },
      model: {
        agreement: false,
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
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['change', 'blur']
          },
          {
            type: 'number',
            message: '验证码只能为数字',
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur']
          }
        ],
        rePassword: [
          {
            required: true,
            message: '请重新输入密码',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return value === this.model.password
            },
            message: '两次输入的密码不相等',
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
    codeChange(text) {
      this.codeTips = text
    },
    // 获取验证码
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码',
          mask: true
        })
        setTimeout(() => {
          uni.hideLoading()
          // 这里此提示会被this.start()方法中的提示覆盖
          this.$u.toast('验证码已发送')
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start()
        }, 2000)
      } else {
        this.$u.toast('倒计时结束后再发送')
      }
    },
    // 注册
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          if (!this.model.agreement) return this.$u.toast('请勾选协议')
          console.log('验证通过')
        } else {
          console.log('验证失败')
        }
      })
    },
    // 其它登录方式
    otherLogin(type) {
      this.$Router.push({
        name: 'otherLogin',
        params: {
          type: type
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background-image: url('/static/login/login-bg.png');
  background-size: 100% auto;
  background-color: #fff;
  height: 100vh;
  overflow: auto;
  .u-page-body {
    width: 100%;
    height: 100%;
    background: rgba(21, 7, 33, 0.84);
    height: auto;
    min-height: 100vh;
    padding-bottom: 168rpx;
    .logo {
      width: 136rpx;
      height: 136rpx;
      margin-top: 270rpx;
      margin-bottom: 80rpx;
    }
  }
  &__login-form {
    width: 100%;
    padding: 0 84rpx;
    .get-code {
      font-size: 20rpx;
      color: #37a2f4;
      padding-right: 18rpx;
      background: linear-gradient(-28deg, #b16aee 0%, #8b5bf2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &__login-btns {
    margin-top: 116rpx;
    .open-type-button {
      width: 476rpx;
      height: 98rpx;
      border-radius: 48rpx;
      margin-bottom: 32rpx;
      font-size: 30rpx;
      color: #ffffff;
      &.register {
        background: linear-gradient(-28deg, #b16aee, #8b5bf2);
      }
      &.login {
        background: rgba(138, 91, 242, 0);
        border: 3rpx solid #ffffff;
      }
    }
  }
  &__login-agreement {
    font-size: 24rpx;
    color: #c8b4d1;
    margin-top: 36rpx;
    margin-bottom: 90rpx;
    image {
      margin-right: 14rpx;
    }
    text {
      color: #b16aee;
      margin-left: 10rpx;
    }
  }
  &__login-other {
    image {
      margin: 0 66rpx;
    }
  }
}
</style>
