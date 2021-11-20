<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-05 22:09:56
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-07 11:56:43
 * @FilePath: \change-face\pages\login\otherLogin.vue
-->
<template>
  <view class="u-page u-flex u-flex-col">
    <!-- 顶部导航栏 -->
    <u-navbar :title="typeString" :isReturn="true"></u-navbar>
    <!-- 登录表单 -->
    <view class="u-page__login-form">
      <u-form
        :model="model"
        :rules="rules"
        ref="uForm"
        :errorType="errorType"
        :label-position="labelPosition"
        :border-bottom="false"
      >
        <view class="form-item">
          <u-form-item
            left-icon="/static/login/email-icon.png"
            :leftIconStyle="leftIconStyle"
            prop="phone"
            :border-bottom="false"
            :formItemStyle="formItemStyle"
            :labelStyle="labelStyle"
          >
            <u-input
              :border="border"
              placeholder="请输入手机号"
              v-model="model.phone"
              type="number"
              :customStyle="customStyle"
              :height="80"
            />
          </u-form-item>
        </view>
        <view class="form-item" v-if="type == 1">
          <u-form-item
            left-icon="/static/login/pwd-gray-icon.png"
            :leftIconStyle="leftIconStyle"
            prop="password"
            :border-bottom="false"
            :formItemStyle="formItemStyle"
            :labelStyle="labelStyle"
          >
            <u-input
              :password-icon="false"
              :border="border"
              type="password"
              v-model="model.password"
              placeholder="请输入密码"
              :customStyle="customStyle"
              :height="80"
            />
          </u-form-item>
        </view>
        <view class="form-item" v-if="type != 1">
          <u-form-item
            left-icon="/static/login/pwd-gray-icon.png"
            :leftIconStyle="leftIconStyle"
            prop="code"
            :border-bottom="false"
            :formItemStyle="formItemStyle"
            :labelStyle="labelStyle"
          >
            <u-input
              :border="border"
              placeholder="请输入验证码"
              v-model="model.code"
              type="text"
              :customStyle="customStyle"
              :height="80"
            />
            <view class="get-code" @click="getCode"> {{ codeTips }} </view>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <!-- 按钮组 -->
    <view class="u-page__login-btns">
      <button class="open-type-button register" @click="submit" v-if="type === 3">绑定登录</button>
      <button class="open-type-button register" @click="submit" v-else>登录</button>
    </view>
    <!-- 切换登录方式 -->
    <view class="u-page__login-other u-flex u-row-right">
      <template v-if="type == 1">
        <view>忘记密码？</view>
        <text @click="otherLogin(2)">验证码登录</text>
      </template>
      <template v-if="type == 2">
        <view>已有账户？</view>
        <text @click="otherLogin(1)">密码登录</text>
      </template>
      <template v-if="type == 3">
        <view>已有账户？</view>
        <text @click="otherLogin(2)">登录</text>
      </template>
    </view>
    <!-- 协议 -->
    <view class="u-page__login-agreement u-flex" @click="model.agreement = !model.agreement">
      <image src="/static/login/selected-icon.png" class="u-w-h-32" v-if="model.agreement" />
      <image src="/static/login/select-icon.png" class="u-w-h-32" v-else />
      登录即表示您同意
      <text>AI换脸用户协议</text>
    </view>

    <!-- 验证码组件 -->
    <u-verification-code seconds="60" start-text="点击获取" ref="uCode" @change="codeChange" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: 1, // 1:密码登录；2:验证码登录；3:绑定手机号
      errorType: ['toast'],
      labelPosition: 'left',
      codeTips: '',
      border: false,
      leftIconStyle: { width: '36rpx', height: '36rpx', marginLeft: '26rpx' },
      customStyle: { color: '#999999', fontSize: '24rpx' },
      formItemStyle: { padding: 0 },
      labelStyle: {
        borderLeft: '1rpx solid rgba(102, 102, 102, 0.3)',
        height: '46rpx',
        margin: '0 10rpx 0 15rpx'
      },
      model: {
        agreement: false,
        phone: '',
        code: '',
        password: ''
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
        ]
      }
    }
  },
  onLoad() {
    const query = this.$Route.query
    this.type = query.type ? parseInt(query.type) : ''
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  computed: {
    typeString() {
      let typeString
      switch (this.type) {
        case 1:
          typeString = '密码登录'
          break
        case 2:
          typeString = '验证码登录'
          break
        case 3:
          typeString = '绑定手机号'
          break
        default:
          typeString = '密码登录'
          break
      }
      return typeString
    }
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
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background: linear-gradient(0deg, #36174b 0%, #2a1959 100%);
  &__login-form {
    width: 100%;
    padding: 0 105rpx;
    margin-top: 80rpx;
    .get-code {
      font-size: 20rpx;
      color: #37a2f4;
      padding-right: 18rpx;
      background: linear-gradient(-28deg, #b16aee 0%, #8b5bf2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .form-item {
      background: #fafafa;
      border: 1rpx solid #dddddd;
      border-radius: 40rpx;
      margin-bottom: 30rpx;
      padding-right: 20rpx;
    }
  }
  &__login-btns {
    margin-top: 20rpx;
    .open-type-button {
      width: 540rpx;
      height: 80rpx;
      border-radius: 40rpx;
      margin-bottom: 30rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: #ffffff;
      &.register {
        background: linear-gradient(-28deg, #b16aee, #8b5bf2);
      }
    }
  }
  &__login-other {
    width: 540rpx;
    padding-right: 20rpx;
    view {
      font-size: 22rpx;
      color: #999999;
    }
    text {
      font-size: 24rpx;
      font-weight: 500;
      color: #b16aee;
      margin-left: 10rpx;
    }
  }
  &__login-agreement {
    font-size: 24rpx;
    color: #c8b4d1;
    margin-top: 36rpx;
    image {
      margin-right: 14rpx;
    }
    text {
      color: #b16aee;
      margin-left: 10rpx;
    }
  }
}
</style>
