<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-14 13:58:50
 * @FilePath: \change-face\pages\setting\setting.vue
-->
<template>
  <view class="u-page">
    <!-- 顶部导航栏 -->
    <u-navbar title="设置"></u-navbar>

    <u-cell-item
      :arrow="false"
      :border-bottom="true"
      :bg-color="bgColor"
      title="清除缓存"
      :title-style="titleStyle"
      @click="clearCache"
    >
      <view class="clear-btn" slot="right-icon">清理</view>
    </u-cell-item>
    <u-cell-item
      :border-bottom="true"
      :bg-color="bgColor"
      title="用户协议"
      :title-style="titleStyle"
      @click="openPage('userAgreement')"
    ></u-cell-item>
    <u-cell-item
      :border-bottom="true"
      :bg-color="bgColor"
      title="隐私说明"
      :title-style="titleStyle"
    ></u-cell-item>
    <u-cell-item
      :border-bottom="true"
      :bg-color="bgColor"
      title="检查更新"
      :title-style="titleStyle"
      value="V 1.1.6"
      :value-style="valueStyle"
    ></u-cell-item>
    <u-cell-item
      :border-bottom="false"
      :bg-color="bgColor"
      title="退出登录"
      :title-style="titleStyle"
    ></u-cell-item>
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
    },
    /**
     * 清理缓存
     */
    clearCache() {
      let os = plus.os.name
      if (os == 'Android') {
        let main = plus.android.runtimeMainActivity()
        let sdRoot = main.getCacheDir()
        let files = plus.android.invoke(sdRoot, 'listFiles')
        let len = files.length
        for (let i = 0; i < len; i++) {
          let filePath = '' + files[i] // 没有找到合适的方法获取路径，这样写可以转成文件路径
          plus.io.resolveLocalFileSystemURL(
            filePath,
            function (entry) {
              if (entry.isDirectory) {
                entry.removeRecursively(
                  function (entry) {
                    //递归删除其下的所有文件及子目录
                    uni.showToast({
                      title: '已成功清除缓存',
                      duration: 2000
                    })
                  },
                  function (e) {
                    console.log(e.message)
                  }
                )
              } else {
                entry.remove()
              }
            },
            function (e) {
              console.log('文件路径读取失败')
            }
          )
        }
      } else {
        // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错
        plus.cache.clear(function () {
          uni.showToast({
            title: '已成功清除缓存',
            duration: 2000
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131222;
  padding: 0 30rpx;
  .clear-btn {
    width: 62rpx;
    height: 42rpx;
    background: #70acf2;
    border-radius: 5rpx;
    font-size: 24rpx;
    color: #fefeff;
    line-height: 42rpx;
    text-align: center;
  }
}
</style>
