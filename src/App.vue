<template>
  <div id="root-cont">
    <SelectBar></SelectBar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import SelectBar from './components/SelectBar.vue'
import { ref, provide } from 'vue'
// 控制模态窗口的显示与隐藏
const show = ref(false)
// 修改模态窗口是否显示
const changeShow = (st) => {
  show.value = st
}
// 提供管理模态窗口的状态
provide('modalState', {
  show,
  changeShow
})
</script>

<style lang="scss"></style>
