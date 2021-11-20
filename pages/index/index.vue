<!--
 * @Description: 
 * @Author: Levine
 * @Date: 2021-11-04 21:33:58
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-14 13:32:21
 * @FilePath: \change-face\pages\index\index.vue
-->
<template>
  <view class="u-page">
    <view class="u-page__index">
      <!-- 顶部导航栏 -->
      <u-navbar :is-back="false" :background="{ background: '#000' }">
        <view class="index-search">
          <u-search
            height="69"
            placeholder="搜索"
            disabled
            :show-action="false"
            :action-style="{ color: '#fff' }"
            search-icon="/static/index/search-icon.png"
            bgColor="linear-gradient(78deg, #000000, #020057)"
            border-color="#fff"
            placeholder-color="#fff"
            :input-style="{ fontSize: '26rpx', paddingLeft: '20rpx' }"
            @click="openPage('search')"
          ></u-search>
        </view>
      </u-navbar>

      <!-- 功能模块 -->
      <view class="u-page__index-menus u-flex u-row-between">
        <view class="menu-item u-flex u-row-between upload" @click="show = true">
          <text>上传视频</text>
          <image src="/static/index/upload-video-icon.png" class="u-w-h-76"></image>
        </view>
        <view class="menu-item u-flex u-row-between change">
          <text>AI换脸</text>
          <image src="/static/index/ai-change-icon.png" class="u-w-h-76"></image>
        </view>
      </view>

      <!-- 视频模板 -->
      <view class="u-page__index-video-models">
        <u-section
          title="查看视频模板"
          sub-title="更多分类"
          :show-line="false"
          :bold="false"
          sub-color="#fff"
          color="#fff"
          :font-size="24"
          @click="openPage('videoClass')"
        ></u-section>

        <!-- 瀑布流 -->
        <view class="video-warter-list">
          <u-waterfall v-model="flowList" ref="uWaterfall">
            <template v-slot:left="{ leftList }">
              <video-warter
                v-for="(item, index) in leftList"
                :key="index"
                :item="item"
                @makeVideo="openPage('saveVideo')"
              ></video-warter>
            </template>
            <template v-slot:right="{ rightList }">
              <view class="u-m-l-10">
                <video-warter
                  v-for="(item, index) in rightList"
                  :key="index"
                  :item="item"
                  @makeVideo="openPage('makeVideo')"
                ></video-warter>
              </view>
            </template>
          </u-waterfall>
        </view>
      </view>
      <u-loadmore bg-color="#000" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
    </view>

    <!-- 选择上传视频弹框 -->
    <upload-popup v-model="show" @success="openPage('uploadSuccess')"></upload-popup>

    <u-tabbar :list="vuex_tabbar" :before-switch="beforeSwitch"></u-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loadStatus: 'loadmore',
      flowList: [],
      list: [
        {
          title: '北国风光，千里冰封，万里雪飘',
          image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg'
        },
        {
          title: '望长城内外，惟余莽莽',
          image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
        },
        {
          title: '大河上下，顿失滔滔',
          image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
        },
        {
          title: '欲与天公试比高',
          image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
        },
        {
          title: '须晴日，看红装素裹，分外妖娆',
          image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg'
        },
        {
          shop: '李白杜甫白居易旗舰店',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg'
        },
        {
          shop: '李白杜甫白居易旗舰店',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg'
        },
        {
          title: '唐宗宋祖，稍逊风骚',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
        },
        {
          title: '一代天骄，成吉思汗',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
        },
        {
          title: '只识弯弓射大雕',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
        },
        {
          title: '俱往矣，数风流人物，还看今朝',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
        }
      ],
      show: false
    }
  },
  onLoad() {
    this.addRandomData()
  },
  onReachBottom() {
    this.loadStatus = 'loading'
    // 模拟数据加载
    setTimeout(() => {
      this.addRandomData()
      this.loadStatus = 'loadmore'
    }, 1000)
  },
  methods: {
    addRandomData() {
      for (let i = 0; i < 10; i++) {
        let index = this.$u.random(0, this.list.length - 1)
        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
        let item = JSON.parse(JSON.stringify(this.list[index]))
        item.id = this.$u.guid()
        this.flowList.push(item)
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page {
  &__index {
    padding: 0 36rpx;
    .index-search {
      padding: 0 36rpx;
      width: 100%;
    }
    &-menus {
      margin-top: 20rpx;
      margin-bottom: 30rpx;
      .menu-item {
        width: 330rpx;
        height: 159rpx;
        border-radius: 10rpx;
        padding: 0 30rpx;
        font-size: 30rpx;
        color: #fefeff;
        &.upload {
          background: #f09492;
        }
        &.change {
          background: #7c16f5;
        }
      }
    }
    &-video-models {
      .video-warter-list {
        margin-top: 10rpx;
      }
    }
  }
}
</style>
