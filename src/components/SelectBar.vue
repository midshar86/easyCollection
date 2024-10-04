<template>
  <div class="root">
    <router-link to="/home" custom v-slot="{ isActive, navigate }">
      <span @click="navigate" :class="{ active: isActive }">
        <span class="iconfont icon-a-1_shouye"> 首页</span>
      </span>
    </router-link>
    <router-link to="/collection" custom v-slot="{ isActive, navigate }">
      <span @click="navigate" :class="{ active: isActive }">
        <span class="iconfont icon-a-1_zhaopian"> 收藏夹</span>
      </span>
    </router-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.root {
  height: 40px;
  background-color: rgb(41, 167, 178);
  span {
    height: 100%;
    line-height: 40px;
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    transition: all 100ms linear;
    &.active {
      color: #fff;
      .icon {
        path {
          color: red;
        }
      }
    }
  }
}
</style>
