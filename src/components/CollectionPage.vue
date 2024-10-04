<template>
  <div class="imgs-container" @click="cancelContextMenu">
    <Waterfall :list="imageList" align="left" rowKey="src">
      <template #default="{ item, url, index }">
        <div
          class="card"
          :class="{ active: activeIdx === index }"
          @click="handleClick(index)"
          @contextmenu="openDelBox($event, index, item)"
        >
          <LazyImg :url="url" />
        </div>
      </template>
    </Waterfall>
    <div class="context-menu" ref="contentMenuEle">
      <div @click="handleDel">删除图片</div>
      <div @click="handleLooking">在资源管理器中查看</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
const activeIdx = ref(-1)
let imageList = ref([])
// 获取右键菜单dom元素
const contentMenuEle = ref(null)
// 存放需要删除的文件名称
const editImageName = ref('')

// 获取路径中保存的图片
const getImagesList = async () => {
  try {
    let res = await window.myApi.readImagesList()
    // 修改渲染需要的数据
    imageList.value = res.map((item) => {
      return { src: '../../public/' + item }
    })
    console.log(imageList.value)
  } catch (error) {
    console.log(error)
  }
}

// 点击选中图片,添加边框
const handleClick = (idx) => {
  // 激活显示边框
  activeIdx.value = idx
}
// 点击鼠标右键打开菜单
const openDelBox = (e, idx, itm) => {
  editImageName.value = itm
  // 激活显示边框
  activeIdx.value = idx
  // 更改dom元素的定位属性
  contentMenuEle.value.style.left = e.layerX + 10 + 'px'
  contentMenuEle.value.style.top = e.layerY + 10 + 'px'
  contentMenuEle.value.style.visibility = 'visible'
}
// 当点击其他地方时菜单消失
const cancelContextMenu = () => {
  contentMenuEle.value.style.visibility = 'hidden'
}

const getImageName = () => {
  // 筛选出文件名
  let tempArray = editImageName.value.src.split('/')
  return tempArray[tempArray.length - 1]
}
// 点击菜单的删除按钮
const handleDel = async () => {
  const imageName = getImageName()
  // 弹出确认提示框
  let res = await window.myApi.showImageDialog()
  console.log(res)

  // 如果用户点击删除按钮,执行删除
  if (!res.response) {
    // 等待删除操作完毕后,重新拉取图片列表数据
    await window.myApi.delImage(imageName)
    // 删除图片后,重新拉取剩余图片文件
    getImagesList()
  }
}

// 点击菜单的查看按钮
const handleLooking = () => {
  const imageName = getImageName()
  window.myApi.lookingImage(imageName)
}
// 钩子函数,当页面加载后读取图片列表
onMounted(async () => {
  await getImagesList()
})
</script>

<style lang="scss" scoped>
.imgs-container {
  height: calc(100vh - 40px);
  overflow: auto;
  position: relative;
  .card {
    border: 2px solid transparent;
    &.active {
      border-color: orangered;
    }
  }
  .context-menu {
    width: auto;
    background: linear-gradient(to right top, skyblue, cornflowerblue);
    border-radius: 5px;
    font-size: 10px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
    visibility: hidden;
    transition: visibility 100ms linear;
    div {
      padding: 5px 0;
      font-weight: bold;
      text-indent: 10px;
      padding-right: 10px;
      cursor: default;
      &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      &:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
