<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-14 10:47:15
 * @FilePath: \change-face\pages\dealHistory\dealHistory.vue
-->
<template>
  <view class="u-page">
    <!-- 顶部导航栏 -->
    <u-navbar title="交易记录"></u-navbar>

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      :down="downOption"
      :up="upOption"
      @up="upCallback"
    >
      <view class="u-page__list">
        <view class="item" v-for="(item, index) in 20" :key="index">
          <view class="u-flex u-row-between item-info">
            提现
            <text>¥3.00</text>
          </view>
          <view class="u-flex u-row-between item-date">
            余额500.00
            <text>2019-01-01</text>
          </view>
        </view>
      </view>

      <u-empty
        src="/static/mine/list-empty.png"
        :imgWidth="750"
        :imgHeight="265"
        :marginTop="90"
        color="#9F9EAD"
        text="亲，你还没有记录哦~~"
        mode="list"
      ></u-empty>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins'
import mescrollBody from '@/components/mescroll-uni/mescroll-body.vue'

export default {
  mixins: [MescrollMixin],
  data() {
    return {
      upOption: {},
      downOption: {
        use: false,
        empty: {
          use: false
        },
        toTop: null
      },
      list: []
    }
  },
  components: {
    mescrollBody
  },
  methods: {
    upCallback(page) {
      this.mescroll.endSuccess()
      // this.$api.news
      // .getNews({
      //   page: page.num,
      //   page_size: page.size
      // })
      // .then(({ response }:any) => {
      //   const list = response.data || []
      //   this.mescroll.endSuccess(list.length)
      //   // 如果是第一页则手动清空列表
      //   if(page.num === 1) {
      //     this.list = []
      //   }
      //   this.list = this.list.concat(list)
      // }).catch(() => {
      //   this.mescroll.endErr()
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  background: #131222;
  &__list {
    padding: 0 30rpx;
    .item {
      border-bottom: 1rpx solid #e0e0e0;
      padding: 35rpx 0;
      &:last-child {
        border: none;
      }
      &-info {
        color: #fff;
        font-size: 28rpx;
        margin-bottom: 18rpx;
      }
      &-date {
        font-size: 24rpx;
        color: #888888;
      }
    }
  }
}
</style>
