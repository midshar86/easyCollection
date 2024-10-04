<template>
  <div
    class="list-container-item"
    v-for="(item, index) in webList.filterWebsite"
    :key="item.url"
    :class="{ active: activeIndex === index }"
    @click="handleActive(index)"
  >
    <img :src="item.webScreenShotUrl" alt="poster" />
    <div class="mid">
      <h4>{{ item.webTitle }}</h4>
      <span @click="handleOpenUrl(item.url)" title="点击跳转">{{ item.url }}</span>
    </div>
    <span><button class="del-btn" @click.stop="handleDelWeb(item.url, index)">删除</button></span>
  </div>
  <teleport to="body">
    <div class="warn-info" v-if="delDialog">
      <div class="text-info">
        <div>确定删除吗?</div>
        <div class="operations">
          <div @click="delDialog = false">取消</div>
          <div @click="makeSureDel">确定</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import useWebListStore from '@/store/webList'
const emits = defineEmits(['closeLoading'])
// 存放选中的下标
const activeIndex = ref(-1)
const webList = useWebListStore()
// 存放点击删除时的url与index
const selectUrl = ref('')
const selectIdx = ref(-1)
// 存放弹出框状态
const delDialog = ref(false)
// 更改选中的下标
const handleActive = (idx) => {
  activeIndex.value = idx
}
// 点击删除按钮
const handleDelWeb = (url, idx) => {
  // 显示弹出框
  delDialog.value = true
  selectUrl.value = url
  selectIdx.value = idx
}
// 确认删除
const makeSureDel = () => {
  // // 查找当前收藏列表的末尾下标
  let lastIndex = webList.filterWebsite.length - 1
  // 判断如果点击删除时是末尾的项目,并且此时已经激活末尾项目的active,则删除后将激活的active上移一位
  if (lastIndex === selectIdx.value && activeIndex.value === lastIndex) {
    activeIndex.value--
  }
  // 执行删除操作
  webList.delWebSite(selectUrl.value)
  // 关闭弹出框
  delDialog.value = false
}
// 打开收藏的网页
const handleOpenUrl = async (url) => {
  // 打开加载中窗口
  emits('closeLoading', true)
  console.log(url)
  await window.myApi.openNewWindow(url)
  emits('closeLoading', false)
}
</script>

<style lang="scss" scoped>
.list-container-item {
  &.active {
    background-color: #aaa;
    &::before {
      display: block;
      background-color: green;
    }
  }
  position: relative;
  padding: 0 15px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  margin-bottom: 10px;
  transition: all 200ms linear;
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    transition: all 200ms linear;
  }
  &:hover {
    background-color: rgba(160, 146, 120, 0.5);
    span {
      button {
        display: block;
      }
    }
  }
  img {
    width: 200px;
    height: 150px;
    margin-right: 15px;
  }
  .mid {
    justify-self: flex-start;
    align-self: flex-start;
    flex: 1;
    span {
      cursor: pointer;
      transition: all 100ms linear;
      &:hover {
        color: aqua;
        text-shadow: 1px 1px 2px #8e8e8e;
      }
    }
  }
  & > span {
    flex: 0.3;
    display: flex;
    justify-content: flex-end;
    button {
      display: none;
      width: 60px;
      color: #fff;
      background-color: orangered;
      border-radius: 5px;
      height: 35px;
      border: 1px solid #eee;
      transition: all 100ms linear;
      &:hover {
        background-color: rgb(210, 56, 0);
        border: 1px solid black;
      }
    }
  }
}
.warn-info {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .text-info {
    width: 40%;
    height: 100px;
    background-color: lavenderblush;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div:first-child {
      font-size: 18px;
      font-weight: bold;
    }
    .operations {
      margin-top: 20px;
      display: flex;
      div {
        width: 80px;
        text-align: center;
        padding: 5px 0;
        cursor: default;
        border-radius: 5px;
        transition: all 100ms linear;
        &:last-child {
          background-color: red;
          color: #fff;
          font-weight: bold;
          margin-left: 20px;
        }
        &:hover {
          box-shadow: 0 0 2px 2px lightgreen;
        }
      }
    }
  }
}
</style>
