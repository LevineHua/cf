<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-07 10:26:00
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-15 22:59:32
 * @FilePath: \change-face\components\poster-popup\poster-popup.vue
-->
<template>
  <u-popup
    v-model="show"
    mode="center"
    :custom-style="{ background: 'transparent' }"
    @open="open"
    @close="close"
  >
    <view class="poster-popup u-rela">
      <view class="poster-popup__close u-flex u-row-center" @click="close">
        <image src="/static/public/close-icon.png" class="u-w-h-14"></image>
      </view>
      <view class="poster-popup__body u-flex u-flex-col">
        <view class="poster-title">邀请好友得收益</view>
        <view class="invitation-tip u-flex u-row-center">
          <image src="/static/mine/invitation-left-icon.png" class="u-w-64 u-h-16"></image>
          <view class="tip">每成功邀请1位好友可获得8.88元</view>
          <image src="/static/mine/invitation-right-icon.png" class="u-w-64 u-h-16"></image>
        </view>
        <view class="qrcode">
          <image :src="qrCode" class="u-w-h-278"></image>
        </view>
        <view class="long-click">长按识别图中二维码</view>
        <view class="poster-footer u-flex u-row-between">
          <view class="poster-logo u-flex">
            <image src="/static/public/logo.png" class="u-w-h-58"></image>
            青云视频换脸
          </view>
          <view class="poster-right">
            <view class="small">THE INVITATION</view>
            <view class="text">邀请好友得收益</view>
          </view>
        </view>
      </view>
      <view class="poster-popup__btns u-flex u-row-between">
        <view class="btn-item share">
          <view>分享给好友</view>
        </view>
        <view class="btn-item" @click="createPoster">保存图片</view>
      </view>
    </view>

    <canvas
      canvas-id="canvasId"
      v-if="creating"
      class="canvas"
      style="width: 597px; height: 820px"
    ></canvas>
  </u-popup>
</template>

