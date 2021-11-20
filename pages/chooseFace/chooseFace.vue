<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-20 15:48:49
 * @FilePath: /change-face/pages/chooseFace/chooseFace.vue
-->
<template>
  <view>
    <!-- 选择上传视频弹框 -->
    <upload-popup v-model="show" type="image"></upload-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.u-page {
  height: 100vh;
}
</style>
