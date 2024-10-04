<template>
  <Teleport to="body">
    <div class="loading-wrap">
      <div class="loading-info">正在打开...</div>
    </div>
  </Teleport>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .loading-info {
    width: 80%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
}
</style>
