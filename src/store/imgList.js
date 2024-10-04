import { defineStore } from "pinia"
import store from "store2"

const useImageListStore = defineStore("imageList", {
  state() {
    return {
      imgList: store.get("imgList") ? store.get("imgList") : []
    }
  },
  actions: {
    // 存入图片数据
    addImgList(imgs) {
      this.imgList = imgs
      store.set("imgList", imgs)
    }
  }
})

export default useImageListStore