<script>
import { getSharePoster } from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js'
import leftIcon from '@/static/mine/invitation-left-icon.png'
import rightIcon from '@/static/mine/invitation-right-icon.png'
import logo from '@/static/public/logo.png'
export default {
  data() {
    return {
      show: false,
      creating: false,
      posterImage: ''
    }
  },
  name: 'poster-popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    qrCode: {
      type: String,
      default: ''
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
    async createPoster() {
      let _this = this
      this.creating = true
      uni.showLoading()

      if (this.posterImage) {
        this.saveImage()
        return
      }

      try {
        const d = await getSharePoster({
          _this: _this, //若在组件中使用 必传
          posterCanvasId: 'canvasId',
          // background: {
          //   height: 597, //画布高度
          //   width: 820 //画布宽度
          // },
          backgroundImage: '/static/mine/poster-bg.png', //背景图片路径, 画布会跟随图片的实际像素, 并绘制为背景, 请不要使背景图片的像素太大
          drawArray({
            //绘制序列
            bgObj, //背景图对象
            type, //自定义标识
            bgScale, //背景缩放
            setBgObj, //动态设置画布(宽高),若使用该方法不建议背景图方式绘制, 建议使用background自定义画布绘制, 因为这个方法绘制修改背景图的宽高
            getBgObj //获取动态设置的画布宽高
          }) {
            return [
              {
                type: 'text',
                text: '邀请好友得收益',
                color: '#fff',
                textAlign: 'center',
                font: '40px sans-serif',
                dx: 597 / 2,
                dy: 100
              },
              {
                type: 'image',
                url: leftIcon,
                dx: 77,
                dy: 140,
                dWidth: 64,
                dHeight: 16
              },
              {
                type: 'text',
                text: '每成功邀请1位好友可获得8.88元',
                color: '#fff',
                textAlign: 'center',
                font: '20px sans-serif',
                dx: 597 / 2,
                dy: 150
              },
              {
                type: 'image',
                url: rightIcon,
                dx: 460,
                dy: 140,
                dWidth: 64,
                dHeight: 16
              },
              {
                type: 'fillRect',
                backgroundColor: '#fff',
                dx: 148,
                dy: 210,
                width: 300,
                height: 300
              },
              {
                type: 'image',
                url: _this.qrCode,
                dx: 162,
                dy: 223,
                dWidth: 274,
                dHeight: 274
              },
              {
                type: 'text',
                text: '长按识别图中二维码',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                font: '26px sans-serif',
                dx: 597 / 2,
                dy: 545
              },
              {
                type: 'image',
                url: logo,
                dx: 27,
                dy: 750,
                dWidth: 58,
                dHeight: 58
              },
              {
                type: 'text',
                text: '青云视频换脸',
                color: '#3E2491',
                font: '34px bold',
                dx: 97,
                dy: 785
              },
              {
                type: 'fillRect',
                backgroundColor: '#3E2491',
                dx: 565,
                dy: 763,
                width: 3,
                height: 33
              },
              {
                type: 'text',
                text: 'THE INVITATION',
                color: '#3E2491',
                font: '11px sans-serif',
                dx: 472,
                dy: 768
              },
              {
                type: 'text',
                text: '邀请好友得收益',
                color: '#3E2491',
                font: '22px sans-serif',
                dx: 406,
                dy: 788
              }
            ]
          }
        })
        this.posterImage = d.poster.tempFilePath
        this.saveImage()
      } catch (e) {
        uni.hideLoading()
      }
    },
    saveImage() {
      uni.saveImageToPhotosAlbum({
        filePath: this.posterImage,
        success: (res) => {
          uni.$u.toast('图片保存成功')
          this.close()
          this.creating = false
        },
        fail: (err) => {
          this.creating = false
          uni.$u.toast('图片保存失败')
          this.close()
        },
        finally: () => {
          uni.hideLoading()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0;
}
.poster-popup {
  width: 597rpx;
  &__close {
    width: 38rpx;
    height: 38rpx;
    background: rgba(17, 17, 17, 0.51);
    border-radius: 50%;
    margin: 0 auto;
  }
  &__body {
    width: 100%;
    height: 820rpx;
    background-image: url('/static/mine/poster-bg.png');
    background-size: 100% 100%;
    margin-top: 18rpx;
    padding: 60rpx 30rpx 12rpx;
    .poster-title {
      font-size: 40rpx;
      font-weight: 400;
      color: #fefefe;
      opacity: 0.9;
    }
    .invitation {
      &-tip {
        padding: 15rpx 0;
        .tip {
          font-family: Source Han Sans CN;
          color: #ffffff;
          opacity: 0.8;
          padding: 0 20rpx;
          font-size: 20rpx;
        }
      }
    }
    .qrcode {
      border: solid 10rpx #fff;
      margin-top: 30rpx;
    }
    .long-click {
      font-size: 26rpx;
      color: #ffffff;
      opacity: 0.6;
      margin-top: 15rpx;
    }
    .poster-footer {
      width: 100%;
      margin-top: 200rpx;
      .poster-logo {
        image {
          margin-right: 12rpx;
        }
        font-size: 34rpx;
        font-weight: bold;
        color: #3e2491;
      }
      .poster-right {
        color: #3e2491;
        text-align: right;
        border-right: 3rpx solid #3e2491;
        padding-right: 5rpx;
        line-height: 1;
        .small {
          font-size: 11rpx;
        }
        .text {
          font-size: 22rpx;
        }
      }
    }
  }
  &__btns {
    margin-top: 54rpx;
    .btn-item {
      width: 234rpx;
      height: 68rpx;
      background: #040d19;
      border-radius: 5rpx;
      text-align: center;
      line-height: 68rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(78deg, #f09492, #7c16f5);
      &.share {
        view {
          background: #000;
          width: 230rpx;
          height: 64rpx;
          margin: 2rpx 0 0 2rpx;
          border-radius: 4rpx;
        }
      }
    }
  }
}
</style>
