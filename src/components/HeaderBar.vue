<template>
  <div id="container">
    <div class="add-btn" @click="handleClick">+</div>
    <p>
      <input
        type="text"
        placeholder="输入关键词以查找"
        class="search-box"
        v-model="serchValue"
        autofocus
      />
    </p>
  </div>
</template>

<script setup>
import { ref, inject, watch, onMounted } from 'vue'
import useWebListStore from '@/store/webList'
const { changeShow } = inject('modalState')
const serchValue = ref('')
// 定义一个防抖函数
const deBounce = (fn, delay, ...argus) => {
  let timer
  return function () {
    // 清除定时器
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...argus)
    }, delay)
  }
}
const webList = useWebListStore()
// 点击添加事件函数
const handleClick = () => {
  changeShow(true)
}

// 侦听输入框的搜索值
watch(serchValue, (val) => {
  // 在此处使用函数防抖,并调用更改搜索字符串函数
  deBounce(webList.changeSearchUrl, 500, val)()
})
// 当页面加载成功后调用,让主进程调用当前页面的方法
onMounted(() => {
  window.myApi.openAddlistModel(handleClick)
})
</script>

<style lang="scss" scoped>
#container {
  height: 50px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  .add-btn {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #1fe0de;
    margin: 0 15px;
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    cursor: default;
    &:hover {
      background-color: #1ab2b0;
    }
  }
  p {
    flex: 1;
    padding-right: 15px;
    .search-box {
      box-sizing: border-box;
      width: 100%;
      height: 30px;
      font-size: 16px;
      text-indent: 5px;
      outline: none;
      border-radius: 5px;
      border: 1px solid #ddd;
    }
  }
}
</style>
