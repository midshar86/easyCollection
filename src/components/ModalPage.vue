<template>
  <Teleport to="body">
    <div class="container-wrap" v-show="show">
      <div class="container-box">
        <p>
          <input
            ref="inputEle"
            type="text"
            class="add-url"
            placeholder="请输入需要添加的网址"
            v-model="urlValue"
            :disabled="isDisable"
            @keyup.enter="handleSure"
          />
        </p>
        <p class="btns">
          <button @click="handleSure" :disabled="isDisable">确定</button
          ><button @click="handleCancel" :disabled="isDisable">取消</button>
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { inject, ref, onUpdated } from 'vue'
import useWebListStore from '@/store/webList'
// 注入根组件的模态窗口管理参数
const { show, changeShow } = inject('modalState')
// const emits = defineEmits(['saveWebInfo'])
const urlValue = ref('')
const webList = useWebListStore()
// 管理输入框与按钮的可输入可点击状态
const isDisable = ref(false)
const inputEle = ref(null)

// 确定按钮执行的事件函数
const handleSure = async () => {
  if (!urlValue.value) {
    // 输入为空
    window.myApi.showDialog('不允许输入为空!')
    return
  }
  // 将输入框与按钮设为禁用状态
  isDisable.value = true
  // 在已存入的webList列表中查找url
  let idx = webList.webList.findIndex((item) => item.url === urlValue.value)
  // 如果尚未添加该url
  if (idx === -1) {
    let webInfo = await window.myApi.sendUrl(urlValue.value)
    console.log(webInfo)
    if (webInfo.msg) {
      // 网址无效
      window.myApi.showDialog(webInfo.msg)
    } else {
      // 将web信息加入pinia
      webList.addWebsite(webInfo)
    }
  } else {
    // 网站已经被添加,不再添加
    window.myApi.showDialog('不允许重复添加!')
  }
  // 关闭模态框
  changeShow(false)
  // 清空输入数据
  urlValue.value = ''
  isDisable.value = false
}

// 取消按钮执行的事件函数
const handleCancel = () => {
  // 关闭模态框
  changeShow(false)
  // 清空输入数据
  urlValue.value = ''
}
// 当界面更新后,为输入框自动聚焦
onUpdated(() => {
  if (show.value) {
    inputEle.value.focus()
  }
})
</script>

<style lang="scss" scoped>
.container-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .container-box {
    width: 60%;
    padding: 20px 40px;
    background-color: #dcdcdc;
    border-radius: 10px;
    box-shadow: 0 0 2px 2px #aaa;
    .add-url {
      outline: none;
      width: 100%;
      height: 30px;
      border-radius: 5px;
      text-indent: 5px;
      border: 1px solid #eee;
    }
    .btns {
      button {
        background-color: #1ab4f0;
        border: 2px solid transparent;
        margin-right: 10px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 25px;
        width: 60px;
        color: #fff;
        transition: all 100ms linear;
        // font-weight: bold;
        &:hover {
          background-color: #1587b4;
          border: 2px solid lightgreen;
        }
        &:disabled {
          background-color: #0d485f;
          cursor: not-allowed;
          border: 2px solid black;
        }
      }
    }
  }
}
</style>
