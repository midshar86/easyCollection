<template>
  <div id="root-home">
    <!-- 头部搜索框 -->
    <HeaderBar class="head-comp"></HeaderBar>
    <!-- 模态组件 -->
    <ModalPage></ModalPage>
    <!-- 捕获的网页列表 -->

    <template v-if="webListData.webList.length">
      <div class="list-con">
        <!-- 使用属性透传 -->
        <WebList @closeLoading="toggleLoading"></WebList>
      </div>
    </template>
    <div class="info" v-else>
      <p>再怎么找也没有了😅😅</p>
    </div>

    <!-- 加载中模态框 -->
    <LoadingPage v-if="showLoading"></LoadingPage>
  </div>
</template>

<script setup>
import HeaderBar from './HeaderBar.vue'
import ModalPage from './ModalPage.vue'
import WebList from './WebList.vue'
import useWebListStore from '@/store/webList'
import LoadingPage from './LoadingPage.vue'
import { ref } from 'vue'

const showLoading = ref(false)
const webListData = useWebListStore()

// 更改加载框状态
const toggleLoading = (boo) => {
  showLoading.value = boo
}
</script>

<style lang="scss" scoped>
#root-home {
  height: calc(100vh - 40px);
  .list-con {
    height: calc(100% - 50px);
    overflow: auto;
  }
  .info {
    text-align: center;
    height: 40vh;
    line-height: 40vh;
    font-size: 40px;
  }
}
</style>
