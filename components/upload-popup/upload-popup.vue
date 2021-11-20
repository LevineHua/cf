<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-07 10:26:00
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-20 15:50:18
 * @FilePath: /change-face/components/upload-popup/upload-popup.vue
-->
<template>
  <u-popup
    v-model="show"
    mode="bottom"
    :custom-style="{ background: 'transparent' }"
    @open="open"
    @close="close"
  >
    <view class="upload-popup u-rela">
      <view class="upload-popup__title">
        <template v-if="type === 'video'">选择上传的视频</template>
        <template v-else>选择一张人脸</template>
      </view>
      <view class="upload-popup__close u-flex u-row-center" @click="close">
        <image src="/static/public/close-icon.png" class="u-w-h-14" />
      </view>
      <view class="upload-popup__menus u-flex u-row-between">
        <view class="menu-item u-flex u-flex-col u-row-center" @click="photograph(['camera'])">
          <image src="/static/public/photograph-icon.png" class="u-w-68 u-h-58"></image>
          拍照
        </view>
        <view class="menu-item u-flex u-flex-col u-row-center" @click="photograph(['album'])">
          <image src="/static/public/album-icon.png" class="u-w-68 u-h-58"></image>
          相册
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  name: 'upload-popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'video'
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
    // 拍照
    photograph(sourceType) {
      this.close()
      // 拍摄视频
      if (this.type === 'video') {
        uni.chooseVideo({
          count: 1,
          sourceType,
          success: (res) => {
            console.log(res.tempFilePath)
            this.$emit('success', res.tempFilePath)
          }
        })
      } else {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-popup {
  width: 750rpx;
  height: 368rpx;
  background: #191a1f;
  border-radius: 10rpx;
  &__title {
    text-align: center;
    font-size: 26rpx;
    font-family: Microsoft YaHei;
    color: #ffffff;
    padding: 32rpx;
  }
  &__close {
    width: 38rpx;
    height: 38rpx;
    background: #111111;
    border-radius: 50%;
    position: absolute;
    right: 28rpx;
    top: 28rpx;
  }
  &__menus {
    margin-top: 46rpx;
    padding: 0 50rpx;
    .menu-item {
      width: 308rpx;
      height: 157rpx;
      background: #24252c;
      border-radius: 10rpx;
      font-size: 26rpx;
      font-family: Microsoft YaHei;
      color: #ffffff;
      image {
        margin-bottom: 13rpx;
      }
    }
  }
}
</style>
